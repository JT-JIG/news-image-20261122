// news-image-20261122 — entry runner.
//
// This program places the day's news image where the grader looks. It takes
// entry.png from the same folder as this file, checks that it really is a
// PNG or JPEG no bigger than 1 MiB, then copies it to /output/entry.png
// (or $MAKEFUN_OUTPUT_DIR/entry.png when that variable is set). The copy is
// byte-for-byte, so running it twice always writes the same bytes.

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576;
const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG_MAGIC = [0xff, 0xd8, 0xff];

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

function startsWith(bytes: Buffer, magic: number[]): boolean {
  return magic.every((b, i) => bytes[i] === b);
}

const data = readFileSync(source);
const size = statSync(source).size;

if (size > MAX_BYTES) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB limit`);
}
if (!startsWith(data, PNG_MAGIC) && !startsWith(data, JPEG_MAGIC)) {
  throw new Error("entry.png is neither a PNG nor a JPEG");
}
if (startsWith(data, PNG_MAGIC)) {
  // PNG header: width and height sit at bytes 16-23 of the IHDR chunk.
  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);
  if (width > 1024 || height > 1024) {
    throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 limit`);
  }
  console.log(`PNG ${width}x${height}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Read back what was written and confirm it matches the source exactly,
// so a partial or corrupted write is caught here, not by the grader.
const written = readFileSync(target);
if (!written.equals(data)) {
  throw new Error("written entry.png does not match the source bytes");
}
console.log(`wrote ${target} (${size} bytes, verified)`);
