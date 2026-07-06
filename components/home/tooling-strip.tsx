import { MonoLabel } from "@/components/ui/mono-label";

/**
 * Thin "built in the right stack" bar between the hero and the problem section.
 * The tools mirror the stack listed in lib/services.ts (Automation Build Sprint).
 */
const TOOLS = [
  "Claude",
  "ChatGPT",
  "Zapier",
  "Make",
  "n8n",
  "Airtable",
  "Notion",
  "Google Workspace",
];

export function ToolingStrip() {
  return (
    <div className="bg-dark border-b border-white/10">
      <div className="container-edge flex flex-wrap items-center gap-x-6 gap-y-2 py-5">
        <MonoLabel className="whitespace-nowrap text-[10.5px] tracking-[0.12em] text-white/40">
          Built in the right stack
        </MonoLabel>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-1 font-grotesk text-[15px] font-medium text-white/[0.38]">
          {TOOLS.map((tool) => (
            <span key={tool} className="whitespace-nowrap">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
