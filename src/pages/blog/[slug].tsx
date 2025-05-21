import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import path from "path";
import PageLayout from "@/components/PageLayout";
import StyledLink from "@/components/StyledLink";

interface BlogPageProps {
  source: {
    frontmatter: {
      title: string;
      excerpt: string;
      date: string;
      tags: string[];
      addendum?: string;
      private: boolean;
    };
  };
}

export default function BlogPage({ source }: BlogPageProps) {
  return (
    <PageLayout showBackButton>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold font-serif">
          {source.frontmatter.title}
        </h1>
        <h2 className="text-lg font-serif">{source.frontmatter.excerpt}</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-600">
          Written on {source.frontmatter.date}
          {source.frontmatter.tags && source.frontmatter.tags.length > 0 && (
            <>
              {" · "}
              {source.frontmatter.tags.map((tag: string) => (
                <StyledLink key={tag} href={`/tags/${tag}`}>
                  #{tag}
                </StyledLink>
              ))}
            </>
          )}
        </p>
      </div>

      {source.frontmatter.addendum && (
        <div className="mt-1">
          <p className="text-md font-sans rounded-lg bg-[#DBE9FE] border border-[#2463EB] text-[#2463EB] p-3">
            <span className="font-bold">Editor&apos;s Note:</span>{" "}
            {source.frontmatter.addendum}
          </p>
        </div>
      )}

      <article className="prose prose-base dark:text-zinc-300 text-[var(--foreground)] prose-headings:font-serif prose-headings:text-xl prose-headings:mt-2 prose-headings:mb-2 prose-p:font-sans prose-a:text-blue-500 dark:prose-invert prose-p:leading-normal prose-img:rounded-lg prose-img:w-full prose-img:my-4 prose-img:mx-auto prose-img:max-w-full prose-img:border prose-img:shrink-0 prose-img:shadow-sm prose-img:border-gray-200">
        <MDXRemote compiledSource={""} scope={undefined} {...source} />
      </article>
    </PageLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), "src/blog"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const source = await Bun.file(
    path.join(process.cwd(), "src/blog", `${params?.slug}.mdx`)
  ).text();

  const mdxSource = await serialize(source, { parseFrontmatter: true });

  return {
    props: {
      source: mdxSource,
    },
  };
};
