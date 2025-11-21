import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "spot - find places that match your vibe",
  description: "Find places that match your vibe through an AI-powered matching system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
