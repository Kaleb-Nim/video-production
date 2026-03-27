import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

type TextOverlayProps = {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
  position?: "top" | "center" | "bottom";
};

export const TextOverlay: React.FC<TextOverlayProps> = ({
  text,
  delay = 0,
  style,
  position = "bottom",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const opacity = progress;

  const positionStyle: React.CSSProperties =
    position === "top"
      ? { top: 80, left: 60, right: 60 }
      : position === "center"
        ? {
            top: "50%",
            left: 60,
            right: 60,
            transform: `translateY(-50%) scale(${scale})`,
          }
        : { bottom: 200, left: 60, right: 60 };

  return (
    <div
      style={{
        position: "absolute",
        opacity,
        transform: position !== "center" ? `scale(${scale})` : undefined,
        color: "white",
        fontSize: 52,
        fontWeight: 700,
        fontFamily: "system-ui, -apple-system, sans-serif",
        textShadow: "0 2px 20px rgba(0,0,0,0.8)",
        ...positionStyle,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
