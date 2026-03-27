import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { Video } from "@remotion/media";

type SegmentBaseProps = {
  videoSrc: string;
  startFrom?: number; // frames to skip at start (converted to seconds for trimBefore)
  children?: React.ReactNode;
};

export const SegmentBase: React.FC<SegmentBaseProps> = ({
  videoSrc,
  startFrom,
  children,
}) => {
  const trimBefore = startFrom != null ? startFrom / 30 : undefined;

  return (
    <AbsoluteFill>
      <Video
        src={staticFile(videoSrc)}
        trimBefore={trimBefore}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
