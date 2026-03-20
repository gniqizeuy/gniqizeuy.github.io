import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const files = [
  "assets/data/gf_losses.csv",
  "assets/data/yh_losses.csv",
];

function parseAmount(value) {
  const normalized = String(value ?? "")
    .replace(/,/g, "")
    .replace(/%/g, "")
    .trim();
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function sortCsvContent(content) {
  const lines = content.replace(/\r\n/g, "\n").trimEnd().split("\n");
  if (lines.length <= 1) return `${content.endsWith("\n") ? content : `${content}\n`}`;

  const [header, ...rows] = lines;
  const sortedRows = rows
    .filter(Boolean)
    .map((line, index) => ({ line, index, cells: line.split(",") }))
    .sort((a, b) => {
      const amountDiff = parseAmount(a.cells[1]) - parseAmount(b.cells[1]);
      if (amountDiff !== 0) return amountDiff;
      const nameA = a.cells[0] ?? "";
      const nameB = b.cells[0] ?? "";
      const nameDiff = nameA.localeCompare(nameB, "zh-Hans-CN");
      if (nameDiff !== 0) return nameDiff;
      return a.index - b.index;
    })
    .map(row => row.line);

  return `${[header, ...sortedRows].join("\n")}\n`;
}

for (const file of files) {
  const fullPath = path.resolve(file);
  const content = await readFile(fullPath, "utf8");
  const sorted = sortCsvContent(content);
  if (sorted !== content) {
    await writeFile(fullPath, sorted, "utf8");
  }
}

