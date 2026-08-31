import type { ReactNode } from "react";
import { Header } from "@/components/header";

export default function AppSectionLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col">{children}</div>
    </>
  );
}
