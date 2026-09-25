import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Clock, CheckCircle2, Share2 } from "lucide-react";
import PageNavbar from "@/components/PageNavbar";
import AuroraCTASection from "@/components/AuroraCTASection";
import Footer from "@/components/Footer";
import { BASE_URL, ogImage } from "@/lib/seo";
import { BLOG_POSTS, BlogPost } from "@/lib/blogData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | Whizzly Lab",
    };
  }

  const url = `${BASE_URL}/blog/${post.slug}`;
  const image = post.image.startsWith("http") ? post.image : `${BASE_URL}${post.image}`;

  return {
    title: `${post.title} | Whizzly Lab Blog`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | Whizzly Lab Engineering`,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  // JSON-LD structured data for Google SEO Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    image: `${BASE_URL}${post.image}`,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Whizzly Lab",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageNavbar />

      {/* Volumetric Top Spotlight Beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-28 w-[600px] sm:w-[750px] h-[900px] origin-top-left -rotate-[35deg] z-0 overflow-hidden"
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(165,180,252,0.35) 0%, rgba(99,102,241,0.18) 28%, rgba(79,70,229,0.04) 60%, transparent 100%)",
            filter: "blur(45px)",
            clipPath: "polygon(18% 0%, 58% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>

      {/* Giant Watermark Background Text: "STUDIO" */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-36 left-1/2 -translate-x-1/2 w-screen flex justify-center items-center select-none z-0"
      >
        <span className="text-[13vw] font-bold uppercase tracking-[0.24em] text-white/[0.03] leading-none font-sans whitespace-nowrap">
          STUDIO
        </span>
      </div>

      {/* ===================== ARTICLE HERO ===================== */}
      <article className="relative z-10 pt-16 sm:pt-24 pb-20 px-5 sm:px-10 lg:px-16 max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>All Insights</span>
        </Link>

        {/* Category & Read Time */}
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
            {post.category}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-gray-500" />
            {post.readingTime}
          </span>
          <span className="text-gray-500">·</span>
          <span className="text-xs text-gray-400 font-mono">{post.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15] mb-6 font-sans">
          {post.title}
        </h1>

        {/* Author Card */}
        <div className="flex items-center gap-4 py-6 border-y border-white/10 mb-10">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-[#090b12]">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-white">{post.author.name}</div>
            <div className="text-xs text-indigo-300 font-mono">{post.author.role}</div>
          </div>
        </div>

        {/* Visual Showcase Image */}
        <div className="relative aspect-[16/9] w-full rounded-[28px] overflow-hidden border border-white/15 bg-[#05060a] mb-12 shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b12] via-transparent to-transparent opacity-20" />
        </div>

        {/* ===================== KEY TAKEAWAYS BOX ===================== */}
        <div className="rounded-[24px] p-6 sm:p-8 bg-[#090b14] border border-indigo-500/30 mb-14 select-none relative overflow-hidden">
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-300 mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            Key Architectural Takeaways
          </div>
          <ul className="space-y-3">
            {post.takeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-200 font-light leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ===================== BODY CONTENT SECTIONS ===================== */}
        <div className="space-y-12 text-gray-300 font-light leading-relaxed text-base sm:text-lg">
          {post.content.map((section, idx) => (
            <section key={idx} className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white font-sans">
                {section.sectionTitle}
              </h2>

              {section.body.map((para, pIdx) => (
                <p key={pIdx} className="text-gray-300/90 leading-relaxed font-light">
                  {para}
                </p>
              ))}

              {/* Optional Highlight Box */}
              {section.highlightBox && (
                <div className="p-6 rounded-2xl bg-white/[0.03] border-l-2 border-indigo-400 border-white/5 my-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-indigo-300 mb-1">
                    {section.highlightBox.title}
                  </div>
                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    {section.highlightBox.text}
                  </p>
                </div>
              )}

              {/* Optional Code Snippet */}
              {section.codeSnippet && (
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#05060b] my-6 font-mono text-xs sm:text-sm">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10 text-gray-400 text-xs">
                    <span>{section.codeSnippet.language}</span>
                    <span className="text-[11px] text-gray-500 font-mono">Whizzly Lab Production</span>
                  </div>
                  <pre className="p-5 overflow-x-auto text-indigo-200/90 leading-relaxed font-mono">
                    <code>{section.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-2 mt-16 pt-8 border-t border-white/10">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-gray-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Connect / Share Callout */}
        <div className="mt-14 rounded-3xl p-8 bg-gradient-to-br from-[#0c0f1c] to-[#07080f] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-medium text-white font-sans">
              Need architecture advice for your project?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">
              Discuss feasibility and benchmarks directly with our systems architects.
            </p>
          </div>

          <Link
            href="/schedule"
            className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs sm:text-sm font-medium hover:bg-gray-200 transition"
          >
            <span>Book Technical Consult</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:scale-110" />
          </Link>
        </div>

        {/* ===================== RELATED ARTICLES ===================== */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/10">
            <h3 className="text-xl font-medium text-white font-sans mb-8">
              Related Engineering Insights
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group rounded-2xl p-5 bg-[#090b12] border border-white/10 hover:border-indigo-400/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-mono uppercase text-indigo-300 mb-2 block">
                      {rel.category}
                    </span>
                    <h4 className="text-base font-medium text-white group-hover:text-indigo-200 transition-colors line-clamp-2 mb-2 font-sans">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2 font-light">
                      {rel.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                    <span className="font-mono">{rel.readingTime}</span>
                    <div className="flex items-center gap-1 text-indigo-300 group-hover:text-white">
                      <span>Read</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Unified Antimatter Aurora CTA & Live Clock Footer */}
      <AuroraCTASection />
      <Footer />
    </main>
  );
}
