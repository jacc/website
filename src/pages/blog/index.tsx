import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import PageLayout from "@/components/PageLayout";
import { PostPreview } from "@/components/PostPreview";
import { motion } from "framer-motion";
import { group } from "@/utilities/constants";
import SEO from "@/components/SEO";
import { getPlausibleViewsForMultipleSlugs } from "@/utilities/plausible";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  slug: string;
  private?: boolean;
  views: number;
  externalUrl?: string | null;
}

interface BlogIndexProps {
  posts: BlogPost[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <>
      <SEO
        title="Jack LaFond | Blog"
        description="Read blog posts by Jack LaFond on cybersecurity, software, and more."
      />
      <PageLayout showBackButton>
        <motion.div variants={group}>
          <motion.h1
            variants={group}
            className="text-2xl font-bold font-serif mb-4"
          >
            Blog Posts
          </motion.h1>
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <PostPreview
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                externalUrl={post.externalUrl}
              />
            ))}
          </div>
        </motion.div>
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), "src/blog"));

  const posts = await Promise.all(
    files.map(async (filename) => {
      const source = await Bun.file(
        path.join(process.cwd(), "src/blog", filename)
      ).text();

      const mdxSource = await serialize(source, { parseFrontmatter: true });

      return {
        title: mdxSource.frontmatter.title as string,
        excerpt: mdxSource.frontmatter.excerpt as string,
        date: mdxSource.frontmatter.date as string,
        tags: (mdxSource.frontmatter.tags as string[]) || null,
        slug: filename.replace(".mdx", ""),
        private: (mdxSource.frontmatter.private as boolean) || false,
        externalUrl: (mdxSource.frontmatter.externalUrl as string) || null,
      };
    })
  );

  const publicPosts = posts.filter((post) => !post.private);

  const slugs = publicPosts.map((post) => post.slug);
  const viewsMap = await getPlausibleViewsForMultipleSlugs(slugs);

  const postsWithViews = publicPosts.map((post) => ({
    ...post,
    views: viewsMap[post.slug] || 0,
  }));

  postsWithViews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return {
    props: {
      posts: postsWithViews,
    },
  };
};
