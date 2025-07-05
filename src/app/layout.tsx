import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Attacked.AI",
  description: "Real-time global threat intelligence and news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
