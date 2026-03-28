import React from "react";
import { Composition } from "remotion";
import { HackathonTips } from "../videos/hackathon-tips/src/HackathonTips";
import { ClaudeCodeLogin } from "../videos/claude-code-login/src/ClaudeCodeLogin";
import { ChatgptCopyPasteLoop } from "../videos/chatgpt-copy-paste-loop/src/ChatgptCopyPasteLoop";
import { CopilotAutocomplete } from "../videos/copilot-autocomplete/src/CopilotAutocomplete";
import { ClaudeCodeTerminalDemo } from "../videos/claude-code-terminal-demo/src/ClaudeCodeTerminalDemo";
import { BeforeAfterClock } from "../videos/before-after-clock/src/BeforeAfterClock";
import { ClaudeVsClaudecodeLabel } from "../videos/claude-vs-claudecode-label/src/ClaudeVsClaudecodeLabel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HackathonTips"
        component={HackathonTips}
        durationInFrames={2431}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ClaudeCodeLogin"
        component={ClaudeCodeLogin}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* what-is-claude-code broll clips */}
      <Composition
        id="ChatgptCopyPasteLoop"
        component={ChatgptCopyPasteLoop}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CopilotAutocomplete"
        component={CopilotAutocomplete}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ClaudeCodeTerminalDemo"
        component={ClaudeCodeTerminalDemo}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BeforeAfterClock"
        component={BeforeAfterClock}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ClaudeVsClaudecodeLabel"
        component={ClaudeVsClaudecodeLabel}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
