# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "mlx-whisper",
# ]
# ///
"""Transcribe a video file using MLX Whisper.

Usage:
    uv run scripts/transcribe.py <video_path>
"""

import sys
import subprocess
import tempfile
from pathlib import Path
from datetime import date

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


def transcribe(audio_path: Path) -> str:
    """Transcribe audio file using MLX Whisper."""
    result = mlx_whisper.transcribe(
        str(audio_path),
        path_or_hf_repo="mlx-community/whisper-large-v3-turbo",
    )
    return result["text"]


def main() -> None:
    if len(sys.argv) != 2:
        print("Usage: uv run scripts/transcribe.py <video_path>")
        sys.exit(1)

    video_path = Path(sys.argv[1]).resolve()
    if not video_path.exists():
        print(f"Error: {video_path} not found")
        sys.exit(1)

    # Output path
    output_dir = Path(__file__).resolve().parent.parent / "content" / "transcripts"
    output_dir.mkdir(parents=True, exist_ok=True)
    stem = video_path.stem
    today = date.today().isoformat()
    output_path = output_dir / f"{stem}-{today}.txt"

    # Extract audio to temp file, transcribe, clean up
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=True) as tmp:
        tmp_path = Path(tmp.name)
        print(f"Extracting audio from {video_path.name}...")
        extract_audio(video_path, tmp_path)

        print("Transcribing with MLX Whisper...")
        text = transcribe(tmp_path)

    # Save transcript
    output_path.write_text(text.strip() + "\n")
    print(f"Transcript saved to {output_path}")


if __name__ == "__main__":
    main()
