import React from "react";
import { Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";

type SFXProps = {
  src: string;
  startFrame: number;
  durationInFrames?: number;
  volume?: number;
};

export const SFX: React.FC<SFXProps> = ({
  src,
  startFrame,
  durationInFrames = 45,
  volume = 0.6,
}) => {
  return (
    <Sequence from={startFrame} durationInFrames={durationInFrames} layout="none">
      <Audio src={staticFile(`sfx/${src}`)} volume={volume} />
    </Sequence>
  );
};
