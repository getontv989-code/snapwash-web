import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AppBand from "@/components/blog/AppBand";
import { Cover, PostCard, PostMeta } from "@/components/blog/PostCard";
import { Kicker, Section, cx, grid12, wrap } from "@/components/ui";
import { hero } from "@/components/hero";
import { type Block, getPost, getPosts, wordCount } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: { absolute: `${post.title} | Snapwash Blog` },
    description: post.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: post.title, description: post.description, publishedTime: post.date, modifiedTime: post.updated ?? post.date },
    twitter: { title: post.title, description: post.description },
  };
}

function BodyBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 id={block.id} className="text-xl leading-[1.1] tracking-display mt-[clamp(40px,4vw,56px)] mb-4 scroll-mt-28">{block.text}</h2>;
    case "p":
      return <p className="text-lg leading-[1.7] mb-5 text-ink/90">{block.text}</p>;
    case "ul":
      return (
        <ul className="grid gap-3 mb-6 border-t-[1.5px] border-t-ink">
          {block.items.map((it) => (
            <li key={it.text} className="grid grid-cols-[20px_1fr] gap-3 py-4 border-b border-b-line text-lg leading-[1.6] text-ink/90">
              <span className="mt-[11px] w-2 h-2 rounded-[50%] bg-brand" aria-hidden="true"></span>
              <span>{it.lead && <b className="font-semibold text-ink">{it.lead} </b>}{it.text}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-[clamp(32px,4vw,48px)] pl-6 border-l-[3px] border-l-brand">
          <p className="font-display font-bold text-xl leading-[1.15] tracking-display text-balance">{block.text}</p>
        </blockquote>
      );
  }
}

export default async function BlogPost({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const url = `https://snapwash.io/blog/${post.slug}`;
  const toc = post.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
  const more = getPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BlogPosting", "@id": `${url}#article`, "headline": post.title, "description": post.description, "url": url,
        "mainEntityOfPage": url, "datePublished": post.date, "dateModified": post.updated ?? post.date, "articleSection": post.category,
        "wordCount": wordCount(post), "inLanguage": "en-US",
        "author": { "@type": "Organization", "name": "Snapwash", "url": "https://snapwash.io/" },
        "publisher": { "@type": "Organization", "@id": "https://snapwash.io/#org", "name": "Snapwash", "logo": { "@type": "ImageObject", "url": "https://snapwash.io/snapwash-logo.svg" } },
        "isPartOf": { "@id": "https://snapwash.io/blog#blog" } },
      { "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://snapwash.io/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://snapwash.io/blog" },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": url },
      ] },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main id="main">
        <article aria-labelledby="h1">
          <header className={cx(hero.section, "pb-[clamp(32px,4vw,56px)]")}>
            <div className={cx(wrap, grid12, "gap-y-6")}>
              <nav className="col-span-full animate-fade-up [--d:.05s]" aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 font-body font-medium text-xs leading-[1.2] tracking-kicker uppercase text-muted">
                  <li><a className="no-underline hover:text-brand" href="/">Home</a></li>
                  <li aria-hidden="true">/</li>
                  <li><a className="no-underline hover:text-brand" href="/blog">Blog</a></li>
                  <li aria-hidden="true">/</li>
                  <li><Kicker as="span">{post.category}</Kicker></li>
                </ol>
              </nav>
              <h1 id="h1" className="split col-[1/span_10] text-[clamp(2.25rem,1.3rem+3.4vw,4.5rem)] leading-[1.02] tracking-display font-extrabold max-lg:col-span-full">{post.title}</h1>
              <div className="col-[1/span_8] grid gap-5 max-lg:col-span-full animate-fade-up [--d:.6s]">
                <p className={hero.lede}>{post.description}</p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                  <span className="inline-flex items-center gap-3 font-semibold">
                    <span className="w-10 h-10 rounded-[50%] grid place-items-center bg-brand text-on-brand font-display font-bold leading-none" aria-hidden="true">S</span>
                    {post.author}
                  </span>
                  <PostMeta post={post} />
                </div>
              </div>
            </div>
          </header>

          <div className={cx(wrap, "animate-fade-up [--d:.75s]")}>
            <Cover post={post} size="lg" />
          </div>

          <Section className="pt-[clamp(40px,5vw,72px)]">
            <div className={cx(wrap, grid12, "gap-y-10")}>
              <aside className="col-[1/span_3] max-lg:col-span-full" aria-label="In this article">
                <div className="sticky top-[110px] grid gap-4 max-lg:static">
                  <Kicker>In this article</Kicker>
                  <ol className="grid border-t-[1.5px] border-t-ink">
                    {toc.map((h) => (
                      <li key={h.id} className="border-b border-b-line">
                        <a className="block py-3 no-underline text-sm leading-[1.35] font-medium text-muted transition-[color,padding] duration-300 ease-brand hover:text-brand hover:pl-1.5" href={`#${h.id}`}>{h.text}</a>
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
              <div className="col-[5/span_7] max-lg:col-span-full max-w-[68ch] [&>h2:first-child]:mt-0">
                {post.body.map((b, i) => <BodyBlock key={i} block={b} />)}
                <div className="mt-10 pt-6 border-t border-t-line flex flex-wrap items-center justify-between gap-4">
                  <PostMeta post={post} />
                  <a className="inline-flex items-center gap-[10px] no-underline font-semibold py-1 border-b-[1.5px] border-b-current hover:text-brand" href="/blog">All articles</a>
                </div>
              </div>
            </div>
          </Section>
        </article>

        <AppBand />

        {more.length > 0 && (
          <Section aria-labelledby="more-title">
            <div className={wrap}>
              <Kicker className="mb-[18px]">Keep reading</Kicker>
              <h2 id="more-title" className="text-2xl leading-none tracking-display mb-[clamp(32px,4vw,56px)]">More from the blog</h2>
              <div className="grid grid-cols-3 gap-x-tile gap-y-12 max-lg:grid-cols-2 max-sm:grid-cols-1">
                {more.map((p) => <PostCard key={p.slug} post={p} />)}
              </div>
            </div>
          </Section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
