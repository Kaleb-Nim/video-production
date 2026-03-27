import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

type EmojiOverlayProps = {
  emoji: string;
  startFrame: number;
  durationInFrames: number;
  size?: number;
  position?: "center" | "top" | "bottom-right";
};

export const EmojiOverlay: React.FC<EmojiOverlayProps> = ({
  emoji,
  startFrame,
  durationInFrames,
  size = 200,
  position = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame >= durationInFrames) {
    return null;
  }

  const scaleSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 200 },
    from: 0.3,
    to: 1,
  });

  const fadeOut = interpolate(
    localFrame,
    [durationInFrames - 5, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  const positionStyle: React.CSSProperties =
    position === "top"
      ? { top: 120, left: 0, right: 0, justifyContent: "center" }
      : position === "bottom-right"
        ? { bottom: 300, right: 60 }
        : { top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" };

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        opacity: fadeOut,
        transform: `scale(${scaleSpring})`,
        pointerEvents: "none",
        ...positionStyle,
      }}
    >
      <span
        style={{
          fontSize: size,
          filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.5))",
          lineHeight: 1,
        }}
      >
        {emoji}
      </span>
    </div>
  );
};
