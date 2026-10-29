import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AppBand from "@/components/blog/AppBand";
import { FeaturedPost, PostCard } from "@/components/blog/PostCard";
import { SwitchCards } from "@/components/sections";
import { Kicker, Section, SectionHead, cx, grid12, wrap } from "@/components/site";
import { hero } from "@/components/hero";
import { getPosts } from "@/lib/blog";

const description = "Garment care tips, laundry advice and news from Snapwash, the laundry and dry cleaning pickup and delivery app for New York, New Jersey and Connecticut.";

export const metadata: Metadata = {
  title: { absolute: "Snapwash Blog | Laundry and Garment Care Tips" },
  description,
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", title: "The Snapwash blog", description },
  twitter: { title: "The Snapwash blog", description },
};

export default function BlogIndex() {
  const posts = getPosts();
  const latest = posts[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Blog", "@id": "https://snapwash.io/blog#blog", "url": "https://snapwash.io/blog", "name": "The Snapwash blog", "description": description, "publisher": { "@id": "https://snapwash.io/#org" },
        "blogPost": posts.map((p) => ({ "@type": "BlogPosting", "headline": p.title, "url": `https://snapwash.io/blog/${p.slug}`, "datePublished": p.date })) },
      { "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://snapwash.io/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://snapwash.io/blog" },
      ] },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main id="main">
        <section className={cx(hero.section, "pb-[clamp(40px,5vw,72px)]")} aria-labelledby="h1">
          <div className={cx(wrap, grid12, "gap-y-7")}>
            <div className="col-[1/span_8] max-lg:col-span-full">
              <Kicker className="animate-fade-up [--d:.05s] mb-7">The Snapwash blog</Kicker>
              <h1 id="h1" className={hero.h1}>Notes on <em className={hero.em}>fresh clothes.</em></h1>
            </div>
            <p className={cx(hero.lede, "col-[9/-1] self-end max-lg:col-span-full animate-fade-up [--d:.6s]")}>
              Practical garment care, laundry know-how and what we're learning from the cleaners we work with.
            </p>
          </div>
        </section>

        {latest && (
          <Section className="pt-0" aria-label="Latest article">
            <div className={wrap}>
              <FeaturedPost post={latest} />
            </div>
          </Section>
        )}

        <Section className="pt-0" aria-labelledby="all-title">
          <div className={wrap}>
            <SectionHead kicker={`${posts.length} ${posts.length === 1 ? "article" : "articles"}`} title="All articles" titleId="all-title">
              Straightforward guides on garment care and laundry, written for real closets and busy weeks.
            </SectionHead>
            <div className="grid grid-cols-3 gap-x-tile gap-y-[clamp(40px,5vw,64px)] max-lg:grid-cols-2 max-sm:grid-cols-1">
              {posts.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </Section>

        <AppBand />

        {/* SwitchCards has no top padding of its own; it normally follows a section that ends in padding */}
        <div className="pt-section">
          <SwitchCards items={[
            { href: "/drive", kicker: "Drive with Snapwash", title: "Earn on your schedule." },
            { href: "/cleaners", kicker: "For cleaners", title: "Grow your shop." },
          ]} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
