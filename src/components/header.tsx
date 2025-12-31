"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Spacer to help center the logo */}
        <div className="flex-1" />

        {/* Centered Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-semibold tracking-tight">
            Token<span className="text-primary">Tickr</span>
          </span>
        </Link>

        {/* Right side with toggle */}
        <div className="flex-1 flex justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}