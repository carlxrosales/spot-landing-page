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
    <nav className="w-full py-6 px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-bold text-black hover:text-neon-pink transition-colors font-groen">
          spot
        </Link>
        <div className="flex flex-wrap gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium transition-colors ${
                pathname === link.href
                  ? "text-neon-pink"
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

