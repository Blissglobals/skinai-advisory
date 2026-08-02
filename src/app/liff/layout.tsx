import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "SkinAI Advisory",
};

export default function LiffLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full touch-manipulation flex-col overscroll-none">
        {children}
      </body>
    </html>
  );
}
