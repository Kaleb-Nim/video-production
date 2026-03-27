# CLAUDE.md — Video Production Workspace

## Project Context
Tech/coding TikTok content production workspace. This repo houses everything needed to ideate, script, record, transcribe, and publish short-form video content targeting developers and builders.

## Tone & Style
- Casual, direct, dev-oriented. Conversational not corporate.
- Short-form optimized (TikTok 60s–3min)
- Talk like a dev explaining something to a friend, not a brand selling something
- Use "you" language. No marketing speak.

## Personas
Always load `personas.md` when generating any content (ideas, briefs, scripts, hooks, captions). Every piece of content should target at least one persona.

## Skills
- **Brief Generator** — `.claude/skills/brief-generator.md` — Triggers on "write a brief," "brief this," "creative brief"
- **Hook & Script Writer** — `.claude/skills/hook-writer.md` — Triggers on "write hooks for," "ad hooks," "script this"
- **New Video** — `.claude/commands/new_vid.md` — Slash command `/new_vid full <slug>` or `/new_vid broll <slug>`
- **Ship** — `.claude/skills/ship.md` — Triggers on `/ship` — commit + push as Kaleb-Nim, no AI co-author

## Workflow Commands

### `/new_vid`
Scaffold a new video directory. See `.claude/skills/new-vid.md` for full docs.
```
/new_vid full <slug>    — full talking-head video (segments pipeline)
/new_vid broll <slug>   — short animation/b-roll clip
```

### `/ship`
Commit and push all changes to GitHub under your own git identity (no AI co-author).
```
/ship                      — auto-generate commit message from diff
/ship "your message here"  — use a specific commit message
```
See `.claude/skills/ship.md` for full instructions.

### `/idea`
Generate video ideas from trending dev topics. Output 5–10 ideas with:
- Working title
- Target persona
- Hook angle (1 sentence)
- Why it works (1 sentence)
Save to `videos/[slug]/content/ideas/ideas-[date].md`

### `/transcribe`
Run `scripts/transcribe.py` on a video file to generate a transcript.
```bash
uv run scripts/transcribe.py <path-to-video>
```
Output saved to `videos/[slug]/content/transcripts/`

### `/captions`
Run `scripts/transcribe-captions.py` on a clip to generate word-level caption JSON.
```bash
uv run scripts/transcribe-captions.py <path-to-clip>
```
Output saved to `public/[slug]/captions/<CLIP_NAME>.json`

Generate TikTok caption + hashtags from a transcript or script. Output:
- Caption (under 300 chars, punchy, curiosity-driven)
- 5–8 hashtags (mix of broad + niche dev tags)
- Alt caption option

## File Conventions
| Content Type | Directory |
|---|---|
| Video ideas | `videos/[slug]/content/ideas/` |
| Creative briefs | `videos/[slug]/content/briefs/` |
| Scripts | `videos/[slug]/content/scripts/` |
| Transcripts | `videos/[slug]/content/transcripts/` |
| Raw assets (source videos, screenshots) | `videos/[slug]/content/assets/` |
| Caption JSON (Remotion) | `public/[slug]/captions/` |

File naming: `[type]-[topic]-[YYYY-MM-DD].md`

## Project Structure

```
video-production/
├── package.json                # Single Remotion project (bun install from root)
├── tsconfig.json
├── src/
│   ├── index.ts                # Remotion entry — registerRoot
│   └── Root.tsx                # Registers all video compositions
├── shared/
│   └── components/             # Reusable overlay/effect components (all videos share these)
│       ├── SegmentBase.tsx     # Base wrapper: Video + children (accepts startFrom for trimming)
│       ├── CaptionOverlay.tsx  # TikTok-style word-by-word captions (accepts timeOffsetMs)
│       ├── EmojiOverlay.tsx
│       ├── GlitchOverlay.tsx
│       ├── IconPopIn.tsx
│       ├── ImageFlash.tsx
│       ├── TextOverlay.tsx
│       ├── SFX.tsx
│       └── index.ts            # Barrel export for all components
├── public/
│   ├── sfx/                    # Shared SFX library (MP3s)
│   └── [slug]/                 # Per-video public assets
│       ├── talking_head        # Symlink → videos/[slug]/content/assets/talking_head
│       ├── captions/           # Caption JSON files (HOOK.json, PROBLEM.json, etc.)
│       └── *.png/*.mp4/*.JPG   # Screenshots/assets (symlinks to videos/[slug]/content/assets/)
├── videos/
│   └── [slug]/                 # One directory per video
│       ├── src/
│       │   ├── [ComponentName].tsx  # Main composition — Series of segments
│       │   └── segments/            # One file per segment (Hook, Problem, etc.)
│       └── content/                 # Raw source files for this video
│           ├── assets/
│           │   └── talking_head/    # Original MOV recordings
│           ├── scripts/
│           ├── transcripts/
│           ├── ideas/
│           └── briefs/
├── scripts/                    # Python utility scripts (transcription, captions)
├── templates/                  # Script/brief templates
├── .claude/skills/             # Claude skills (brief-generator, hook-writer, new-vid)
├── .agents/                    # Remotion-specific agent skills
└── personas.md                 # Target audience personas — load for all content generation
```

### Asset Pipeline Note
`videos/[slug]/content/assets/` holds raw source files. `public/[slug]/` holds Remotion-accessible assets (symlinks to content/assets or web-optimized copies). Large/high-res videos should be re-encoded to web-friendly formats (smaller resolution, baseline H.264 profile, 30fps) before placing in `public/[slug]/`.

### Running Remotion
```bash
# From project root
bun install           # one-time setup
bunx remotion studio  # open Remotion Studio (all videos visible)
bunx remotion render [CompositionId]  # render a specific video
```

### Segment component imports
Segments import shared components via:
```tsx
import { SegmentBase, CaptionOverlay, EmojiOverlay } from "../../../../shared/components";
```

Asset paths in segments use the video slug prefix:
```tsx
<SegmentBase videoSrc="[slug]/talking_head/HOOK.MOV" />
<CaptionOverlay captionFile="[slug]/captions/HOOK.json" />
```

## Content Rules
1. **Hook in first 1–3 seconds** — Open with a pattern interrupt, bold claim, or relatable pain
2. **One core message per video** — If you can't say it in one sentence, it's two videos
3. **End with CTA** — Follow, comment, try it yourself, link in bio
4. **Show don't tell** — Screen recordings > slides. Live demos > explanations.
5. **Respect the scroll** — Every second must earn the next second

## Environment
- Use `bun` over `npm`, `uv` over `pip`
- Python scripts use `uv run` for execution
- macOS environment (Apple Silicon)

## Skills
- Remotion specific skills can be found in .agents/