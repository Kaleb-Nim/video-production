# Skill: /new_vid

Scaffold a new video project directory.

## Usage
```
/new_vid full <slug>    — full talking-head video with segments pipeline
/new_vid broll <slug>   — short animation/b-roll clip (no segments, no content pipeline)
```

Slug should be kebab-case, e.g. `cursor-vs-claude`, `git-tips-2026`.

---

## Instructions

Parse the args: first word is the type (`full` or `broll`), second word is the slug.

Convert slug to a PascalCase component name: e.g. `cursor-vs-claude` → `CursorVsClaude`.

Today's date in `YYYY-MM-DD` format.

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
public/[slug]/talking_head/    ← symlink: ln -s ../../../videos/[slug]/content/assets/talking_head public/[slug]/talking_head
```

**B-roll mode:**
```
videos/[slug]/src/
public/[slug]/
```

Use the Bash tool to run `mkdir -p` for all directories, then `ln -s` for symlinks.

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

Each file follows this template (adjust segment name and videoSrc accordingly):
```tsx
import React from "react";
import { SegmentBase, CaptionOverlay, SFX } from "../../../../shared/components";
// Add more component imports as needed: EmojiOverlay, TextOverlay, GlitchOverlay, IconPopIn, ImageFlash

export const Hook: React.FC = () => {
  return (
    <SegmentBase videoSrc="[slug]/talking_head/HOOK.MOV" startFrom={0}>
      {/* TODO: Add overlays and SFX after filming */}
      <CaptionOverlay captionFile="[slug]/captions/HOOK.json" timeOffsetMs={0} />
    </SegmentBase>
  );
};
```

Video file naming convention: `HOOK.MOV`, `PROBLEM.MOV`, `MECHANISM.MOV`, `PROOF.MOV`, `RESULT.MOV`, `RECAP.MOV`, `CTA.MOV`

### 4. Create script file (full mode only)

Create `videos/[slug]/content/scripts/script-[slug]-[date].md` using the template at `templates/script-template.md`.

Pre-fill the title from the slug (convert kebab-case to title case).

### 5. Auto-register in src/Root.tsx

Read `src/Root.tsx`, then add the new composition.

**Full mode** — add inside the `<>` fragment (or convert single `<Composition>` to a fragment if needed):
```tsx
import { [ComponentName] } from "../videos/[slug]/src/[ComponentName]";
// ...
<Composition
  id="[ComponentName]"
  component={[ComponentName]}
  durationInFrames={2500}
  fps={30}
  width={1080}
  height={1920}
/>
```

**B-roll mode** — same pattern but use 90 as default durationInFrames.

If Root.tsx currently has a single `<Composition>` (no fragment wrapper), wrap everything in `<>...</>` and add React import if missing.

### 6. Update Apple Notes

Find or create the "Video Production" note in Apple Notes. Add an entry:

```
## [slug] ([date])
Type: [full/broll]
Status: 🟡 In Progress
Created: [date]
```

---

## Example: /new_vid full cursor-vs-claude

Creates:
- `videos/cursor-vs-claude/src/CursorVsClaude.tsx`
- `videos/cursor-vs-claude/src/segments/Hook.tsx` ... CTA.tsx
- `videos/cursor-vs-claude/content/scripts/script-cursor-vs-claude-[date].md`
- `videos/cursor-vs-claude/content/assets/talking_head/`
- `public/cursor-vs-claude/captions/`
- `public/cursor-vs-claude/talking_head` → symlink
- Registers `CursorVsClaude` composition in `src/Root.tsx`

## Example: /new_vid broll terminal-typing-effect

Creates:
- `videos/terminal-typing-effect/src/TerminalTypingEffect.tsx`
- `public/terminal-typing-effect/`
- Registers `TerminalTypingEffect` composition in `src/Root.tsx`
