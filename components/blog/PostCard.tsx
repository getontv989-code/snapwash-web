import type { Post } from "@/lib/blog";
import { formatDate, readTime } from "@/lib/blog";
import { ArrowIcon, Kicker, cx } from "../site";

/** Brand-blue cover art: a hanger line drawing on the blue, with the category on top. */
export function Cover({ post, size = "md", className }: { post: Post; size?: "md" | "lg"; className?: string }) {
  return (
    <div className={cx(
      "relative overflow-hidden rounded-card bg-blue text-white isolate",
      size === "lg" ? "aspect-[16/7] max-md:aspect-[4/3]" : "aspect-[16/10]",
      className,
    )} aria-hidden="true">
      <svg className={cx("absolute right-[8%] bottom-[14%] h-auto -z-1", size === "lg" ? "w-[42%] max-md:w-[62%]" : "w-[58%]")} viewBox="0 0 200 116" fill="none" stroke="currentColor" strokeWidth="3">
        <path className="stroke-round" d="M86 20a14 14 0 1 1 21 12l-7 5v6" />
        <path className="stroke-round" d="M100 43 18 94c-7 4-5 12 3 12h158c8 0 10-8 3-12Z" />
      </svg>
      <span className="absolute -left-[12%] -top-[30%] w-[60%] aspect-square rounded-[50%] bg-white/10 -z-1"></span>
      <span className={cx("absolute left-[7%] top-[11%] inline-flex items-center gap-[10px] font-body font-medium text-xs leading-[1.2] uppercase tracking-kicker",
        "before:w-2 before:h-2 before:rounded-[50%] before:bg-white text-white/88")}>{post.category}</span>
    </div>
  );
}

export function PostMeta({ post, className }: { post: Post; className?: string }) {
  return (
    <p className={cx("flex flex-wrap gap-x-3 gap-y-1 font-body font-medium text-xs leading-[1.4] tracking-caps uppercase text-muted", className)}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{readTime(post)} min read</span>
    </p>
  );
}

/** Card for the blog index and "keep reading" lists. */
export function PostCard({ post, headingLevel: H = "h3" }: { post: Post; headingLevel?: "h2" | "h3" }) {
  return (
    <a href={`/blog/${post.slug}`} className="reveal group/post grid gap-5 content-start no-underline">
      <div className="overflow-hidden rounded-card">
        <Cover post={post} className="transition-transform duration-700 ease-brand group-hover/post:scale-[1.03]" />
      </div>
      <PostMeta post={post} />
      <H className="text-xl leading-[1.1] tracking-display transition-colors duration-300 ease-brand group-hover/post:text-brand">{post.title}</H>
      <p className="text-muted max-w-[52ch]">{post.description}</p>
      <span className="inline-flex items-center gap-[10px] font-semibold transition-[gap] duration-[350ms] ease-brand group-hover/post:gap-4 group-hover/post:text-brand">
        Read article <ArrowIcon className="w-4 h-4" />
      </span>
    </a>
  );
}

/** Large featured card: cover on the left, text on the right. */
export function FeaturedPost({ post }: { post: Post }) {
  return (
    <a href={`/blog/${post.slug}`} className="reveal group/post grid grid-cols-12 gap-x-col gap-y-6 items-center no-underline *:min-w-0">
      <div className="col-[1/span_7] overflow-hidden rounded-card max-lg:col-span-full">
        <Cover post={post} size="lg" className="transition-transform duration-700 ease-brand group-hover/post:scale-[1.03]" />
      </div>
      <div className="col-[9/-1] grid gap-5 content-center max-lg:col-span-full">
        <Kicker as="span">Latest</Kicker>
        <h2 className="text-2xl leading-[1.02] tracking-display transition-colors duration-300 ease-brand group-hover/post:text-brand">{post.title}</h2>
        <p className="text-muted text-lg leading-[1.55] max-w-[44ch]">{post.description}</p>
        <PostMeta post={post} />
        <span className="inline-flex items-center gap-[10px] font-semibold py-1 border-b-[1.5px] border-b-current justify-self-start transition-[gap] duration-[350ms] ease-brand group-hover/post:gap-4 group-hover/post:text-brand">
          Read article <ArrowIcon className="w-4 h-4" />
        </span>
      </div>
    </a>
  );
}
