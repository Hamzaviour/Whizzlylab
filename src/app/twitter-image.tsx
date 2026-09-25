import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#05010f",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
          padding: "60px 70px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            right: "24px",
            bottom: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
            display: "flex",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #06b6d4 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "6px",
                  backgroundColor: "#ffffff",
                  display: "flex",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                }}
              >
                WHIZZLY LAB
              </span>
              <span
                style={{
                  fontSize: "14px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#a855f7",
                  fontWeight: 600,
                }}
              >
                AI Engineering Studio
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(168, 85, 247, 0.15)",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              color: "#c084fc",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            @whizzlylab
          </div>
        </div>

        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Intelligent AI Systems &</span>
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #c084fc 0%, #818cf8 50%, #38bdf8 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              High-Scale Software
            </span>
          </div>

          <p
            style={{
              fontSize: "22px",
              lineHeight: 1.4,
              color: "#94a3b8",
              margin: 0,
              display: "flex",
            }}
          >
            Web development, workflow automation, RAG systems, SaaS platforms, mobile apps, and custom AI integration engineered by Whizzly Lab's elite team.
          </p>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "16px",
          }}
        >
          <span style={{ fontSize: "16px", color: "#64748b", fontWeight: 500 }}>
            whizzlylab.com • AI Services & Software Engineering
          </span>
          <span style={{ fontSize: "16px", color: "#38bdf8", fontWeight: 600 }}>
            Ship Production AI
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
