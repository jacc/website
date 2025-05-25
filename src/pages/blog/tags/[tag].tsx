import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import PageLayout from "@/components/PageLayout";
import { PostPreview } from "@/components/PostPreview";
import { motion } from "framer-motion";
import { group } from "@/utilities/constants";

interface TagPageProps {
  posts: {
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
    slug: string;
  }[];
  tag: string;
}

export default function TagPage({ posts, tag }: TagPageProps) {
  return (
    <PageLayout showBackButton>
      <motion.div variants={group} className="flex flex-col gap-4">
        <motion.h1 variants={group} className="text-2xl font-bold font-serif">
          Posts tagged #{tag}
        </motion.h1>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            tags={post.tags}
            slug={post.slug}
          />
        ))}
      </motion.div>
    </PageLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), "src/blog"));
  const allTags = new Set<string>();

  // Get all unique tags from all posts
  await Promise.all(
    files.map(async (filename) => {
      const source = await Bun.file(
        path.join(process.cwd(), "src/blog", filename)
      ).text();
      const mdxSource = await serialize(source, { parseFrontmatter: true });
      const tags = mdxSource.frontmatter.tags as string[];
      tags?.forEach((tag) => allTags.add(tag));
    })
  );

  const paths = Array.from(allTags).map((tag) => ({
    params: { tag },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TagPageProps> = async ({
  params,
}) => {
  const files = fs.readdirSync(path.join(process.cwd(), "src/blog"));
  const tag = params?.tag as string;

  const posts = await Promise.all(
    files.map(async (filename) => {
      const source = await Bun.file(
        path.join(process.cwd(), "src/blog", filename)
      ).text();

      const mdxSource = await serialize(source, { parseFrontmatter: true });
      const tags = mdxSource.frontmatter.tags as string[];
      const isPrivate = (mdxSource.frontmatter.private as boolean) || false;

      // Only include posts that have the specified tag and are not private
      if (!tags?.includes(tag) || isPrivate) {
        return null;
      }

      return {
        title: mdxSource.frontmatter.title as string,
        excerpt: mdxSource.frontmatter.excerpt as string,
        date: mdxSource.frontmatter.date as string,
        tags: tags || [],
        slug: filename.replace(".mdx", ""),
      };
    })
  );

  // Filter out null posts and sort by date
  const filteredPosts = posts
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts: filteredPosts,
      tag,
    },
  };
};
