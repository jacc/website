import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import PageLayout from "@/components/PageLayout";
import StyledLink from "@/components/StyledLink";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  slug: string;
}

interface BlogIndexProps {
  posts: BlogPost[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <PageLayout showBackButton>
      <h1 className="text-2xl font-bold font-serif mb-4">Blog Posts</h1>
      <div className="flex flex-col gap-6">
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
              {post.tags && post.tags?.length > 0 && " · "}
              {post.tags &&
                post.tags?.map((tag) => (
                  <StyledLink key={tag} href={`/blog/tags/${tag}`}>
                    #{tag}
                  </StyledLink>
                ))}
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
      };
    })
  );

  // Sort posts by date in descending order
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
};
