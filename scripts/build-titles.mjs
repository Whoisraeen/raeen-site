// Builds data/titles.json from data/ps5_titles.tsv + data/status-overrides.json.
//
// TSV source: https://github.com/1jtp8sobiu/ps5-pkg (PS5_TITLE_ID.tsv) —
// factual title-ID metadata. Statuses come only from status-overrides.json,
// which records Raeen's own documented acceptance runs. Everything else is
// "untested" — we never invent compatibility results.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const REGION = {
  U: "Americas",
  E: "Europe",
  J: "Japan",
  H: "Asia",
  K: "Korea",
  I: "Int'l",
};

const tsv = readFileSync(join(root, "data", "ps5_titles.tsv"), "utf8");
const overrides = JSON.parse(
  readFileSync(join(root, "data", "status-overrides.json"), "utf8"),
);

const byName = new Map();

function add(name, id, region) {
  const key = name.trim();
  if (!byName.has(key)) {
    byName.set(key, { name: key, entries: [], status: "untested" });
  }
  const t = byName.get(key);
  if (!t.entries.some((e) => e.id === id)) t.entries.push({ id, region });
}

for (const line of tsv.split("\n").slice(1)) {
  const cols = line.split("\t");
  if (cols.length < 4) continue;
  const [, titleId, contentId, titleName] = cols;
  if (!titleId || !titleId.startsWith("PPSA") || !titleName) continue;
  const region = REGION[(contentId || "")[0]] ?? "Other";
  add(titleName, titleId, region);
}

for (const o of overrides) {
  add(o.name, o.id, o.region);
  const t = byName.get(o.name);
  t.status = o.status;
  if (o.notes) t.notes = o.notes;
  if (o.tested) t.tested = o.tested;
}

const titles = [...byName.values()].sort((a, b) =>
  a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
);

writeFileSync(
  join(root, "data", "titles.json"),
  JSON.stringify(titles, null, 1),
);

const counts = {};
for (const t of titles) counts[t.status] = (counts[t.status] ?? 0) + 1;
console.log(`${titles.length} titles`, counts);
