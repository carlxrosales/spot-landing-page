import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "spot: discover & share places",
  description: "find places that match ur vibe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>{children}</body>
    </html>
  );
}
