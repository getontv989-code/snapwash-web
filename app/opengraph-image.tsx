import { ImageResponse } from "next/og";

export const alt = "Snapwash: laundry and dry cleaning pickup and delivery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#0060F6", color: "#FFFFFF" }}>
        <div style={{ fontSize: 30, letterSpacing: 4, textTransform: "uppercase", opacity: 0.85 }}>Laundry &amp; dry cleaning pickup · NY · NJ · CT</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 128, fontWeight: 800, lineHeight: 0.95, letterSpacing: -5 }}>
          <span>Fresh clothes.</span>
          <span>Zero effort.</span>
        </div>
        <div style={{ fontSize: 44, fontWeight: 700 }}>snapwash</div>
      </div>
    ),
    size
  );
}
