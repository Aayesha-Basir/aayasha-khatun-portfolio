// Fetches the generated resume from the running dev server and saves to public/
// Usage: node ./scripts/fetch-resume.js

import fs from "fs";
import path from "path";

async function fetchResume() {
  const url = "http://localhost:3000/api/resume";
  console.log(`Fetching resume from ${url} ...`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const out = path.join(process.cwd(), "public", "aayasha-khatun-resume.pdf");
    await fs.promises.mkdir(path.dirname(out), { recursive: true });
    await fs.promises.writeFile(out, buf);
    console.log(`Saved resume to ${out}`);
  } catch (err) {
    console.error("Failed to fetch resume:", err);
    process.exit(1);
  }
}

fetchResume();
