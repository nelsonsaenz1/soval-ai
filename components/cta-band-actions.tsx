"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ctaBand } from "@/lib/site-copy";
import { trackEvent } from "@/lib/analytics";

export function CtaBandActions({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
      {children}
      <Button
        href={ctaBand.secondary.href}
        size="lg"
        variant="secondary"
        className="border-white/20 bg-transparent text-on-contrast hover:border-white/40 hover:bg-white/10"
        onClick={() => trackEvent("book_call_clicked", { location: "cta-band" })}
      >
        {ctaBand.secondary.label}
      </Button>
    </div>
  );
}
