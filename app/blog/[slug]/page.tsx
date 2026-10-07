import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Next.js 15: params is now a Promise
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: `${post.metadata.title} | loyalmanuka`,
      description: post.metadata.description,
      openGraph: {
        title: post.metadata.title,
        description: post.metadata.description,
        type: "article",
        publishedTime: post.metadata.date,
        images: post.metadata.coverImage ? [post.metadata.coverImage] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.metadata.title,
        description: post.metadata.description,
        images: post.metadata.coverImage ? [post.metadata.coverImage] : [],
      },
    };
  } catch {
    return {
      title: "Blog Not Found",
    };
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  // Generate JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    image: post.metadata.coverImage ? [post.metadata.coverImage] : [],
    datePublished: post.metadata.date,
    dateModified: post.metadata.date,
    author: [
      {
        "@type": "Person",
        name: "loyalmanuka",
        url: "https://instagram.com/loyalmanuka",
      },
    ],
  };

  // Custom components for MDX
  const components = {
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <Image
        src={(props.src as string) ?? ""}
        alt={props.alt ?? "Blog image"}
        width={800}
        height={500}
        className="rounded-xl object-cover"
        unoptimized
      />
    ),
  };

  return (
    <article className="min-h-screen bg-black pt-32 pb-20 selection:bg-amber-400 selection:text-black">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <a
            href="/#blog"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-neutral-400 hover:text-amber-400 transition-colors uppercase cursor-pointer"
          >
            <span>←</span> Back to Portfolio
          </a>
          <a
            href="/blog"
            className="font-mono text-xs tracking-widest text-neutral-500 hover:text-amber-400 transition-colors uppercase cursor-pointer"
          >
            All Blogs →
          </a>
        </div>

        <header className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest text-amber-400 uppercase">
              {post.metadata.date}
            </span>
          </div>
          <h1 className="mb-6 font-bebas text-5xl text-white md:text-6xl lg:text-7xl">
            {post.metadata.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {post.metadata.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 font-mono text-[9px] tracking-widest text-neutral-300 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {post.metadata.coverImage && (
          <figure className="mb-16">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src={post.metadata.coverImage}
                alt={post.metadata.coverAlt || post.metadata.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            {(post.metadata.coverCaption || post.metadata.coverSubtitle) && (
              <figcaption className="mt-3.5 text-center font-mono text-[11px] tracking-wider text-neutral-400">
                {post.metadata.coverCaption || post.metadata.coverSubtitle}
              </figcaption>
            )}
          </figure>
        )}

        {/* Prose styling using @tailwindcss/typography */}
        <div className="prose prose-invert prose-amber max-w-none prose-headings:font-bebas prose-headings:tracking-wide prose-a:text-amber-400 prose-img:rounded-xl">
          <MDXRemote source={post.content} components={components} />
        </div>

        {/* Author Footer Card */}
        <div className="mt-20 border-t border-white/10 pt-12">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-8 backdrop-blur-sm sm:flex sm:items-center sm:gap-6">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border border-amber-400/40">
              <Image
                src="/images/profile.jpg"
                alt="Mohit Kadu"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="mt-4 sm:mt-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-white">Mohit Kadu</h3>
                <span className="rounded-full bg-amber-400/10 px-2.5 py-0.5 font-mono text-[10px] text-amber-400 uppercase">
                  @loyalmanuka
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                Mobile photographer & visual storyteller based in Mumbai. Documenting street life, kinetic moments, and nostalgic city fragments. Top 100 Finalist in WallMag Photography Awards.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-wider">
                <a
                  href="https://instagram.com/loyalmanuka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 transition-colors"
                >
                  Instagram ↗
                </a>
                <span className="text-neutral-700">•</span>
                <a
                  href="https://www.threads.net/@loyalmanuka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-neutral-300 transition-colors"
                >
                  Threads ↗
                </a>
                <span className="text-neutral-700">•</span>
                <a
                  href="https://wallmag.io/loyalmanuka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  WallMag ↗
                </a>
                <span className="text-neutral-700">•</span>
                <a
                  href="/#work"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  View Work ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
