// Local audit only: originals remain untouched. Requires FFMPEG_PATH and FFPROBE_PATH.
import { execFileSync } from "node:child_process";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
const ffmpeg =
  process.env.FFMPEG_PATH ||
  path.resolve(".audit/media-tools/node_modules/ffmpeg-static/ffmpeg.exe");
const ffprobe =
  process.env.FFPROBE_PATH ||
  path.resolve(".audit/media-tools/node_modules/ffprobe-static/bin/win32/x64/ffprobe.exe");
await mkdir("qa/polish/video-audit", { recursive: true });
const inventory = [];
for (const [i, file] of (await readdir("input/project-videos")).entries()) {
  const source = path.resolve("input/project-videos", file);
  const info = JSON.parse(
    execFileSync(ffprobe, ["-v", "quiet", "-show_format", "-show_streams", "-of", "json", source]),
  );
  const stream = info.streams.find((s) => s.codec_type === "video");
  const duration = Number(info.format.duration);
  inventory.push({
    file,
    format: info.format.format_name,
    bytes: Number(info.format.size),
    duration,
    width: stream.width,
    height: stream.height,
    codec: stream.codec_name,
    audio: info.streams.filter((s) => s.codec_type === "audio").map((s) => s.codec_name),
  });
  const frames = [];
  for (const [j, t] of [
    0.5,
    duration * 0.25,
    duration * 0.5,
    duration * 0.75,
    duration - 1,
  ].entries()) {
    const target = `qa/polish/video-audit/${i}-${j}.png`;
    execFileSync(ffmpeg, [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-ss",
      String(t),
      "-i",
      source,
      "-frames:v",
      "1",
      "-vf",
      "scale=640:-1",
      target,
    ]);
    frames.push({ input: target, left: (j % 2) * 640, top: Math.floor(j / 2) * 400 });
  }
  await sharp({ create: { width: 1280, height: 1200, channels: 3, background: "#16181c" } })
    .composite(frames)
    .png()
    .toFile(`qa/polish/video-audit/contact-${i}.png`);
}
await writeFile("qa/polish/video-inventory.json", JSON.stringify(inventory, null, 2));
console.log(JSON.stringify(inventory, null, 2));
