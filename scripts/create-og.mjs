import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
const logo = await readFile("public/icon.svg");
for (const l of ["ar", "en"]) {
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#f8f9fb"/><path d="M70 100H1130M70 535H1130" stroke="#d5dfed"/><text x="70" y="70" font-family="Segoe UI,Arial" font-size="18" font-weight="600" fill="#202a38">ANAS CODEX®</text><text x="70" y="245" font-family="Segoe UI,Arial" font-size="77" font-weight="500" fill="#202a38">ANAS NASER.</text><text x="70" y="330" font-family="Segoe UI,Arial" font-size="54" fill="#406db5">Code, with character.</text><text x="70" y="422" font-family="Segoe UI,Arial" font-size="23" fill="#69788d">${l === "ar" ? "مطوّر أول للمواقع والمتاجر الإلكترونية" : "Senior Web &amp; E-Commerce Developer"}</text><text x="70" y="575" font-family="Segoe UI,Arial" font-size="16" fill="#69788d">RIYADH, SAUDI ARABIA / NEXT.JS · REACT · WORDPRESS · SALLA</text></svg>`;
  const symbol = await sharp(logo).resize(210, 245).png().toBuffer();
  await sharp(Buffer.from(svg))
    .composite([{ input: symbol, top: 165, left: 910 }])
    .png()
    .toFile(`public/og-${l}.png`);
}
console.log("Created local social sharing images.");
const png = await sharp(logo)
  .resize(64, 64, { fit: "contain", background: "#f8f9fb" })
  .png()
  .toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 64;
header[7] = 64;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("public/favicon.ico", Buffer.concat([header, png]));
