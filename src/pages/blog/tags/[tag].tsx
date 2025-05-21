import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import PageLayout from "@/components/PageLayout";
import StyledLink from "@/components/StyledLink";

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
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold font-serif">Posts tagged #{tag}</h1>
        {posts.map((post) => (
          <div key={post.slug} className="flex flex-col gap-1">
            <StyledLink
              href={`/blog/${post.slug}`}
              className="text-lg font-serif"
            >
              {post.title}
            </StyledLink>
            <p className="text-sm text-zinc-500 dark:text-zinc-600">
              {post.date}
              {post.tags && post.tags.length > 0 && (
                <>
                  {" · "}
                  {post.tags.map((tag: string, index: number) => (
                    <span key={tag}>
                      <StyledLink href={`/blog/tags/${tag}`}>#{tag}</StyledLink>
                      {index < post.tags.length - 1 && " "}
                    </span>
                  ))}
                </>
              )}
            </p>
            <p className="text-base dark:text-zinc-300 font-sans">
              {post.excerpt}
            </p>
          </div>
        ))}
      </div>
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

      // Only include posts that have the specified tag
      if (!tags?.includes(tag)) {
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
