import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

// 5s @ 30fps — split screen: OLD WAY timer vs CLAUDE CODE timer

const ACCENT = "#4ADE80";
const RED    = "#F87171";
const DIM    = "#6B7280";
const BG     = "#0D0D10";

// Old way: simulates ~30 minutes by counting fast (reaches "29:47" by end)
// Claude Code: reaches "1:52" quickly then done

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const TOTAL_FRAMES = 150;

export const BeforeAfterClock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Both panels fade in
  const panelOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // OLD WAY clock: runs fast, simulates 30 minutes (1800s) mapped to 150 frames
  const oldSeconds = Math.floor(
    interpolate(frame, [10, TOTAL_FRAMES], [0, 1800], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );

  // CLAUDE CODE clock: runs to ~112s (1min 52s) by frame 90, then stops with ✓
  const claudeSeconds = Math.floor(
    interpolate(frame, [10, 90], [0, 112], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );
  const claudeDone = frame >= 90;
  const doneScale = spring({ frame: frame - 90, fps, config: { damping: 12, stiffness: 200 } });

  // Label badges animate in
  const labelScale = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 180 } });

  // VS divider
  const vsOpacity = interpolate(frame, [8, 18], [0, 1], { extrapolateRight: "clamp" });

  // Old way panic color (gets redder as time goes on)
  const panicProgress = interpolate(frame, [30, TOTAL_FRAMES], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        fontFamily: '"SF Mono", "Fira Code", monospace',
      }}
    >
      {/* OLD WAY panel */}
      <div
        style={{
          flex: 1,
          opacity: panelOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 40px",
          background: `rgba(248,113,113,${(0.03 + 0.05 * panicProgress).toFixed(3)})`,
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            transform: `scale(${labelScale})`,
            background: "rgba(248,113,113,0.12)",
            border: "1px solid rgba(248,113,113,0.35)",
            borderRadius: 999,
            padding: "10px 28px",
            marginBottom: 48,
          }}
        >
          <span style={{ color: RED, fontSize: 26, fontWeight: 700, letterSpacing: 1 }}>OLD WAY</span>
        </div>

        {/* Clock face */}
        <div
          style={{
            fontSize: 110,
            fontWeight: 700,
            color: `rgb(${Math.round(229 + 26 * panicProgress)}, ${Math.round(115 - 115 * panicProgress)}, ${Math.round(113 - 113 * panicProgress)})`,
            letterSpacing: "-4px",
            lineHeight: 1,
            textShadow: panicProgress > 0.5
              ? `0 0 ${Math.round(30 * panicProgress)}px rgba(248,113,113,0.4)`
              : "none",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatTime(oldSeconds)}
        </div>

        <div style={{ color: DIM, fontSize: 26, marginTop: 32, textAlign: "center", lineHeight: 1.5 }}>
          ChatGPT ↔ editor<br />
          <span style={{ fontSize: 22 }}>copy · paste · error · repeat</span>
        </div>

        {/* Loop indicator dots */}
        <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
          {[0, 1, 2, 3].map((i) => {
            const active = Math.floor(frame / 20) % 4 === i;
            return (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: active ? RED : "rgba(248,113,113,0.2)",
                }}
              />
            );
          })}
          <span style={{ color: "rgba(248,113,113,0.5)", fontSize: 20, marginLeft: 8 }}>looping...</span>
        </div>
      </div>

      {/* VS divider */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: vsOpacity,
          zIndex: 10,
          background: BG,
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "50%",
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#4B5563", fontSize: 22, fontWeight: 700 }}>VS</span>
      </div>

      {/* CLAUDE CODE panel */}
      <div
        style={{
          flex: 1,
          opacity: panelOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 40px",
          background: claudeDone ? "rgba(74,222,128,0.04)" : "transparent",
        }}
      >
        <div
          style={{
            transform: `scale(${labelScale})`,
            background: "rgba(74,222,128,0.1)",
            border: "1px solid rgba(74,222,128,0.35)",
            borderRadius: 999,
            padding: "10px 20px",
            marginBottom: 48,
          }}
        >
          <span style={{ color: ACCENT, fontSize: 22, fontWeight: 700, letterSpacing: 0.5 }}>CLAUDE CODE</span>
        </div>

        {/* Clock face */}
        <div
          style={{
            fontSize: 110,
            fontWeight: 700,
            color: claudeDone ? ACCENT : "#E5E7EB",
            letterSpacing: "-4px",
            lineHeight: 1,
            textShadow: claudeDone ? `0 0 30px rgba(74,222,128,0.5)` : "none",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatTime(claudeSeconds)}
        </div>

        {/* Done badge */}
        {claudeDone && (
          <div
            style={{
              transform: `scale(${doneScale})`,
              marginTop: 28,
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.4)",
              borderRadius: 12,
              padding: "14px 28px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 36, color: ACCENT }}>✓</span>
            <span style={{ color: ACCENT, fontSize: 28, fontWeight: 700 }}>Done</span>
          </div>
        )}

        {!claudeDone && (
          <div style={{ color: DIM, fontSize: 26, marginTop: 32, textAlign: "center", lineHeight: 1.5 }}>
            terminal agent<br />
            <span style={{ fontSize: 22 }}>reading · editing · testing</span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
