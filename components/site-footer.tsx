import Link from "next/link";
import { disclaimer, footerNav, site } from "@/lib/site-copy";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="container-edge py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg font-semibold tracking-tight"
            >
              <span
                aria-hidden="true"
                className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-[0.8rem] font-bold text-accent-foreground"
              >
                N
              </span>
              <span className="text-[1.05rem]">{site.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A done-for-you personal AI agent, installed in your home and kept
              working by a human concierge. Local-first, private, and built
              around your household.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-2">
            {footerNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-subtle-foreground">
            {disclaimer}
          </p>
          <p className="mt-4 text-xs text-subtle-foreground">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
