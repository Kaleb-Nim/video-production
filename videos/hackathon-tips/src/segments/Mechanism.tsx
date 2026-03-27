import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Series,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { Video } from "@remotion/media";
import { CaptionOverlay, EmojiOverlay, IconPopIn, TextOverlay, SFX } from "../../../../shared/components";

const MECHANISM_1_TRIM = 7;
const MECHANISM_2_TRIM = 11;
const MECHANISM_1_FRAMES = 291;
const MECHANISM_2_FRAMES = 324;

export const Mechanism: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Group chat screenshot appears (shifted -7 for trim: 60→53)
  const screenshotDelay = 53;
  const screenshotProgress = spring({
    frame: frame - screenshotDelay,
    fps,
    config: { damping: 200 },
  });

  const screenshotScale = interpolate(screenshotProgress, [0, 1], [0.8, 1]);
  const screenshotOpacity = screenshotProgress;

  return (
    <AbsoluteFill>
      {/* Two talking head clips back to back, trimmed */}
      <Series>
        <Series.Sequence durationInFrames={MECHANISM_1_FRAMES}>
          <Video
            src={staticFile("hackathon-tips/talking_head/MECHANISM.MOV")}
            trimBefore={MECHANISM_1_TRIM / 30}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={MECHANISM_2_FRAMES}>
          <Video
            src={staticFile("hackathon-tips/talking_head/MECHANISM_2.MOV")}
            trimBefore={MECHANISM_2_TRIM / 30}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Series.Sequence>
      </Series>

      {/* Group chat screenshot overlay */}
      <Sequence from={screenshotDelay} durationInFrames={120} premountFor={30}>
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Dark scrim for contrast */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
              opacity: screenshotOpacity,
            }}
          />
          {/* Screenshot */}
          <Img
            src={staticFile("hackathon-tips/group_chat_screenshot.png")}
            style={{
              width: "88%",
              maxHeight: "70%",
              objectFit: "contain",
              borderRadius: 16,
              boxShadow: "0 12px 60px rgba(0,0,0,0.7)",
              opacity: screenshotOpacity,
              transform: `scale(${screenshotScale})`,
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* === Clip 1 overlays (frames 0-290, trimmed by 7) === */}

      {/* "code" at 4460ms → frame 134 → trimmed 134-7=127 */}
      <EmojiOverlay emoji="❌" startFrame={127} durationInFrames={15} size={200} />
      <SFX src="buzzer-wrong.mp3" startFrame={127} durationInFrames={30} />

      {/* "pitch"/"slides"/"script" → IconPopIn (202-7=195) */}
      <IconPopIn
        icons={[
          { content: "🎤", label: "Pitch", delayFrames: 0 },
          { content: "📊", label: "Slides", delayFrames: 21 },
          { content: "📝", label: "Script", delayFrames: 47 },
        ]}
        startFrame={195}
        durationInFrames={60}
      />
      <SFX src="pop-ding.mp3" startFrame={195} durationInFrames={20} volume={0.5} />
      <SFX src="pop-ding.mp3" startFrame={216} durationInFrames={20} volume={0.5} />
      <SFX src="pop-ding.mp3" startFrame={242} durationInFrames={20} volume={0.5} />

      {/* === Clip 2 overlays (starts at global frame 291, trimmed by 11) === */}

      {/* "one core feature" at 5040ms → local frame 151 → trimmed 151-11=140 → global 291+140=431 */}
      <Sequence from={MECHANISM_1_FRAMES} durationInFrames={MECHANISM_2_FRAMES}>
        <Sequence from={140} durationInFrames={30}>
          <TextOverlay
            text="1"
            position="center"
            style={{ fontSize: 300, fontWeight: 900, textAlign: "center" }}
          />
        </Sequence>
      </Sequence>
      <SFX src="bass-boom.mp3" startFrame={431} durationInFrames={30} />

      {/* Captions for first clip */}
      <Sequence from={0} durationInFrames={MECHANISM_1_FRAMES}>
        <CaptionOverlay captionFile="hackathon-tips/captions/MECHANISM.json" timeOffsetMs={233} />
      </Sequence>

      {/* Captions for second clip */}
      <Sequence from={MECHANISM_1_FRAMES} durationInFrames={MECHANISM_2_FRAMES}>
        <CaptionOverlay captionFile="hackathon-tips/captions/MECHANISM_2.json" timeOffsetMs={367} />
      </Sequence>
    </AbsoluteFill>
  );
};
