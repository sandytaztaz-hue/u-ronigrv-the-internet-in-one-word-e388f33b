import fs from "node:fs";
import path from "node:path";

// The Internet in one word: the place you enter for one thing and
// emerge from three hours later, twelve tabs deep, holding nothing.
const ENTRY = "RabbitHole";

const MIN_CHARS = 1;
const MAX_CHARS = 30;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

if (ENTRY.length < MIN_CHARS || ENTRY.length > MAX_CHARS) {
  fail(`entry must be ${MIN_CHARS}-${MAX_CHARS} chars, got ${ENTRY.length}`);
}

if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}

if (/\s/.test(ENTRY)) {
  fail("entry must be a single word with no spaces");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });

// Write the entry and nothing else: no trailing newline, no extra text.
fs.writeFileSync(path.join(outDir, "entry.txt"), ENTRY, "utf8");

console.log(`wrote entry.txt (${ENTRY.length} chars): ${ENTRY}`);
