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

## Workflow Commands

### `/idea`
Generate video ideas from trending dev topics. Output 5–10 ideas with:
- Working title
- Target persona
- Hook angle (1 sentence)
- Why it works (1 sentence)
Save to `content/ideas/ideas-[date].md`

### `/transcribe`
Run `scripts/transcribe.py` on a video file to generate a transcript.
```bash
uv run scripts/transcribe.py <path-to-video>
```
Output saved to `content/transcripts/`

### `/captions`
Generate TikTok caption + hashtags from a transcript or script. Output:
- Caption (under 300 chars, punchy, curiosity-driven)
- 5–8 hashtags (mix of broad + niche dev tags)
- Alt caption option

## File Conventions
| Content Type | Directory |
|---|---|
| Video ideas | `content/ideas/` |
| Creative briefs | `content/briefs/` |
| Scripts | `content/scripts/` |
| Transcripts | `content/transcripts/` |

File naming: `[type]-[topic]-[YYYY-MM-DD].md`

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
