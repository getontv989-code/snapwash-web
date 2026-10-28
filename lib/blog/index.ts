import howOftenToDryClean from "./posts/how-often-should-you-dry-clean";

/* Blog content. Each post is a plain data object, so posts can later come from a CMS or database
   without touching the page templates. */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "ul"; items: { lead?: string; text: string }[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  /** Meta description and card summary */
  description: string;
  category: string;
  author: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  updated?: string;
  body: Block[];
};

const POSTS: Post[] = [howOftenToDryClean];

/** Newest first. */
export function getPosts(): Post[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  return [...new Set(POSTS.map((p) => p.category))];
}

export function wordCount(post: Post): number {
  const text = post.body.map((b) => (b.type === "ul" ? b.items.map((i) => `${i.lead ?? ""} ${i.text}`).join(" ") : b.text)).join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

/** Minutes at roughly 230 words a minute. */
export function readTime(post: Post): number {
  return Math.max(1, Math.round(wordCount(post) / 230));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
