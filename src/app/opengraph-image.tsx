import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const tags = [
    "Autonomous RAG Systems",
    "Workflow Automation & SaaS",
    "Full-Stack Web Development",
    "Custom AI Integration",
  ];

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
            "radial-gradient(circle at 15% 20%, rgba(124, 58, 237, 0.4) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 45%)",
          padding: "60px 70px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Frame border */}
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

        {/* Header row */}
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
                Engineering & AI Studio
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(168, 85, 247, 0.15)",
              border: "1px solid rgba(168, 85, 247, 0.4)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#22c55e",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              Verified Engineering Studio
            </span>
          </div>
        </div>

        {/* Center: Main Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "58px",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Elite AI Studio, ML &</span>
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #c084fc 0%, #818cf8 50%, #38bdf8 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Software Engineering
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
            Architecting production AI systems, RAG workflows, workflow automation, SaaS platforms, web development, mobile apps, and custom AI integration.
          </p>
        </div>

        {/* Bottom Capabilities Tags + Footer */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  color: "#e2e8f0",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>

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
              whizzlylab.com • Elite AI & Engineering Studio
            </span>
            <span style={{ fontSize: "16px", color: "#a855f7", fontWeight: 600 }}>
              Global Remote AI & Engineering
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
