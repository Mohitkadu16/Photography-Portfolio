import Image from "next/image";
import { getAllPosts } from "@/lib/blog";

export default function BlogSection() {
  const posts = getAllPosts();

  if (!posts || posts.length === 0) return null;

  return (
    <section id="blog" className="bg-neutral-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <p className="mb-2 font-mono text-[11px] tracking-[0.4em] text-amber-400/70 uppercase">
            005 —
          </p>
          <h2 className="font-bebas text-6xl text-white md:text-7xl">
            The Blog
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-amber-400/50" />
          <p className="mt-4 text-neutral-400 text-sm max-w-xl mx-auto">
            Stories, behind-the-scenes reflections, and the journey behind the frames.
          </p>
        </div>

        {/* Post Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-neutral-900 border border-white/8 transition-all duration-300 hover:border-amber-400/40 hover:shadow-[0_0_30px_rgba(251,191,36,0.05)]"
            >
              {post.metadata.coverImage && (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={post.metadata.coverImage}
                    alt={post.metadata.coverAlt || post.metadata.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest text-amber-400 uppercase">
                    {post.metadata.date}
                  </span>
                  {post.metadata.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 border border-white/8 px-2.5 py-0.5 font-mono text-[9px] tracking-widest text-neutral-400 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mb-2 font-bebas text-2xl text-white tracking-wide group-hover:text-amber-400 transition-colors">
                  {post.metadata.title}
                </h3>

                <p className="mb-6 text-sm text-neutral-400 leading-relaxed line-clamp-3">
                  {post.metadata.description}
                </p>

                <div className="mt-auto flex items-center gap-2 font-mono text-xs tracking-widest text-amber-400 uppercase">
                  <span>Read Post</span>
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div> 
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
