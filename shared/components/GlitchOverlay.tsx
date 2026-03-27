import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

type GlitchOverlayProps = {
  startFrame: number;
  durationInFrames: number;
  intensity?: "light" | "heavy";
};

export const GlitchOverlay: React.FC<GlitchOverlayProps> = ({
  startFrame,
  durationInFrames,
  intensity = "light",
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame >= durationInFrames) {
    return null;
  }

  const heavy = intensity === "heavy";
  const flickerSpeed = heavy ? 3 : 5;
  const maxOpacity = heavy ? 0.4 : 0.2;

  // Color flicker — alternates red/cyan
  const flickerPhase = Math.floor(localFrame / flickerSpeed) % 2;
  const flickerColor = flickerPhase === 0 ? "rgba(255,0,0," : "rgba(0,255,255,";
  const flickerOpacity = interpolate(
    localFrame % flickerSpeed,
    [0, flickerSpeed],
    [maxOpacity, 0],
    { extrapolateRight: "clamp" }
  );

  // Scanline bars
  const scanlineOffset = (localFrame * (heavy ? 12 : 6)) % 40;

  // Displacement stripe — a horizontal bar that shifts position
  const stripeY = interpolate(
    localFrame,
    [0, durationInFrames],
    [heavy ? 200 : 400, heavy ? 1600 : 1200]
  );
  const stripeHeight = heavy ? 80 : 40;
  const stripeShift = heavy
    ? Math.sin(localFrame * 0.8) * 30
    : Math.sin(localFrame * 0.5) * 15;

  const fadeOut = interpolate(
    localFrame,
    [durationInFrames - 3, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: fadeOut, pointerEvents: "none" }}>
      {/* Color flicker */}
      <AbsoluteFill
        style={{
          backgroundColor: `${flickerColor}${flickerOpacity})`,
          mixBlendMode: "screen",
        }}
      />

      {/* Scanlines */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,${heavy ? 0.15 : 0.08}) 2px,
            rgba(0,0,0,${heavy ? 0.15 : 0.08}) 4px
          )`,
          backgroundPosition: `0 ${scanlineOffset}px`,
        }}
      />

      {/* Displacement stripe */}
      <div
        style={{
          position: "absolute",
          top: stripeY,
          left: stripeShift,
          right: -stripeShift,
          height: stripeHeight,
          backgroundColor: `rgba(255,255,255,${heavy ? 0.12 : 0.06})`,
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};
