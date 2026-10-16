// Reproducible web derivatives; never modify or delete input/project-videos.
import { execFileSync } from "node:child_process";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
const ffmpeg =
  process.env.FFMPEG_PATH ||
  path.resolve(".audit/media-tools/node_modules/ffmpeg-static/ffmpeg.exe");
const ffprobe =
  process.env.FFPROBE_PATH ||
  path.resolve(".audit/media-tools/node_modules/ffprobe-static/bin/win32/x64/ffprobe.exe");
const mappings = [
  ["2026-10-15 18-03-19.mp4", "gaming-experience", 160, 1440, 2],
  ["2026-10-15 18-09-48.mp4", "portfolio-react", 196, 1360, 2],
  ["2026-10-15 18-16-50.mp4", "island-portfolio", 196, 1360, 4],
  ["Bawsala.mp4", "bawsala", 196, 1360, 1],
  ["httpskripton.sa.mp4", "kripton", 160, 1440, 1],
  ["rooh.sa.mp4", "brand-awards", 196, 1360, 1],
];
await mkdir("public/videos", { recursive: true });
await mkdir("qa/polish", { recursive: true });
const projects = JSON.parse(await readFile("src/data/projects.json", "utf8"));
const audit = [];
for (const [file, slug, top, height, posterTime] of mappings) {
  const source = path.resolve("input/project-videos", file);
  const output = `public/videos/${slug}.mp4`;
  const crop = `crop=2540:${height}:0:${top}`;
  execFileSync(
    ffmpeg,
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-i",
      source,
      "-an",
      "-map_metadata",
      "-1",
      "-vf",
      `${crop},scale=1280:-2,setsar=1,fps=30`,
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "26",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      output,
    ],
    { stdio: "inherit" },
  );
  const info = JSON.parse(
    execFileSync(ffprobe, ["-v", "quiet", "-show_format", "-show_streams", "-of", "json", output]),
  );
  const frame = execFileSync(
    ffmpeg,
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-ss",
      String(posterTime),
      "-i",
      output,
      "-frames:v",
      "1",
      "-f",
      "image2pipe",
      "-vcodec",
      "png",
      "-",
    ],
    { maxBuffer: 8 * 1024 * 1024 },
  );
  await sharp(frame).webp({ quality: 85 }).toFile(`public/videos/${slug}-poster.webp`);
  const video = {
    src: `/videos/${slug}.mp4`,
    poster: `/videos/${slug}-poster.webp`,
    width: info.streams[0].width,
    height: info.streams[0].height,
    duration: Number(info.format.duration),
  };
  if (slug === "kripton") {
    execFileSync(
      ffmpeg,
      [
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-i",
        source,
        "-t",
        "12",
        "-an",
        "-map_metadata",
        "-1",
        "-vf",
        `${crop},scale=960:-2,setsar=1,fps=24`,
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "27",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        `public/videos/${slug}-preview.mp4`,
      ],
      { stdio: "inherit" },
    );
    video.previewSrc = `/videos/${slug}-preview.mp4`;
  }
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  project.videos = [video];
  audit.push({
    file,
    slug,
    evidence: "Visual match to project captures and the recorded site branding/URL",
    originalBytes: (await stat(source)).size,
    webBytes: (await stat(output)).size,
    ...video,
  });
  console.log(`Prepared ${slug}: ${info.format.size} bytes`);
}
await writeFile("src/data/projects.json", JSON.stringify(projects, null, 2) + "\n");
audit.push({
  file: "majal1.com.mp4",
  status: "Identified as Majal Al Tamayuz; not published",
  reason:
    "No existing project record. Role and publication eligibility remain unverified in input/references/links.md.",
});
await writeFile("qa/polish/video-mapping.json", JSON.stringify(audit, null, 2) + "\n");
