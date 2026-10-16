import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
const root = path.resolve("out");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let file = path.resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    try {
      if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    } catch {}
    const type = types[path.extname(file)] || "application/octet-stream";
    // Real byte ranges support seeking without buffering whole recordings in memory.
    if (type.startsWith("video/")) {
      const { size } = await stat(file);
      let start = 0,
        end = size - 1;
      const range = req.headers.range;
      if (range) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(range);
        if (!match || (!match[1] && !match[2])) {
          res.writeHead(416, { "Content-Range": `bytes */${size}` });
          res.end();
          return;
        }
        start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
        end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
        if (start > end || start >= size) {
          res.writeHead(416, { "Content-Range": `bytes */${size}` });
          res.end();
          return;
        }
      }
      res.writeHead(range ? 206 : 200, {
        "Content-Type": type,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Cache-Control": "no-cache",
        ...(range ? { "Content-Range": `bytes ${start}-${end}/${size}` } : {}),
      });
      if (req.method === "HEAD") res.end();
      else {
        const stream = createReadStream(file, { start, end });
        stream.pipe(res);
        res.on("close", () => stream.destroy());
      }
      return;
    }
    const data = await readFile(file);
    const compress =
      /text|json|xml|svg/.test(type) && /\bgzip\b/.test(req.headers["accept-encoding"] || "");
    res.writeHead(200, {
      "Content-Type": type,
      "Cache-Control": "no-cache",
      Vary: "Accept-Encoding",
      ...(compress ? { "Content-Encoding": "gzip" } : {}),
    });
    res.end(compress ? gzipSync(data) : data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(await readFile(path.join(root, "404.html")));
  }
}).listen(port, "127.0.0.1", () => console.log(`Local: http://127.0.0.1:${port}`));
