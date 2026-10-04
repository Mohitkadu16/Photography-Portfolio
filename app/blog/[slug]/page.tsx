import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
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
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-neutral-400 hover:text-amber-400 transition-colors uppercase"
        >
          <span>←</span> Back to Blog
        </Link>

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
          <div className="relative mb-16 aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={post.metadata.coverImage}
              alt={post.metadata.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        {/* Prose styling using @tailwindcss/typography */}
        <div className="prose prose-invert prose-amber max-w-none prose-headings:font-bebas prose-headings:tracking-wide prose-a:text-amber-400 prose-img:rounded-xl">
          <MDXRemote source={post.content} components={components} />
        </div>
      </div>
    </article>
  );
}
