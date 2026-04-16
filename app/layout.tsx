import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QA Knowledge",
  description: "Open QA knowledge base by Ali Akhmetov",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
