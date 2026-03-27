import { Series } from "remotion";
import { Hook } from "./segments/Hook";
import { Problem } from "./segments/Problem";
import { Mechanism } from "./segments/Mechanism";
import { Proof } from "./segments/Proof";
import { Result } from "./segments/Result";
import { Recap } from "./segments/Recap";
import { CTA } from "./segments/CTA";

// Segment durations (in frames at 30fps) — trimmed to speech boundaries
// Leading/trailing silence removed via startFrom + reduced durations
// Total: 140+374+615+434+374+194+300 = 2431 frames (~81s)

export const HackathonTips: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={140}>
        <Hook />
      </Series.Sequence>

      <Series.Sequence durationInFrames={374}>
        <Problem />
      </Series.Sequence>

      <Series.Sequence durationInFrames={615}>
        <Mechanism />
      </Series.Sequence>

      <Series.Sequence durationInFrames={434}>
        <Proof />
      </Series.Sequence>

      <Series.Sequence durationInFrames={374}>
        <Result />
      </Series.Sequence>

      <Series.Sequence durationInFrames={194}>
        <Recap />
      </Series.Sequence>

      <Series.Sequence durationInFrames={300}>
        <CTA />
      </Series.Sequence>
    </Series>
  );
};
