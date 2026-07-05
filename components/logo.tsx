import { BRAND } from "@/lib/brand";

/**
 * Soval AI logo lockup. Uses the transparent dark logo on light surfaces and
 * the transparent light logo on dark surfaces. Assets live in /public.
 */
export function Logo({
  className = "h-8 w-auto",
  onDark = false,
  priority = false,
}: {
  className?: string;
  onDark?: boolean;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- small static brand asset; next/image adds no benefit
    <img
      src={onDark ? "/logo-light.png" : "/logo-dark.png"}
      alt={`${BRAND.name} logo`}
      className={className}
      width={900}
      height={166}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
