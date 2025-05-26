import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import path from "path";
import PageLayout from "@/components/PageLayout";
import StyledLink from "@/components/StyledLink";
import SEO from "@/components/SEO";
import {
  AlertTriangleIcon,
  GithubIcon,
  HandIcon,
  Linkedin,
  LinkIcon,
  Twitter,
} from "lucide-react";
import { useEffect } from "react";
import { useAchievements } from "@/hooks/useAchievements";

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
  const { unlock, hasAchievement } = useAchievements();

  useEffect(() => {
    if (!hasAchievement("first_blog_read")) {
      unlock("first_blog_read");
    }
  }, [unlock, hasAchievement]);

  return (
    <>
      <SEO
        title={`${source.frontmatter.title} | Jack's Blog`}
        description={
          source.frontmatter.excerpt || "A blog post by Jack LaFond."
        }
      />
      <PageLayout showBackButton>
        {source.frontmatter.private && (
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-800 dark:text-red-200">
            <AlertTriangleIcon className="w-5 h-5 inline-block mr-2" />
            Hey! I&apos;m not sure if you&apos;re reading this, but this post is
            private and not publicly listed. Please don&apos;t share this
            around!
          </div>
        )}
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
                {source.frontmatter.tags.map((tag: string, index: number) => (
                  <span key={tag}>
                    <StyledLink href={`/blog/tags/${tag}`}>#{tag}</StyledLink>
                    {index < source.frontmatter.tags.length - 1 && " "}
                  </span>
                ))}
              </>
            )}
          </p>
        </div>

        {source.frontmatter.addendum && (
          <div className="mt-1">
            <p className="text-md font-sans rounded-lg bg-[#DBE9FE] dark:bg-[#1E3A8A]/20 border border-[#2463EB] dark:border-[#3B82F6] text-[#2463EB] dark:text-[#60A5FA] p-3">
              <HandIcon className="w-5 h-5 inline-block mr-2" />
              <span className="font-bold">Editor&apos;s Note:</span>{" "}
              {source.frontmatter.addendum}
            </p>
          </div>
        )}

        <article className="prose prose-base dark:text-zinc-300 text-[var(--foreground)] prose-headings:font-serif prose-headings:text-xl prose-headings:mt-2 prose-headings:mb-2 prose-p:font-sans prose-a:text-blue-500 dark:prose-invert prose-p:leading-normal prose-img:rounded-lg prose-img:w-full prose-img:my-4 prose-img:mx-auto prose-img:max-w-full prose-img:border prose-img:shrink-0 prose-img:shadow-sm prose-img:border-gray-200 prose-li:my-0">
          <MDXRemote compiledSource={""} scope={undefined} {...source} />
        </article>
        <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <div className="flex gap-4">
            <StyledLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(window.location.href);
              }}
              intent="social"
              icon={LinkIcon}
              ariaLabel="Copy link to this post"
            >
              Copy Link
            </StyledLink>
            <StyledLink
              href="https://github.com/jacc"
              intent="social"
              icon={GithubIcon}
              ariaLabel="Visit my GitHub profile"
            >
              GitHub
            </StyledLink>
            <StyledLink
              href="https://www.x.com/1afond"
              icon={Twitter}
              intent="social"
              ariaLabel="Visit my Twitter profile"
            >
              Twitter
            </StyledLink>
            <StyledLink
              href="https://www.linkedin.com/in/jacklafond/"
              icon={Linkedin}
              intent="social"
              ariaLabel="Visit my LinkedIn profile"
            >
              LinkedIn
            </StyledLink>
          </div>
        </div>
      </PageLayout>
    </>
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
