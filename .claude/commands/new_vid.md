Scaffold a new video project directory.

Arguments: $ARGUMENTS
Format: `full <slug>` or `broll <slug>`
- `full` — full talking-head video with segments pipeline
- `broll` — short animation/b-roll clip (no segments, no content pipeline)

Slug should be kebab-case, e.g. `cursor-vs-claude`, `git-tips-2026`.

---

## Instructions

Parse $ARGUMENTS: first word is the type (`full` or `broll`), second word is the slug.

Convert slug to a PascalCase component name: e.g. `cursor-vs-claude` → `CursorVsClaude`.

Get today's date in `YYYY-MM-DD` format.

---

## Both modes: always do these steps

### 1. Create directories

**Full mode:**
```
videos/[slug]/src/segments/
videos/[slug]/content/assets/talking_head/
videos/[slug]/content/scripts/
videos/[slug]/content/transcripts/
videos/[slug]/content/ideas/
videos/[slug]/content/briefs/
public/[slug]/captions/
```
Then create symlink: `ln -s ../../../videos/[slug]/content/assets/talking_head public/[slug]/talking_head`

**B-roll mode:**
```
videos/[slug]/src/
public/[slug]/
```

Use the Bash tool to run `mkdir -p` for all directories, then `ln -s` for the symlink.

### 2. Create the composition file

**Full mode** — `videos/[slug]/src/[ComponentName].tsx`:
```tsx
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
export const [ComponentName]: React.FC = () => {
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
```

**B-roll mode** — `videos/[slug]/src/[ComponentName].tsx`:
```tsx
import { AbsoluteFill } from "remotion";

// TODO: Build out this b-roll composition
export const [ComponentName]: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Add animations here */}
    </AbsoluteFill>
  );
};
```

### 3. Create segment template files (full mode only)

Create `videos/[slug]/src/segments/` files for Hook, Problem, Mechanism, Proof, Result, Recap, CTA.

Each file follows this template (substitute the correct segment name and video filename):
```tsx
import React from "react";
import { SegmentBase, CaptionOverlay, SFX } from "../../../../shared/components";
// Add more imports as needed: EmojiOverlay, TextOverlay, GlitchOverlay, IconPopIn, ImageFlash

export const Hook: React.FC = () => {
  return (
    <SegmentBase videoSrc="[slug]/talking_head/HOOK.MOV" startFrom={0}>
      {/* TODO: Add overlays and SFX after filming */}
      <CaptionOverlay captionFile="[slug]/captions/HOOK.json" timeOffsetMs={0} />
    </SegmentBase>
  );
};
```

Video file naming: `HOOK.MOV`, `PROBLEM.MOV`, `MECHANISM.MOV`, `PROOF.MOV`, `RESULT.MOV`, `RECAP.MOV`, `CTA.MOV`

### 4. Create script file (full mode only)

Create `videos/[slug]/content/scripts/script-[slug]-[date].md` from the template at `templates/script-template.md`. Pre-fill the title from the slug (kebab-case → Title Case).

### 5. Auto-register in src/Root.tsx

Read `src/Root.tsx`. If it has a single `<Composition>` with no fragment wrapper, wrap in `<>...</>` and add a React import. Then add the new composition:

```tsx
import { [ComponentName] } from "../videos/[slug]/src/[ComponentName]";
// ...
<Composition
  id="[ComponentName]"
  component={[ComponentName]}
  durationInFrames={2500}   // full mode; use 90 for broll
  fps={30}
  width={1080}
  height={1920}
/>
```

### 6. Update Apple Notes

Find or create a note called "Video Production" in Apple Notes and add an entry:

```
## [slug] ([date])
Type: [full/broll]
Status: 🟡 In Progress
Created: [date]
```
