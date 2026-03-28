import React from "react";
import { AbsoluteFill } from "remotion";

export const Hook: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0D0D10", alignItems: "center", justifyContent: "center" }}>
      {/* TODO: Replace with SegmentBase + CaptionOverlay after filming */}
      {/* <SegmentBase videoSrc="what-is-claude-code/talking_head/HOOK.MOV" startFrom={0}> */}
      {/* <CaptionOverlay captionFile="what-is-claude-code/captions/HOOK.json" timeOffsetMs={0} /> */}
    </AbsoluteFill>
  );
};
