import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

// 7s @ 30fps — full agentic terminal demo: read files → edit → run tests → done

const ACCENT = "#4ADE80";
const BLUE   = "#93C5FD";
const YELLOW = "#FBBF24";
const DIM    = "#6B7280";
const RED    = "#F87171";
const BG     = "#0D0D10";

type LogLine = {
  startFrame: number;
  text: string;
  color: string;
  indent?: number;
};

const LINES: LogLine[] = [
  { startFrame: 8,   text: "➜  ~ claude",                                color: "#E5E7EB" },
  { startFrame: 20,  text: "> add authentication to the /api routes",     color: YELLOW,   indent: 2 },
  { startFrame: 34,  text: "● Reading project structure...",              color: DIM },
  { startFrame: 40,  text: "  ↳ src/api/users.ts",                       color: DIM,      indent: 4 },
  { startFrame: 44,  text: "  ↳ src/api/posts.ts",                       color: DIM,      indent: 4 },
  { startFrame: 48,  text: "  ↳ src/middleware/index.ts",                 color: DIM,      indent: 4 },
  { startFrame: 54,  text: "  ↳ src/lib/auth.ts",                        color: DIM,      indent: 4 },
  { startFrame: 62,  text: "● Planning changes across 4 files",           color: BLUE },
  { startFrame: 72,  text: "✎ src/middleware/auth.ts  [new file]",        color: ACCENT },
  { startFrame: 80,  text: "✎ src/api/users.ts  [modified]",              color: ACCENT },
  { startFrame: 86,  text: "✎ src/api/posts.ts  [modified]",              color: ACCENT },
  { startFrame: 92,  text: "✎ src/lib/auth.ts  [modified]",               color: ACCENT },
  { startFrame: 100, text: "● Running tests...",                           color: BLUE },
  { startFrame: 112, text: "  ✓ auth middleware applies to /api/users",   color: ACCENT,   indent: 4 },
  { startFrame: 118, text: "  ✓ auth middleware applies to /api/posts",   color: ACCENT,   indent: 4 },
  { startFrame: 124, text: "  ✓ unauthenticated requests return 401",     color: ACCENT,   indent: 4 },
  { startFrame: 132, text: "  ✓ valid tokens pass through",               color: ACCENT,   indent: 4 },
  { startFrame: 140, text: "● All tests passed (4/4)",                    color: ACCENT },
  { startFrame: 152, text: "✔ Done — 4 files changed, 0 tests failing",   color: ACCENT },
];

const TOTAL_FRAMES = 210;

export const ClaudeCodeTerminalDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Window entrance
  const winOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const winY = interpolate(frame, [0, 10], [30, 0], { extrapolateRight: "clamp" });

  // Visible lines
  const visibleLines = LINES.filter((l) => frame >= l.startFrame);

  // Spinner on "Reading" and "Running tests" lines
  const spinChars = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const spinChar = spinChars[Math.floor(frame / 3) % spinChars.length] ?? "⠋";

  // Success glow
  const successFrame = LINES[LINES.length - 1]?.startFrame ?? 0;
  const glow = interpolate(frame, [successFrame, successFrame + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Progress bar (tracks from line 100 to line 140)
  const progressPct = interpolate(frame, [100, 140], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Done card scale
  const doneScale = spring({ frame: frame - successFrame, fps, config: { damping: 14, stiffness: 220 } });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 120% 80% at 50% 55%, #080810 0%, ${BG} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 50px",
        fontFamily: '"SF Mono", "Fira Code", monospace',
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(74,222,128,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div
        style={{
          opacity: winOpacity,
          transform: `translateY(${winY}px)`,
          width: "100%",
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: `0 40px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.07)${glow > 0 ? `, 0 0 ${Math.round(60 * glow)}px rgba(74,222,128,${(0.3 * glow).toFixed(2)})` : ""}`,
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
            <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
          ))}
          <span style={{ flex: 1, textAlign: "center", color: "#4B5563", fontSize: 20 }}>
            zsh — claude agent
          </span>
        </div>

        {/* Terminal body */}
        <div style={{ background: BG, padding: "28px 32px", minHeight: 700 }}>
          {LINES.map((line, i) => {
            if (frame < line.startFrame) return null;

            const isSpinning =
              (line.text.startsWith("● Reading") && frame < (LINES[8]?.startFrame ?? 999)) ||
              (line.text.startsWith("● Running") && frame < (LINES[18]?.startFrame ?? 999));

            const lineOpacity = interpolate(
              frame,
              [line.startFrame, line.startFrame + 5],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: lineOpacity,
                  fontSize: 24,
                  lineHeight: 1.7,
                  color: line.color,
                  paddingLeft: line.indent ?? 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {isSpinning && (
                  <span style={{ color: BLUE, fontSize: 22 }}>{spinChar}</span>
                )}
                <span>{line.text}</span>
              </div>
            );
          })}

          {/* Progress bar during test run */}
          {frame >= 100 && frame < 152 && (
            <div style={{ marginTop: 12, marginBottom: 4 }}>
              <div
                style={{
                  height: 5,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 999,
                  overflow: "hidden",
                  width: "80%",
                  marginLeft: 24,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progressPct}%`,
                    background: `linear-gradient(90deg, ${ACCENT}, #86EFAC)`,
                    borderRadius: 999,
                    boxShadow: `0 0 10px rgba(74,222,128,0.5)`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Done card */}
          {frame >= successFrame && (
            <div
              style={{
                marginTop: 20,
                transform: `scale(${doneScale})`,
                transformOrigin: "left center",
                display: "flex",
                alignItems: "center",
                gap: 18,
                background: "rgba(74,222,128,0.07)",
                border: `1px solid rgba(74,222,128,${(0.2 + 0.2 * glow).toFixed(2)})`,
                borderRadius: 12,
                padding: "18px 24px",
              }}
            >
              <span style={{ fontSize: 40, color: ACCENT, filter: "drop-shadow(0 0 8px rgba(74,222,128,0.7))" }}>✔</span>
              <div>
                <div style={{ color: ACCENT, fontSize: 30, fontWeight: 700 }}>Task complete</div>
                <div style={{ color: DIM, fontSize: 22 }}>4 files changed · 4 tests passing · 0 errors</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
