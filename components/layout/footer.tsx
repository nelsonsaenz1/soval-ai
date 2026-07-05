import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="mesh-dark text-on-dark">
      <div className="container-edge py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label={`${BRAND.name} home`}>
              <Logo onDark className="h-9 w-auto" />
            </Link>
            <p className="max-w-sm text-pretty text-on-dark-secondary">
              {BRAND.oneLiner}
            </p>
            <div className="pt-1">
              <Button href={BRAND.primaryCta.href} variant="light" size="md">
                {BRAND.primaryCta.label}
              </Button>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {BRAND.footerNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-on-dark-muted">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-on-dark-secondary transition-colors duration-150 hover:text-on-dark"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-on-dark-hairline pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-on-dark-muted">
            {BRAND.disclaimer}
          </p>
          <div className="mt-5 flex flex-col gap-3 text-xs text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-on-dark">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-on-dark">
                Terms
              </Link>
              <a
                href={`mailto:${BRAND.email}`}
                className="hover:text-on-dark"
              >
                {BRAND.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
