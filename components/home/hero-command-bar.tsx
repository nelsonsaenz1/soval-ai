"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { trackEvent } from "@/lib/analytics";

const PLACEHOLDER = "Summarize my inbox and prep me for today";

/**
 * The hero's signature "command bar". A real, focusable input that routes to
 * /book on submit (carrying whatever was typed as the booking focus). When idle
 * and empty it shows a decorative typed-query placeholder with a blinking caret,
 * matching the design reference; the caret is aria-hidden.
 */
export function HeroCommandBar() {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const showGhost = !focused && value === "";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("consult_clicked", { source: "hero_command" });
    const q = value.trim();
    router.push(q ? `/book?q=${encodeURIComponent(q)}` : "/book");
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-9 flex max-w-[620px] items-center gap-3 rounded-pill border border-white/[0.14] bg-white/[0.06] py-[9px] pl-5 pr-[9px] shadow-[0_20px_50px_hsl(202_55%_8%/0.4)] backdrop-blur-[10px] transition-[border-color,box-shadow] duration-200 focus-within:border-accent-onDark/50"
    >
      <span aria-hidden="true" className="text-[15px] text-accent-onDark">
        ⌕
      </span>
      <div className="relative flex-1 text-left">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="off"
          aria-label="Tell us what you want handled, then book your consult"
          className="w-full bg-transparent text-[15px] text-white/90 caret-accent-onDark focus:outline-none"
        />
        {showGhost ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-nowrap text-[15px] text-white/60"
          >
            {PLACEHOLDER}
            <span className="sv-blink ml-0.5 inline-block h-[17px] w-[2px] bg-accent-onDark" />
          </span>
        ) : null}
      </div>
      <Button type="submit" variant="onDarkPrimary" size="md">
        {BRAND.primaryCta.label}
      </Button>
    </form>
  );
}
