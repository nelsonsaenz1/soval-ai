"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";

/**
 * Routes rendered on the dark-first "Intelligence" canvas. The navbar adopts its
 * dark treatment (white links, light-blue accents, teal-navy blur) on these and
 * keeps the light treatment everywhere else. Extend as more pages migrate.
 */
const DARK_ROUTES = new Set<string>(["/"]);

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const dark = DARK_ROUTES.has(pathname);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  // Lock scroll while the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
        !solid && "border-b border-transparent bg-transparent",
        solid &&
          (dark
            ? "border-b border-white/10 bg-[rgba(6,27,36,0.72)] backdrop-blur-md"
            : "border-b border-hairline bg-cream/85 backdrop-blur-md supports-[backdrop-filter]:bg-cream/70"),
      )}
    >
      <nav
        className="container-edge flex h-[70px] items-center justify-between gap-4"
        aria-label="Primary"
      >
        <Link
          href="/"
          aria-label={`${BRAND.name} home`}
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Logo onDark={dark} />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {BRAND.nav.map((item) => {
            const href: string = item.href;
            const active =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-pill px-3.5 py-2 text-sm font-medium transition-colors duration-150",
                  dark
                    ? active
                      ? "text-accent-onDark"
                      : "text-on-dark-secondary hover:text-accent-onDark"
                    : active
                      ? "text-accent"
                      : "text-secondary hover:text-heading hover:bg-warm",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href="/quiz" variant={dark ? "ghostDark" : "ghost"} size="sm">
            {BRAND.quizCta.label}
          </Button>
          <Button
            href={BRAND.navCta.href}
            variant={dark ? "onDarkPrimary" : "primary"}
            size="sm"
            onClick={() => trackEvent("consult_clicked", { source: "nav" })}
          >
            {BRAND.navCta.label}
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-pill lg:hidden",
            dark
              ? "text-on-dark hover:bg-white/10"
              : "text-heading hover:bg-warm",
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className={cn(
            "border-t lg:hidden",
            dark ? "border-white/10 bg-[#061b24]" : "border-hairline bg-cream",
          )}
        >
          <div className="container-edge flex flex-col gap-1 py-4">
            {BRAND.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "rounded-md px-3 py-2.5 text-base font-medium",
                  dark
                    ? "text-on-dark-secondary hover:bg-white/5 hover:text-on-dark"
                    : "text-heading hover:bg-warm",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button
                href="/quiz"
                variant={dark ? "outlineDark" : "secondary"}
                size="md"
                onClick={closeMenu}
              >
                {BRAND.quizCta.label}
              </Button>
              <Button
                href={BRAND.navCta.href}
                variant={dark ? "onDarkPrimary" : "primary"}
                size="md"
                onClick={() => {
                  trackEvent("consult_clicked", { source: "nav_mobile" });
                  closeMenu();
                }}
              >
                {BRAND.navCta.label}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <>
          <path d="M3 7h18" />
          <path d="M3 12h18" />
          <path d="M3 17h18" />
        </>
      )}
    </svg>
  );
}
