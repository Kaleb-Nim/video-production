import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

// ─── Timeline (frames @ 30fps) ───────────────────────────────────────────────
const T = {
  WINDOW_IN:       [0,   12],
  TYPING_START:    14,
  TYPING_END:      46,
  CURSOR_BLINK_TO: 58,
  FLASH:           [58,  68],
  AUTH_LINE:       70,
  PROGRESS_START:  82,
  PROGRESS_END:    112,
  SUCCESS:         116,
  GLOW_START:      124,
};

const COMMAND = "claude";

const ACCENT  = "#4ADE80";
const DIM     = "#6B7280";
const BLUE    = "#93C5FD";
const BG      = "#0D0D10";

export const ClaudeCodeLogin: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Window entrance
  const winOpacity = interpolate(frame, T.WINDOW_IN, [0, 1], { extrapolateRight: "clamp" });
  const winY = interpolate(frame, T.WINDOW_IN, [40, 0], { extrapolateRight: "clamp" });

  // Typing
  const charsVisible = Math.floor(
    interpolate(frame, [T.TYPING_START, T.TYPING_END], [0, COMMAND.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Cursor blink (8-frame cycle, disappears after enter)
  const cursorOn =
    frame >= T.TYPING_START &&
    frame < T.CURSOR_BLINK_TO &&
    Math.floor(frame / 8) % 2 === 0;

  // Enter flash
  const [FLASH_START, FLASH_END] = T.FLASH as [number, number];
  const flashOpacity =
    frame >= FLASH_START && frame <= FLASH_END
      ? Math.sin(((frame - FLASH_START) / (FLASH_END - FLASH_START)) * Math.PI)
      : 0;

  // Auth text
  const authOpacity = interpolate(frame, [T.AUTH_LINE, T.AUTH_LINE + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Progress bar
  const progressPct = interpolate(
    frame,
    [T.PROGRESS_START, T.PROGRESS_END],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Success card
  const successOpacity = interpolate(frame, [T.SUCCESS, T.SUCCESS + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const successScale = spring({
    frame: frame - T.SUCCESS,
    fps,
    config: { damping: 14, stiffness: 220 },
  });

  // Border glow after success
  const glow = interpolate(frame, [T.GLOW_START, T.GLOW_START + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const borderGlow = glow > 0
    ? `0 0 ${Math.round(50 * glow)}px rgba(74,222,128,${(0.35 * glow).toFixed(2)}), 0 0 ${Math.round(120 * glow)}px rgba(74,222,128,${(0.12 * glow).toFixed(2)})`
    : "none";

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 120% 80% at 50% 60%, #0a0f12 0%, #080810 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace',
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(74,222,128,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Enter flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(74,222,128,0.12)`,
          opacity: flashOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Terminal window */}
      <div
        style={{
          opacity: winOpacity,
          transform: `translateY(${winY}px)`,
          width: 900,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: `0 48px 96px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.07), ${borderGlow}`,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: "#1A1A1E",
            padding: "16px 22px",
            display: "flex",
            alignItems: "center",
            gap: 9,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {(["#FF5F57", "#FEBC2E", "#28C840"] as const).map((c) => (
            <div
              key={c}
              style={{ width: 13, height: 13, borderRadius: "50%", background: c }}
            />
          ))}
          <span
            style={{
              flex: 1,
              textAlign: "center",
              color: "#4B5563",
              fontSize: 24,
              letterSpacing: "0.5px",
            }}
          >
            zsh — 80×24
          </span>
        </div>

        {/* Body */}
        <div
          style={{
            background: BG,
            padding: "40px 44px 52px",
            minHeight: 400,
          }}
        >
          {/* Prompt line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 42,
              lineHeight: 1.3,
              marginBottom: 32,
            }}
          >
            <span style={{ color: ACCENT, marginRight: 12 }}>➜</span>
            <span style={{ color: BLUE, marginRight: 18 }}>~</span>
            <span style={{ color: "#E5E7EB" }}>{COMMAND.slice(0, charsVisible)}</span>
            {cursorOn && (
              <span
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 46,
                  background: ACCENT,
                  marginLeft: 3,
                  borderRadius: 3,
                  opacity: 0.9,
                }}
              />
            )}
          </div>

          {/* Auth output */}
          {frame >= T.AUTH_LINE && (
            <div style={{ opacity: authOpacity }}>
              <div style={{ color: DIM, fontSize: 30, marginBottom: 10, letterSpacing: "0.2px" }}>
                🔐 Authenticating with Anthropic...
              </div>
              <div style={{ color: "#374151", fontSize: 26, marginBottom: 30 }}>
                Opening browser for OAuth login
              </div>

              {/* Progress bar */}
              {frame >= T.PROGRESS_START && (
                <div style={{ marginBottom: 32 }}>
                  <div
                    style={{
                      height: 7,
                      background: "rgba(255,255,255,0.07)",
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progressPct}%`,
                        background: `linear-gradient(90deg, ${ACCENT}, #86EFAC)`,
                        borderRadius: 999,
                        boxShadow: `0 0 14px rgba(74,222,128,0.55)`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Success card */}
          {frame >= T.SUCCESS && (
            <div
              style={{
                opacity: successOpacity,
                transform: `scale(${successScale})`,
                transformOrigin: "left center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  background: "rgba(74,222,128,0.07)",
                  border: `1px solid rgba(74,222,128,${(0.25 + 0.2 * glow).toFixed(2)})`,
                  borderRadius: 14,
                  padding: "22px 30px",
                  boxShadow: glow > 0
                    ? `inset 0 0 ${Math.round(40 * glow)}px rgba(74,222,128,${(0.05 * glow).toFixed(2)})`
                    : "none",
                }}
              >
                <span
                  style={{
                    fontSize: 50,
                    color: ACCENT,
                    fontWeight: 700,
                    lineHeight: 1,
                    filter: `drop-shadow(0 0 8px rgba(74,222,128,0.7))`,
                  }}
                >
                  ✓
                </span>
                <div>
                  <div
                    style={{
                      color: ACCENT,
                      fontSize: 38,
                      fontWeight: 600,
                      marginBottom: 6,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Logged in successfully
                  </div>
                  <div style={{ color: DIM, fontSize: 27, letterSpacing: "0.3px" }}>
                    claude-sonnet-4-6 · API ready
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
