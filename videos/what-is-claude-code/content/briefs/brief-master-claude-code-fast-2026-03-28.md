# Creative Brief: Master Claude Code Fast
**Date:** 2026-03-28
**Brand:** Personal / Creator
**Prepared by:** Claude Code

---

## Campaign Objective
Drive first-time awareness and installs of Claude Code among beginner/intermediate developers who are still on old AI workflows — showing the concrete difference between Claude (the chatbot) and Claude Code (the agent) in under 90 seconds.

## Target Audience

**Primary persona:** The Beginner/Intermediate Dev Stuck in Old AI Habits
- Uses ChatGPT or Claude.ai as a smarter Stack Overflow — describes a bug, copies the fix, pastes it in, hopes it works
- Has Copilot or Cursor but only uses it for autocomplete or asking it to fix the highlighted error
- Thinks "AI coding" means prompting inside their editor — doesn't know agentic workflows exist
- Feels like they're using AI but still spending most of their time doing the manual work around it

**Pain points:**
- Copy-pasting between ChatGPT and their editor 10x a day — it breaks, they go back, repeat
- Copilot/Cursor helps with lines, not with whole tasks — still have to drive everything manually
- Feels like AI tools are overhyped because they haven't seen them actually do the work end-to-end

**Desires:**
- An AI that does more than assist — one that actually takes over a task and finishes it
- Stop babysitting their AI tools and just describe what they want
- Feel like they've leveled up their workflow, not just added another plugin

**Where they are now:** Prompted into a chatbot, copy-pasted the output, ran into an error, went back to the chatbot, fixed it, pasted again. Repeat. They think this is what "AI-assisted coding" is.

---

## Key Message
Claude (the chatbot) and Claude Code (the terminal agent) are completely different tools — Claude Code doesn't just answer questions, it reads your whole codebase, writes the code, runs it, fixes the errors, and ships it. You just describe what you want.

## Support Points
- Claude Code runs in the terminal — not a chat window, not an IDE plugin — it has access to your full project
- It reads, edits, and runs files autonomously — you don't manually paste anything
- Can run commands, write tests, commit code, and iterate without you touching the keyboard again
- Free tier available — zero barrier to try it today

---

## Hook Options (Minimum 5)

| # | Hook | Type | Why It Works |
|---|------|------|-------------|
| 1 | **"The difference between Claude and Claude Code is bigger than you think"** | Contrast / curiosity | ✅ SELECTED — Speaks directly to devs who know Claude the chatbot but haven't made the leap to the agent |
| 2 | "You're using AI to code but you're still doing all the work" | Pain / reframe | Calls out the copy-paste loop that every intermediate dev lives in |
| 3 | "Copilot fixes lines. Claude Code ships features." | Contrast | Specific comparison that lands hard for Copilot/Cursor users |
| 4 | "I stopped copy-pasting from ChatGPT the day I found this" | Result-first / personal | Feels like a discovery story, not an ad — low threat, high curiosity |
| 5 | "What if your AI could just... finish the task?" | Curiosity | Simple question that reframes everything — highlights the gap in their current tools |
| 6 | "This is what AI-assisted coding actually looks like — not what you've been doing" | Controversy / reframe | Pattern interrupt for anyone who thinks they already use AI for coding |

---

## Creative Concepts (Minimum 3)

### Concept 1: The Comparison — "Claude vs Claude Code"
**Format:** Talking head with split screen / b-roll cuts
**Angle:** Directly address the confusion between Claude (chatbot) and Claude Code (agent). Most devs don't know they're different products.
**Structure:** Hook → "Here's what Claude the chatbot does" (quick demo of chatting) → "Here's what Claude Code does" (terminal agent reading repo + writing code) → Side-by-side result → CTA
**Script sketch:**
> "The difference between Claude and Claude Code is bigger than you think. Claude — the chatbot — you paste in a problem, it gives you code back. Cool. But you still have to paste it somewhere, run it, fix it when it breaks, go back... Claude Code is different. It runs in your terminal. It reads your whole codebase. You type what you want, it figures out which files to change, edits them, runs your tests, and fixes errors itself. You're not copy-pasting anything. That's the difference."

---

