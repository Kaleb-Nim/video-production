import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

// 5s @ 30fps — animated copy-paste pain loop
// Layout: two stacked panels (ChatGPT top, Editor bottom), arrows + code flying between them

const ACCENT = "#4ADE80";
const RED    = "#F87171";
const BLUE   = "#60A5FA";
const YELLOW = "#FBBF24";
const DIM    = "#6B7280";
const BG     = "#0D0D10";

// One full loop cycle: 0→75 = paste in, error, 75→150 = go back, repeat
const LOOP_FRAMES = 75;

function useLoopFrame(frame: number) {
  return frame % LOOP_FRAMES;
}

const Panel: React.FC<{
  label: string;
  labelColor: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ label, labelColor, children, style }) => (
  <div
    style={{
      background: "#111116",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    {/* panel title bar */}
    <div
      style={{
        background: "#1A1A1E",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        flexShrink: 0,
      }}
    >
      {(["#FF5F57", "#FEBC2E", "#28C840"] as const).map((c) => (
        <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
      ))}
      <span style={{ color: labelColor, fontSize: 22, fontWeight: 600, marginLeft: 8, fontFamily: "monospace" }}>
        {label}
      </span>
    </div>
    <div style={{ flex: 1, padding: "20px 24px", overflow: "hidden" }}>{children}</div>
  </div>
);

export const ChatgptCopyPasteLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lf = useLoopFrame(frame);

  // --- ChatGPT panel: shows "response" that pulses when being copied ---
  const responseOpacity = interpolate(lf, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const copyFlash = lf >= 30 && lf <= 38
    ? Math.sin(((lf - 30) / 8) * Math.PI)
    : 0;

  // --- Arrow: shoots down from ChatGPT to editor at frame 30 ---
  const arrowY = interpolate(lf, [30, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const arrowOpacity = lf >= 30 && lf < 52 ? 1 : 0;

  // --- Editor panel: code appears then error appears ---
  const codeOpacity = interpolate(lf, [44, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const errorOpacity = interpolate(lf, [56, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // --- "Go back" arrow shoots up at frame 64 ---
  const backArrowProgress = interpolate(lf, [64, 74], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const backArrowOpacity = lf >= 64 && lf < 75 ? 1 : 0;

  // Loop counter
  const loopCount = Math.floor(frame / LOOP_FRAMES) + 1;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 120% 80% at 50% 50%, #0a0a0f 0%, ${BG} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 60px",
        gap: 0,
        fontFamily: '"SF Mono", "Fira Code", monospace',
      }}
    >
      {/* Loop counter badge */}
      <div
        style={{
          position: "absolute",
          top: 48,
          right: 60,
          background: "rgba(251,191,36,0.12)",
          border: "1px solid rgba(251,191,36,0.35)",
          borderRadius: 999,
          padding: "8px 22px",
          color: YELLOW,
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        Loop #{loopCount}
      </div>

      {/* ChatGPT panel */}
      <Panel label="ChatGPT" labelColor="#10A37F" style={{ width: "100%", height: 380 }}>
        <div style={{ color: DIM, fontSize: 22, marginBottom: 14 }}>You: how do I fix this error?</div>
        <div
          style={{
            opacity: responseOpacity,
            background: copyFlash > 0
              ? `rgba(16,163,127,${(0.15 * copyFlash).toFixed(2)})`
              : "rgba(255,255,255,0.03)",
            border: copyFlash > 0
              ? `1px solid rgba(16,163,127,${(0.5 * copyFlash).toFixed(2)})`
              : "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
            padding: "14px 18px",
            transition: "background 0.05s",
          }}
        >
          <div style={{ color: "#E5E7EB", fontSize: 24, lineHeight: 1.6 }}>
            Here's the fix — replace line 42 with:
          </div>
          <div style={{ color: BLUE, fontSize: 22, marginTop: 8, fontFamily: "monospace" }}>
            {"const result = await fetchData(id);"}
          </div>
          {copyFlash > 0 && (
            <div style={{ color: "#10A37F", fontSize: 20, marginTop: 8, fontWeight: 600 }}>
              📋 Copied!
            </div>
          )}
        </div>
      </Panel>

      {/* Down arrow */}
      <div
        style={{
          position: "relative",
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          opacity: arrowOpacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: `${(1 - arrowY) * -20}px`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div style={{ color: YELLOW, fontSize: 28, fontWeight: 700 }}>PASTE →</div>
          <div style={{ color: YELLOW, fontSize: 32 }}>↓</div>
        </div>
      </div>

      {/* Editor panel */}
      <Panel label="editor" labelColor={BLUE} style={{ width: "100%", height: 420 }}>
        {/* existing code lines */}
        {["const data = getData();", "// TODO: fix this", "render(data);"].map((line, i) => (
          <div key={i} style={{ color: DIM, fontSize: 22, lineHeight: 1.8 }}>
            <span style={{ color: "#374151", marginRight: 16 }}>{40 + i}</span>
            {line}
          </div>
        ))}
        {/* pasted line */}
        <div
          style={{
            opacity: codeOpacity,
            color: BLUE,
            fontSize: 22,
            lineHeight: 1.8,
            background: "rgba(96,165,250,0.06)",
            borderRadius: 4,
            paddingLeft: 4,
          }}
        >
          <span style={{ color: "#374151", marginRight: 16 }}>42</span>
          {"const result = await fetchData(id);"}
        </div>

        {/* error */}
        {errorOpacity > 0 && (
          <div
            style={{
              opacity: errorOpacity,
              marginTop: 16,
              background: "rgba(248,113,113,0.08)",
              border: "1px solid rgba(248,113,113,0.3)",
              borderRadius: 10,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 28 }}>🔴</span>
            <div>
              <div style={{ color: RED, fontSize: 22, fontWeight: 600 }}>TypeError: fetchData is not a function</div>
              <div style={{ color: DIM, fontSize: 19, marginTop: 4 }}>line 42, col 24</div>
            </div>
          </div>
        )}
      </Panel>

      {/* Back-up arrow */}
      {backArrowOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: 80,
            top: "50%",
            opacity: backArrowOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div style={{ color: RED, fontSize: 30 }}>↑</div>
          <div style={{ color: RED, fontSize: 22, fontWeight: 700 }}>BACK</div>
        </div>
      )}
    </AbsoluteFill>
  );
};
