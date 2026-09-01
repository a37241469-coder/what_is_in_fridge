import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const MODEL = "gemini-2.5-flash-image";
const CACHE_DIR = path.join(process.cwd(), "public", "generated", "recipes");

function sanitizeId(id: string) {
  return id.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 120);
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "圖片生成功能尚未設定 API 金鑰" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id.trim() : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const tagline = typeof body?.tagline === "string" ? body.tagline.trim() : "";

  if (!id || !name) {
    return NextResponse.json({ error: "缺少食譜資訊" }, { status: 400 });
  }

  const fileName = `${sanitizeId(id)}.png`;
  const filePath = path.join(CACHE_DIR, fileName);
  const publicUrl = `/generated/recipes/${fileName}`;

  const alreadyCached = await fs
    .access(filePath)
    .then(() => true)
    .catch(() => false);
  if (alreadyCached) {
    return NextResponse.json({ url: publicUrl, cached: true });
  }

  const prompt = `Overhead food-photography shot of a homestyle Taiwanese/Asian dish called "${name}"${
    tagline ? ` (${tagline})` : ""
  }, freshly plated on a simple wooden table with natural daylight, shallow depth of field, appetizing and realistic. No text, no watermark, no hands, no utensils packaging.`;

  let base64: string | undefined;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini image generation failed", res.status, errText);
      return NextResponse.json({ error: "圖片生成失敗，請稍後再試" }, { status: 502 });
    }

    const data = await res.json();
    const parts: Array<{ inlineData?: { data?: string; mimeType?: string } }> =
      data?.candidates?.[0]?.content?.parts ?? [];
    base64 = parts.find((part) => part.inlineData?.data)?.inlineData?.data;
  } catch (err) {
    console.error("Gemini image generation error", err);
    return NextResponse.json({ error: "圖片生成失敗，請稍後再試" }, { status: 502 });
  }

  if (!base64) {
    return NextResponse.json({ error: "圖片生成失敗，請稍後再試" }, { status: 502 });
  }

  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(filePath, Buffer.from(base64, "base64"));

  return NextResponse.json({ url: publicUrl, cached: false });
}
