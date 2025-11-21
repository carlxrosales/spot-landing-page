"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/help", label: "Help" },
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/zone", label: "Zone" },
  ];

  return (
    <nav className="w-full py-6 md:py-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-3xl md:text-4xl text-black hover:text-neon-pink transition-colors font-groen">
          spot
        </Link>
        <div className="flex flex-wrap gap-4 md:gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base md:text-lg font-medium transition-colors ${
                pathname === link.href
                  ? "text-neon-pink font-bold"
                  : "text-black hover:text-neon-pink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