### Concept 2: Before / After — "The Copy-Paste Loop"
**Format:** Talking head with screen recording b-roll
**Angle:** Show the painful old workflow most devs are stuck in, then show what Claude Code replaces it with.
**Structure:** Recreate the copy-paste ChatGPT loop (relatable pain) → "There's a better way" pivot → Claude Code terminal demo doing the same task autonomously → "That's it" close → CTA
**Script sketch:**
> "My old workflow: open ChatGPT, describe the bug, copy the fix, paste it in, it breaks in a different way, go back, explain the new error, copy again... every dev knows this loop. Claude Code killed it. Open the terminal, type what you need, it reads your files, figures out what to change, makes the edits, runs your tests. I'm not touching anything. That's what AI-assisted coding is supposed to be."

---

### Concept 3: Tool Comparison — "Copilot/Cursor vs Claude Code"
**Format:** Talking head, direct to camera
**Angle:** Speak to devs who use Cursor or Copilot but only for autocomplete or single-line fixes — they're leaving 90% of the value on the table.
**Structure:** Acknowledge Copilot/Cursor are good → Show the ceiling they hit → Claude Code handles the whole task, not just the line → "It's not a replacement for your editor, it's for the stuff your editor can't do" → CTA
**Script sketch:**
> "Copilot and Cursor are great for autocomplete and fixing the line you're on. But what about when you need to refactor a whole module? Add auth to your whole app? Write tests for everything you shipped last week? That's where they stop and you have to start driving again. Claude Code handles those. Give it a task in plain English, it maps your whole project, makes every change it needs to, and runs everything to check it worked. Different tool. Different level."

---

## Visual Direction
- **Aesthetic:** Talking head for all narration. All b-roll, split screen, and demo footage are Remotion-generated clip assets — animated compositions inserted as visual inserts, not real screen recordings.
- **Color palette:** Dark terminal aesthetic (#0D0D10 background, green accent) for all Remotion clips — consistent with `claude-code-login` broll style
- **Text overlays:** Yes — reinforce key contrasts: "CHATBOT" vs "AGENT", "COPY-PASTE" vs "AUTONOMOUS", "ONE FILE" vs "WHOLE CODEBASE"
- **Pacing:** Talking head sets up the pain, fast cuts into Remotion clips during demo, slow down on result

## Remotion Clip Inventory
All b-roll assets are to be built as separate `broll` compositions in this repo. Each maps to a moment in the script.

| Clip slug | Description | Duration | Script moment |
|---|---|---|---|
| `chatgpt-copy-paste-loop` | Animated split screen: ChatGPT tab ↔ editor tab, code being copied/pasted back and forth, error appearing, repeat | 4–6s | Problem section |
| `copilot-autocomplete` | Editor with Copilot suggesting a single line fix — highlights the "one line at a time" ceiling | 3–4s | Problem section |
| `claude-code-terminal-demo` | Terminal running `claude`, it reads files, edits components, runs tests — scrolling output | 6–8s | Solution/Demo section |
| `before-after-clock` | Split screen: left = copy-paste loop timer (~30min), right = Claude Code timer (~2min). Clocks run. | 4–5s | Result/Proof section |
| `claude-vs-claudecode-label` | Side-by-side: left panel "CLAUDE (chatbot)" chat UI, right panel "CLAUDE CODE (agent)" terminal — labels animate in | 3–4s | Hook or transition |

> Already built: `claude-code-login` (login b-roll) — can be reused as a transition clip.

## Copy Guidelines
- **Tone:** Dev-to-dev, slightly conspiratorial — "let me show you what you've been missing"
- **Do:** Name the specific tools they're already using (ChatGPT, Copilot, Cursor) — makes it feel personal, not generic
- **Do:** Show the contrast explicitly — side-by-side or before/after, not just "it's better"
- **Do:** Keep the demo real — actual terminal output, real repo, no fake examples
- **Don't:** Say "game-changer", "revolutionary", or "the future of coding"
- **Don't:** Assume they know what an "agent" is — show it, don't explain the word
- **Don't:** Trash talk Copilot/Cursor — position Claude Code as additive, not competitive

## CTA
**Primary CTA:** Follow + "install link in bio"
**Offer:** Free tier — zero setup cost
**Urgency mechanism:** "The devs shipping faster than you right now are using this"

## Mandatory Inclusions
- Show the actual terminal — not a chat interface
- Name-drop Anthropic for credibility
- Explicitly contrast with at least one tool the audience already uses (ChatGPT, Copilot, or Cursor)

## References & Inspiration
- Tone ref: how a senior dev explains a tool to a junior — direct, no condescension, shows the thing instead of describing it
- Style: real screen recordings, real terminal, no stock footage or AI-generated visuals
