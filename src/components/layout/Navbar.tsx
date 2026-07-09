"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-warm-50/95 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-main flex h-20 items-center justify-between">
        <Link
          href="/"
          className="relative z-10 text-xl font-bold tracking-tight text-navy-900"
        >
          <span className="font-serif text-2xl font-semibold">Pristine</span>
          <span className="text-blue-600">Clean</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy-700 transition-colors hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/quote-booking">
            <Button size="sm" variant="primary">
              Get a Quote
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 lg:hidden p-2 text-navy-900"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 top-0 z-0 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-900/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <nav className="absolute top-20 left-0 right-0 bg-warm-50 border-b-2 border-navy-100 p-6 space-y-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-base font-medium text-navy-700 transition-colors hover:text-blue-600"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/quote-booking" onClick={() => setIsOpen(false)}>
              <Button className="w-full" variant="primary">
                Get a Quote
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
