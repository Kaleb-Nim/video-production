import React from "react";
import { useCurrentFrame, interpolate, Img, staticFile } from "remotion";

type ImageFlashProps = {
  src: string;
  startFrame: number;
  durationInFrames: number;
};

export const ImageFlash: React.FC<ImageFlashProps> = ({
  src,
  startFrame,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame >= durationInFrames) {
    return null;
  }

  const fadeIn = interpolate(localFrame, [0, 3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    localFrame,
    [durationInFrames - 3, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "92%",
          height: "auto",
          maxHeight: "85%",
          objectFit: "contain",
          borderRadius: 12,
          boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
        }}
      />
    </div>
  );
};
