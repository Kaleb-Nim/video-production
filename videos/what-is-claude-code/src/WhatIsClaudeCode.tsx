import React from "react";
import { Series } from "remotion";
import { Hook } from "./segments/Hook";
import { Problem } from "./segments/Problem";
import { Mechanism } from "./segments/Mechanism";
import { Proof } from "./segments/Proof";
import { Result } from "./segments/Result";
import { Recap } from "./segments/Recap";
import { CTA } from "./segments/CTA";

// TODO: Update durationInFrames for each segment after filming
// Total: sum of all segment durations
export const WhatIsClaudeCode: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={150}>
        <Hook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={400}>
        <Problem />
      </Series.Sequence>
      <Series.Sequence durationInFrames={600}>
        <Mechanism />
      </Series.Sequence>
      <Series.Sequence durationInFrames={450}>
        <Proof />
      </Series.Sequence>
      <Series.Sequence durationInFrames={400}>
        <Result />
      </Series.Sequence>
      <Series.Sequence durationInFrames={200}>
        <Recap />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300}>
        <CTA />
      </Series.Sequence>
    </Series>
  );
};
