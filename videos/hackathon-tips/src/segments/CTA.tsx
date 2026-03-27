import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

// TODO: After filming CTA segment, add overlays and SFX:
// - EmojiOverlay 📱 at "save this" moment
// - TextOverlay "Claude Code setup" at "full Claude Code setup" mention
// - SFX: buzzer-wrong.mp3 at "didn't even open VS Code"
// - SFX: success-ding.mp3 at CTA close
export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Subtle pulsing scale
  const pulse = 1 + Math.sin(frame * 0.08) * 0.02;
  const titleScale = interpolate(titleProgress, [0, 1], [0.5, 1]) * pulse;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #111 0%, #1a1a2e 50%, #16213e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
      }}
    >
      {/* Main placeholder text */}
      <div
        style={{
          opacity: titleProgress,
          transform: `scale(${titleScale})`,
          color: "white",
          fontSize: 64,
          fontWeight: 800,
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "center",
          letterSpacing: 2,
        }}
      >
        CTA — TO BE FILMED
      </div>

      {/* Script reference */}
      <div
        style={{
          opacity: interpolate(frame, [15, 30], [0, 0.6], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
          color: "rgba(255,255,255,0.6)",
          fontSize: 28,
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "center",
          maxWidth: 800,
          lineHeight: 1.6,
          padding: "0 60px",
        }}
      >
        "If you've got your first hackathon coming up, save this. You'll thank
        me later. Drop a comment if you want me to show my full Claude Code
        setup — I didn't even open VS Code."
      </div>
    </AbsoluteFill>
  );
};
