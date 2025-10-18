import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Ezedin Ebrahim - Full Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div style={{ fontSize: 72, fontWeight: "bold" }}>
            Ezedin Ebrahim
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#d1d5db",
              fontWeight: "normal",
            }}
          >
            Full Stack Developer
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#9ca3af",
              marginTop: "20px",
            }}
          >
            ezedin.me
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

