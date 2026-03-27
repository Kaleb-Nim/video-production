# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "mlx-whisper",
# ]
# ///
"""Transcribe a video file to Remotion Caption JSON with word-level timestamps.

Usage:
    uv run scripts/transcribe-captions.py <video_path>

Output saved to remotion_build/public/captions/<CLIP_NAME>.json
"""

import json
import subprocess
import sys
import tempfile
from pathlib import Path

import mlx_whisper


def extract_audio(video_path: Path, audio_path: Path) -> None:
    """Extract 16kHz mono WAV audio from video using ffmpeg."""
    cmd = [
        "ffmpeg", "-i", str(video_path),
        "-vn", "-acodec", "pcm_s16le",
        "-ar", "16000", "-ac", "1",
        "-y", str(audio_path),
    ]
    subprocess.run(cmd, check=True, capture_output=True)


def transcribe_words(audio_path: Path) -> list[dict]:
    """Transcribe audio and return word-level Caption objects."""
    result = mlx_whisper.transcribe(
        str(audio_path),
        path_or_hf_repo="mlx-community/whisper-large-v3-turbo",
        word_timestamps=True,
    )

    captions = []
    for segment in result.get("segments", []):
        for word_info in segment.get("words", []):
            start_ms = int(word_info["start"] * 1000)
            end_ms = int(word_info["end"] * 1000)
            timestamp_ms = (start_ms + end_ms) // 2
            confidence = word_info.get("probability", 0.9)

            captions.append({
                "text": word_info["word"],
                "startMs": start_ms,
                "endMs": end_ms,
                "timestampMs": timestamp_ms,
                "confidence": round(confidence, 4),
            })

    return captions


def main() -> None:
    if len(sys.argv) != 2:
        print("Usage: uv run scripts/transcribe-captions.py <video_path>")
        sys.exit(1)

    video_path = Path(sys.argv[1]).resolve()
    if not video_path.exists():
        print(f"Error: {video_path} not found")
        sys.exit(1)

    # Output path
    output_dir = Path(__file__).resolve().parent.parent / "remotion_build" / "public" / "captions"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{video_path.stem}.json"

    # Extract audio to temp file, transcribe, clean up
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=True) as tmp:
        tmp_path = Path(tmp.name)
        print(f"Extracting audio from {video_path.name}...")
        extract_audio(video_path, tmp_path)

        print("Transcribing with word-level timestamps...")
        captions = transcribe_words(tmp_path)

    # Save captions JSON
    output_path.write_text(json.dumps(captions, indent=2) + "\n")
    print(f"Caption JSON saved to {output_path} ({len(captions)} words)")


if __name__ == "__main__":
    main()
