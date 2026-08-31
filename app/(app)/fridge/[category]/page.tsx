import { CategoryClient } from "./category-client";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <CategoryClient categoryId={category} />;
}
