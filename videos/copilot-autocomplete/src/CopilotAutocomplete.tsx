import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

// 4s @ 30fps — editor with Copilot ghost suggestion, highlights the "one line" ceiling

const GHOST   = "rgba(156,163,175,0.45)";
const BLUE    = "#60A5FA";
const YELLOW  = "#FBBF24";
const DIM     = "#4B5563";
const ACCENT  = "#4ADE80";
const BG      = "#0D0D10";

const LINES = [
  { n: 1,  text: "async function loadUser(id: string) {",   color: "#C084FC" },
  { n: 2,  text: '  const res = await fetch(`/api/${id}`);', color: "#E5E7EB" },
  { n: 3,  text: "  if (!res.ok) {",                         color: "#E5E7EB" },
  { n: 4,  text: '    throw new Error("Failed");',           color: "#F87171" },
  { n: 5,  text: "  }",                                       color: "#E5E7EB" },
  { n: 6,  text: "  return res.json();",                      color: "#E5E7EB" },
  { n: 7,  text: "}",                                         color: "#C084FC" },
  { n: 8,  text: "",                                          color: "#E5E7EB" },
  { n: 9,  text: "// Fix the type error on line 2",           color: DIM       },
  { n: 10, text: "const data = loadUser(",                    color: "#E5E7EB" },
];

const TYPED   = "const data = loadUser(";
const GHOST_SUGGESTION = 'userId as string);';

export const CopilotAutocomplete: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // editor fades in
  const editorOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // cursor blinks on line 10
  const cursorOn = Math.floor(frame / 8) % 2 === 0;

  // ghost suggestion appears at frame 20
  const ghostOpacity = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // "Copilot" badge pulses after suggestion appears
  const badgeScale = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 200 } });

  // ceiling label animates in at frame 55
  const ceilingOpacity = interpolate(frame, [55, 68], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ceilingY = interpolate(frame, [55, 68], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 120% 80% at 50% 45%, #0a0a0f 0%, ${BG} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 50px",
        fontFamily: '"SF Mono", "Fira Code", monospace',
      }}
    >
      {/* Editor window */}
      <div
        style={{
          opacity: editorOpacity,
          width: "100%",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: "#1A1A1E",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {(["#FF5F57", "#FEBC2E", "#28C840"] as const).map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
          <span style={{ color: DIM, fontSize: 20, marginLeft: 8 }}>user.ts</span>

          {/* Copilot badge */}
          {frame >= 20 && (
            <div
              style={{
                marginLeft: "auto",
                transform: `scale(${badgeScale})`,
                background: "rgba(96,165,250,0.1)",
                border: "1px solid rgba(96,165,250,0.3)",
                borderRadius: 999,
                padding: "4px 14px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 16 }}>🤖</span>
              <span style={{ color: BLUE, fontSize: 18, fontWeight: 600 }}>Copilot</span>
            </div>
          )}
        </div>

        {/* Code body */}
        <div style={{ background: "#0D0D10", padding: "24px 28px" }}>
          {LINES.map((line) => (
            <div key={line.n} style={{ display: "flex", alignItems: "center", fontSize: 26, lineHeight: 1.75 }}>
              <span style={{ color: "#2D3748", width: 36, textAlign: "right", marginRight: 20, flexShrink: 0, userSelect: "none" }}>
                {line.n}
              </span>
              <span style={{ color: line.n === 9 ? DIM : line.color }}>
                {line.n === 10 ? (
                  <>
                    <span style={{ color: "#E5E7EB" }}>{TYPED}</span>
                    {/* Ghost suggestion */}
                    <span style={{ color: GHOST, opacity: ghostOpacity }}>{GHOST_SUGGESTION}</span>
                    {/* Cursor */}
                    {!ghostOpacity && cursorOn && (
                      <span
                        style={{
                          display: "inline-block",
                          width: 16,
                          height: 28,
                          background: ACCENT,
                          borderRadius: 2,
                          verticalAlign: "middle",
                        }}
                      />
                    )}
                  </>
                ) : (
                  line.text
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ceiling label */}
      <div
        style={{
          opacity: ceilingOpacity,
          transform: `translateY(${ceilingY}px)`,
          marginTop: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            background: "rgba(251,191,36,0.08)",
            border: "1px solid rgba(251,191,36,0.3)",
            borderRadius: 14,
            padding: "20px 36px",
            textAlign: "center",
          }}
        >
          <div style={{ color: YELLOW, fontSize: 30, fontWeight: 700, marginBottom: 8 }}>
            Copilot fixes one line at a time.
          </div>
          <div style={{ color: DIM, fontSize: 24 }}>
            You still have to drive everything else.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
