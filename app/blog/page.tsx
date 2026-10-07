import Image from "next/image";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blogs | loyalmanuka",
  description: "Photography tips, behind the scenes, and urban exploration by loyalmanuka.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <a
            href="/#blog"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-neutral-400 hover:text-amber-400 transition-colors uppercase cursor-pointer"
          >
            <span>←</span> Back to Portfolio
          </a>
        </div>

        <div className="mb-16 text-center">
          <p className="mb-2 font-mono text-[11px] tracking-[0.4em] text-amber-400/70 uppercase">
            Journal —
          </p>
          <h1 className="font-bebas text-6xl text-white md:text-7xl">
            The Blog
          </h1>
          <div className="mx-auto mt-4 h-px w-12 bg-amber-400/50" />
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="group relative flex flex-col overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 transition-all hover:border-amber-400/40">
              {post.metadata.coverImage && (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={post.metadata.coverImage}
                    alt={post.metadata.coverAlt || post.metadata.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest text-amber-400 uppercase">
                    {post.metadata.date}
                  </span>
                </div>
                <h2 className="mb-3 font-bebas text-2xl text-white tracking-wide">
                  {post.metadata.title}
                </h2>
                <p className="mb-6 text-sm text-neutral-400 line-clamp-3">
                  {post.metadata.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {post.metadata.tags?.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/5 px-3 py-1 font-mono text-[9px] tracking-widest text-neutral-300 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
