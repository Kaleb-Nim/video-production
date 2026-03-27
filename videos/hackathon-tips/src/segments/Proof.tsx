import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { SegmentBase, ImageFlash, CaptionOverlay, SFX } from "../../../../shared/components";

export const Proof: React.FC = () => {
  return (
    <SegmentBase videoSrc="hackathon-tips/talking_head/PROOF.MOV" startFrom={7}>
      {/* Quick screenshot flashes (shifted -7 for trim) */}
      <AbsoluteFill>
        <ImageFlash
          src="hackathon-tips/screenshot_terminal.png"
          startFrame={53}
          durationInFrames={45}
        />
        <ImageFlash
          src="hackathon-tips/screenshot_code.png"
          startFrame={128}
          durationInFrames={45}
        />
        <ImageFlash
          src="hackathon-tips/screenshot_deploy.png"
          startFrame={203}
          durationInFrames={45}
        />
      </AbsoluteFill>

      {/* SFX aligned to visuals (shifted -7) */}
      <SFX src="mechanical-click.mp3" startFrame={53} durationInFrames={30} />
      <SFX src="digital-blip.mp3" startFrame={128} durationInFrames={30} />
      <SFX src="ai-whoosh.mp3" startFrame={203} durationInFrames={30} />
      <SFX src="success-ding.mp3" startFrame={263} durationInFrames={30} />

      {/* Vercel deployment PiP overlay (270-7=263) */}
      <Sequence from={263} durationInFrames={150} premountFor={30}>
        <div
          style={{
            position: "absolute",
            bottom: 160,
            right: 40,
            width: 400,
            height: 320,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            border: "3px solid rgba(255,255,255,0.3)",
          }}
        >
          <Video
            src={staticFile("hackathon-tips/vercel_deployment_web.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </Sequence>

      <CaptionOverlay captionFile="hackathon-tips/captions/PROOF.json" timeOffsetMs={233} />
    </SegmentBase>
  );
};
