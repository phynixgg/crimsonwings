"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { site } from "@/data/site";
import Emblem from "./Emblem";

export default function Navbar() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink-950/85 backdrop-blur-md border-b border-gold-700/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <Emblem className="h-7 w-9 text-gold-500 transition-transform duration-500 group-hover:scale-110" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm tracking-wider2 text-white">
              {site.brand.zh}
            </span>
            <span className="font-tech text-[10px] tracking-widest2 text-gold-500/80 uppercase">
              {site.brand.legion}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-5 sm:gap-7">
          <Link
            href="/products/tshirt"
            className="hidden font-tech text-sm uppercase tracking-wider2 text-white/70 transition-colors hover:text-gold-400 sm:inline"
          >
            T-Shirt
          </Link>
          <Link
            href="/products/jacket"
            className="hidden font-tech text-sm uppercase tracking-wider2 text-white/70 transition-colors hover:text-gold-400 sm:inline"
          >
            Jacket
          </Link>

          <button
            onClick={openCart}
            className="relative flex items-center gap-2 font-tech text-sm uppercase tracking-wider2 text-white/80 transition-colors hover:text-gold-400"
            aria-label={`Open cart, ${count} items`}
          >
            <CartIcon />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-grad px-1 text-[10px] font-bold text-ink-950">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M3 4h2l2.4 12.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}
