// Shared by the blog list and the article page.

// ~200 words a minute, at least 1 minute.
export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "numbered"; items: string[] }
  | { type: "bullets"; items: string[] };

// Article text is plain text: blank lines split blocks, "1. " lines form a
// numbered list and "- " lines a bullet list.
export function parseContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  for (const chunk of content.split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    if (lines.every((l) => /^\d+[.)]\s+/.test(l))) {
      blocks.push({ type: "numbered", items: lines.map((l) => l.replace(/^\d+[.)]\s+/, "")) });
    } else if (lines.every((l) => /^[-•*]\s+/.test(l))) {
      blocks.push({ type: "bullets", items: lines.map((l) => l.replace(/^[-•*]\s+/, "")) });
    } else {
      blocks.push({ type: "paragraph", text: lines.join(" ") });
    }
  }
  return blocks;
}
