import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { SegmentBase, CaptionOverlay, EmojiOverlay, SFX } from "../../../../shared/components";

const BULLETS = [
  "Pitch first",
  "One feature",
  "Hard-code the demo",
  "Build the real thing last",
];

const STAGGER = 37; // frames between each bullet

export const Recap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SegmentBase videoSrc="hackathon-tips/talking_head/RECAP.MOV" startFrom={8}>
      {/* Dark gradient overlay for text readability */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            background:
              "linear-gradient(transparent, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.85))",
          }}
        />
      </AbsoluteFill>

      {/* Animated bullet points */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            bottom: 200,
            left: 60,
            right: 60,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {BULLETS.map((text, i) => {
            const delay = i * STAGGER;
            const progress = spring({
              frame: frame - delay,
              fps,
              config: { damping: 20, stiffness: 200 },
            });

            const scale = interpolate(progress, [0, 1], [0.7, 1]);
            const translateX = interpolate(progress, [0, 1], [-40, 0]);

            return (
              <div
                key={i}
                style={{
                  opacity: progress,
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  color: "white",
                  fontSize: 52,
                  fontWeight: 700,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  textShadow: "0 2px 16px rgba(0,0,0,0.6)",
                }}
              >
                {i + 1}. {text}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Emoji overlays (shifted -8 for trim, clamped to 0 minimum) */}
      {/* "We won" at 0ms → frame 0 (clamped) */}
      <EmojiOverlay emoji="🏆" startFrame={0} durationInFrames={30} size={160} position="top" />

      {/* "seven hours" at 2780ms → frame 83 → trimmed 83-8=75 */}
      <EmojiOverlay emoji="😴" startFrame={75} durationInFrames={30} size={140} position="top" />

      {/* "24-hour hackathon" at 5060ms → frame 152 → trimmed 152-8=144 */}
      <EmojiOverlay emoji="⏰" startFrame={144} durationInFrames={25} size={160} position="top" />

      {/* SFX — swoosh on each bullet enter */}
      <SFX src="swoosh.mp3" startFrame={0} durationInFrames={20} volume={0.4} />
      <SFX src="swoosh.mp3" startFrame={29} durationInFrames={20} volume={0.4} />
      <SFX src="swoosh.mp3" startFrame={66} durationInFrames={20} volume={0.4} />
      <SFX src="swoosh.mp3" startFrame={103} durationInFrames={20} volume={0.4} />

      {/* SFX — emoji-aligned */}
      <SFX src="crowd-cheer.mp3" startFrame={0} durationInFrames={30} volume={0.5} />
      <SFX src="peaceful-chime.mp3" startFrame={75} durationInFrames={30} volume={0.5} />
      <SFX src="clock-tick.mp3" startFrame={144} durationInFrames={30} volume={0.5} />

      <CaptionOverlay captionFile="hackathon-tips/captions/RECAP.json" timeOffsetMs={267} />
    </SegmentBase>
  );
};
