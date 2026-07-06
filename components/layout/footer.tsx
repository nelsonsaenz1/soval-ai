import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Logo } from "@/components/logo";
import { MonoLabel } from "@/components/ui/mono-label";
import { cn } from "@/lib/cn";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer text-on-dark-secondary">
      <div className="container-edge pb-10 pt-14">
        <div className="grid gap-10 border-b border-white/10 pb-9 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              aria-label={`${BRAND.name} home`}
              className="inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-onDark"
            >
              <Logo onDark mono markSize={30} wordSize={17} />
            </Link>
            <p className="mt-4 max-w-[280px] text-[13.5px] leading-[1.6] text-white/55">
              {BRAND.promise} Done-for-you personal AI assistants and
              small-business automation.
            </p>
          </div>

          {BRAND.footerNav.map((group) => (
            <div key={group.title}>
              <MonoLabel className="text-[10.5px] tracking-[0.12em] text-white/40">
                {group.title}
              </MonoLabel>
              <ul className="mt-[14px] flex flex-col gap-[9px]">
                {group.links.map((link) => {
                  const primary = link.label === BRAND.primaryCta.label;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-[13.5px] transition-colors duration-150",
                          primary
                            ? "text-accent-onDark hover:text-accent-onDark/80"
                            : "text-white/[0.72] hover:text-white",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-[11px] leading-relaxed text-white/35">
          {BRAND.disclaimer}
        </p>

        <div className="mt-5 flex flex-col gap-2 font-mono text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {BRAND.name.toUpperCase()} · {BRAND.domain}
          </span>
          <a
            href={`mailto:${BRAND.email}`}
            className="transition-colors duration-150 hover:text-white/70"
          >
            {BRAND.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
