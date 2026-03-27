import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

type IconItem = {
  content: string;
  label?: string;
  delayFrames: number;
};

type IconPopInProps = {
  icons: IconItem[];
  startFrame: number;
  durationInFrames: number;
  size?: number;
};

export const IconPopIn: React.FC<IconPopInProps> = ({
  icons,
  startFrame,
  durationInFrames,
  size = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame >= durationInFrames) {
    return null;
  }

  const fadeOut = interpolate(
    localFrame,
    [durationInFrames - 5, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        opacity: fadeOut,
        pointerEvents: "none",
      }}
    >
      {icons.map((icon, i) => {
        const iconScale = spring({
          frame: localFrame - icon.delayFrames,
          fps,
          config: { damping: 10, stiffness: 180, overshootClamping: false },
          from: 0,
          to: 1,
        });

        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              transform: `scale(${iconScale})`,
            }}
          >
            <span
              style={{
                fontSize: size,
                filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))",
                lineHeight: 1,
              }}
            >
              {icon.content}
            </span>
            {icon.label && (
              <span
                style={{
                  color: "white",
                  fontSize: 28,
                  fontWeight: 700,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                  textTransform: "uppercase",
                }}
              >
                {icon.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
