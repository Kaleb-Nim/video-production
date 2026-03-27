import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useCurrentFrame,
  continueRender,
  delayRender,
} from "remotion";
import {
  createTikTokStyleCaptions,
  type Caption,
} from "@remotion/captions";

type CaptionOverlayProps = {
  captionFile: string;
  timeOffsetMs?: number;
};

export const CaptionOverlay: React.FC<CaptionOverlayProps> = ({
  captionFile,
  timeOffsetMs = 0,
}) => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const [handle] = useState(() => delayRender());
  const frame = useCurrentFrame();

  useEffect(() => {
    fetch(staticFile(captionFile))
      .then((res) => res.json())
      .then((data: Caption[]) => {
        setCaptions(data);
        continueRender(handle);
      })
      .catch((err) => {
        console.error("Failed to load captions:", err);
        continueRender(handle);
      });
  }, [captionFile, handle]);

  if (!captions || captions.length === 0) return null;

  const { pages } = createTikTokStyleCaptions({
    captions,
    combineTokensWithinMilliseconds: 1200,
  });

  const currentTimeMs = (frame / 30) * 1000 + timeOffsetMs;

  return (
    <AbsoluteFill>
      {pages.map((page, i) => {
        const adjustedStartMs = page.startMs - timeOffsetMs;
        const startFrame = Math.floor((adjustedStartMs / 1000) * 30);
        const durationFrames = Math.ceil((page.durationMs / 1000) * 30);

        return (
          <Sequence key={i} from={startFrame} durationInFrames={durationFrames}>
            <AbsoluteFill
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 260,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 8,
                  maxWidth: "90%",
                  padding: "12px 24px",
                }}
              >
                {page.tokens.map((token, j) => {
                  const isActive =
                    currentTimeMs >= token.fromMs &&
                    currentTimeMs < token.toMs;

                  return (
                    <span
                      key={j}
                      style={{
                        color: isActive ? "#39E508" : "white",
                        fontSize: 70,
                        fontWeight: 800,
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        textShadow:
                          "0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)",
                        whiteSpace: "pre",
                        textTransform: "uppercase",
                        transition: "color 0.05s",
                      }}
                    >
                      {token.text}
                    </span>
                  );
                })}
              </div>
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
