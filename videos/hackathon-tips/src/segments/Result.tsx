import React from "react";
import {
  Sequence,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { SegmentBase, CaptionOverlay, EmojiOverlay, TextOverlay, SFX } from "../../../../shared/components";

export const Result: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Winning shot appears (150-4=146)
  const photoDelay = 146;
  const photoProgress = spring({
    frame: frame - photoDelay,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const photoScale = interpolate(photoProgress, [0, 1], [0.6, 1]);
  const photoOpacity = photoProgress;

  return (
    <SegmentBase videoSrc="hackathon-tips/talking_head/RESULT.MOV" startFrom={4}>
      <Sequence from={photoDelay} premountFor={30}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${photoScale})`,
            opacity: photoOpacity,
          }}
        >
          <Img
            src={staticFile("hackathon-tips/winning_shot.JPG")}
            style={{
              width: 700,
              height: "auto",
              borderRadius: 16,
              boxShadow: "0 12px 60px rgba(0,0,0,0.7)",
              border: "4px solid rgba(255,255,255,0.4)",
            }}
          />
        </div>
      </Sequence>

      {/* "threw them all away" at 5320ms → frame 160 → trimmed 160-4=156 */}
      <EmojiOverlay emoji="🗑️" startFrame={156} durationInFrames={20} size={180} />
      <SFX src="paper-crumple.mp3" startFrame={156} durationInFrames={30} />

      {/* "very creative" at 10680ms → frame 320 → trimmed 320-4=316 */}
      <Sequence from={316} durationInFrames={30}>
        <TextOverlay
          text={`"very creative" ✌️`}
          position="top"
          style={{ fontSize: 56, fontStyle: "italic", textAlign: "center" }}
        />
      </Sequence>
      <SFX src="sparkle.mp3" startFrame={316} durationInFrames={30} />

      <CaptionOverlay captionFile="hackathon-tips/captions/RESULT.json" timeOffsetMs={133} />
    </SegmentBase>
  );
};
