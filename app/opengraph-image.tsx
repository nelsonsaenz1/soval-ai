import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

export const alt = `${BRAND.name} — Give yourself back the hours AI was supposed to save`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(1000px 500px at 12% 8%, rgba(42,111,151,0.45), transparent 60%), radial-gradient(900px 500px at 92% 20%, rgba(46,125,125,0.32), transparent 58%), #0a2633",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#2a6f97",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fbf8f5",
              fontSize: "42px",
            }}
          >
            S
          </div>
          <div
            style={{
              color: "#8fc2dd",
              fontSize: "24px",
              letterSpacing: "4px",
              fontFamily: "Helvetica, Arial, sans-serif",
              textTransform: "uppercase",
            }}
          >
            {BRAND.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              color: "#f4efe7",
              fontSize: "68px",
              lineHeight: 1.1,
              maxWidth: "1000px",
            }}
          >
            Give yourself back the hours AI was supposed to save.
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "30px",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            Personal AI assistants + small-business automation.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
