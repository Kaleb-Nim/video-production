import React from "react";
import { SegmentBase, CaptionOverlay, EmojiOverlay, SFX } from "../../../../shared/components";

export const Hook: React.FC = () => {
  return (
    <SegmentBase videoSrc="hackathon-tips/talking_head/HOOK.MOV" startFrom={13}>
      {/* "coding" at 2060ms → frame 62 → trimmed 62-13=49 */}
      <EmojiOverlay emoji="⌨️" startFrame={49} durationInFrames={20} size={180} />
      <SFX src="keyboard-clack.mp3" startFrame={49} durationInFrames={30} />

      {/* "slides" at 4360ms → frame 131 → trimmed 131-13=118 */}
      <EmojiOverlay emoji="📊" startFrame={118} durationInFrames={15} size={200} />
      <SFX src="record-scratch.mp3" startFrame={118} durationInFrames={30} />

      <CaptionOverlay captionFile="hackathon-tips/captions/HOOK.json" timeOffsetMs={433} />
    </SegmentBase>
  );
};
