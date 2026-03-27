import React from "react";
import { Sequence } from "remotion";
import { SegmentBase, CaptionOverlay, EmojiOverlay, GlitchOverlay, TextOverlay, SFX } from "../../../../shared/components";

export const Problem: React.FC = () => {
  return (
    <SegmentBase videoSrc="hackathon-tips/talking_head/PROBLEM.MOV" startFrom={14}>
      {/* "Frankenstein" at 7860ms → frame 236 → trimmed 236-14=222 */}
      <GlitchOverlay startFrame={222} durationInFrames={25} intensity="heavy" />
      <SFX src="glitch-buzz.mp3" startFrame={222} durationInFrames={30} />

      {/* "5 half-finished" at 9200ms → frame 276 → trimmed 276-14=262 */}
      <Sequence from={262} durationInFrames={25}>
        <TextOverlay
          text="5 HALF-FINISHED FEATURES"
          position="center"
          style={{ fontSize: 64, fontWeight: 900, textAlign: "center" }}
        />
      </Sequence>
      <SFX src="descending-fail.mp3" startFrame={262} durationInFrames={30} />

      {/* "judges" at 12340ms → frame 370 → trimmed 370-14=356 */}
      <EmojiOverlay emoji="⚖️" startFrame={356} durationInFrames={15} size={200} />
      <SFX src="gavel-slam.mp3" startFrame={356} durationInFrames={30} />

      <CaptionOverlay captionFile="hackathon-tips/captions/PROBLEM.json" timeOffsetMs={467} />
    </SegmentBase>
  );
};
