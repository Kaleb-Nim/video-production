import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

// 4s @ 30fps — side-by-side: "CLAUDE (chatbot)" vs "CLAUDE CODE (agent)" with labels animating in

const ACCENT  = "#4ADE80";
const PURPLE  = "#C084FC";
const DIM     = "#6B7280";
const BG      = "#0D0D10";

export const ClaudeVsClaudecodeLabel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Left panel (Claude chatbot) enters from left
  const leftX = interpolate(
    spring({ frame: frame - 5, fps, config: { damping: 16, stiffness: 160 } }),
    [0, 1], [-120, 0]
  );
  const leftOpacity = interpolate(frame, [5, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Right panel (Claude Code agent) enters from right, slightly delayed
  const rightX = interpolate(
    spring({ frame: frame - 14, fps, config: { damping: 16, stiffness: 160 } }),
    [0, 1], [120, 0]
  );
  const rightOpacity = interpolate(frame, [14, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // "DIFFERENT TOOLS" footer badge
  const footerOpacity = interpolate(frame, [55, 68], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const footerY = interpolate(frame, [55, 68], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Divider line draws in
  const dividerHeight = interpolate(frame, [20, 40], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
        fontFamily: '"SF Mono", "Fira Code", monospace',
        gap: 0,
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div style={{ display: "flex", width: "100%", gap: 0, flex: 1, position: "relative" }}>
        {/* Left: Claude chatbot */}
        <div
          style={{
            flex: 1,
            opacity: leftOpacity,
            transform: `translateX(${leftX}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 28px",
            gap: 28,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(192,132,252,0.1)",
              border: "2px solid rgba(192,132,252,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
            }}
          >
            💬
          </div>

          {/* Name */}
          <div style={{ textAlign: "center" }}>
            <div style={{ color: PURPLE, fontSize: 42, fontWeight: 700, letterSpacing: "-1px" }}>Claude</div>
            <div
              style={{
                color: "rgba(192,132,252,0.6)",
                fontSize: 24,
                marginTop: 8,
                background: "rgba(192,132,252,0.08)",
                border: "1px solid rgba(192,132,252,0.2)",
                borderRadius: 999,
                padding: "6px 20px",
                display: "inline-block",
              }}
            >
              CHATBOT
            </div>
          </div>

          {/* Traits */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            {[
              "You describe the problem",
              "It gives you an answer",
              "You implement it yourself",
              "You copy-paste the code",
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: DIM,
                  fontSize: 22,
                  lineHeight: 1.4,
                }}
              >
                <span style={{ color: "rgba(192,132,252,0.4)", fontSize: 18 }}>•</span>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Center divider */}
        <div
          style={{
            width: 1,
            background: `linear-gradient(to bottom, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, transparent)`,
            clipPath: `inset(${100 - dividerHeight}% 0 0 0)`,
            flexShrink: 0,
          }}
        />

        {/* Right: Claude Code agent */}
        <div
          style={{
            flex: 1,
            opacity: rightOpacity,
            transform: `translateX(${rightX}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 28px",
            gap: 28,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(74,222,128,0.1)",
              border: "2px solid rgba(74,222,128,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              boxShadow: "0 0 30px rgba(74,222,128,0.15)",
            }}
          >
            {">"}_
          </div>

          {/* Name */}
          <div style={{ textAlign: "center" }}>
            <div style={{ color: ACCENT, fontSize: 36, fontWeight: 700, letterSpacing: "-1px" }}>Claude Code</div>
            <div
              style={{
                color: "rgba(74,222,128,0.7)",
                fontSize: 24,
                marginTop: 8,
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.25)",
                borderRadius: 999,
                padding: "6px 20px",
                display: "inline-block",
              }}
            >
              AGENT
            </div>
          </div>

          {/* Traits */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            {[
              "You describe what you want",
              "It reads your whole codebase",
              "It writes, runs & fixes the code",
              "You don't touch the editor",
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "#D1FAE5",
                  fontSize: 22,
                  lineHeight: 1.4,
                }}
              >
                <span style={{ color: ACCENT, fontSize: 18 }}>✓</span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer badge */}
      <div
        style={{
          opacity: footerOpacity,
          transform: `translateY(${footerY}px)`,
          marginTop: 32,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 14,
          padding: "18px 40px",
        }}
      >
        <span style={{ color: "#9CA3AF", fontSize: 26, fontWeight: 600, letterSpacing: "0.5px" }}>
          Same company. Completely different tools.
        </span>
      </div>
    </AbsoluteFill>
  );
};
