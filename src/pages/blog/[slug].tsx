import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import path from "path";
import PageLayout from "@/components/PageLayout";
import StyledLink from "@/components/StyledLink";
import SEO from "@/components/SEO";
import { BlogNotice } from "@/components/BlogNotice";
import {
  AlertTriangleIcon,
  GithubIcon,
  HandIcon,
  Linkedin,
  LinkIcon,
  Twitter,
  BookOpenIcon,
} from "lucide-react";
import { useEffect } from "react";
import { useAchievements } from "@/hooks/useAchievements";
import { env } from "@/utilities/env";

interface BlogFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  private: boolean;
  banner?: string | null;
  header?: string | null;
  modifiedDate?: string | null;
  addendum?: string | null;
  views: number;
}

interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
}

interface BlogPageProps {
  source: {
    frontmatter: BlogFrontmatter;
  };
  params: {
    slug: string;
  };
  recommendedPost?: {
    slug: string;
    title: string;
    excerpt: string;
  };
}

const components = {
  BlogNotice,
};

export default function BlogPage({
  source,
  params,
  recommendedPost,
}: BlogPageProps) {
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
        ogImage={
          source.frontmatter.banner || source.frontmatter.header || undefined
        }
        canonicalUrl={`/blog/${params.slug}`}
        type="article"
        publishedTime={source.frontmatter.date}
        modifiedTime={
          source.frontmatter.modifiedDate || source.frontmatter.date
        }
        tags={source.frontmatter.tags}
      />
      <PageLayout showBackButton>
        {source.frontmatter.private && (
          <BlogNotice variant="red" icon={AlertTriangleIcon}>
            Hey! I&apos;m not sure if you&apos;re reading this, but this post is
            private and not publicly listed. Please don&apos;t share this
            around!
          </BlogNotice>
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
            {" · "}
            <span className="text-sm text-zinc-500 dark:text-zinc-600">
              {source.frontmatter.views.toLocaleString()} views
            </span>
          </p>
        </div>

        {source.frontmatter.addendum && (
          <BlogNotice variant="blue" icon={HandIcon} title="Editor's Note:">
            {source.frontmatter.addendum}
          </BlogNotice>
        )}

        <article className="prose prose-base dark:text-zinc-300 text-[var(--foreground)] prose-headings:font-serif prose-headings:text-xl prose-headings:mt-2 prose-headings:mb-2 prose-p:font-sans prose-a:text-blue-500 dark:prose-invert prose-p:leading-normal prose-img:rounded-lg prose-img:w-full prose-img:my-4 prose-img:mx-auto prose-img:max-w-full prose-img:border prose-img:shrink-0 prose-img:shadow-sm prose-img:border-gray-200 prose-li:my-0">
          <MDXRemote
            compiledSource={""}
            components={components}
            scope={{}}
            {...source}
          />
        </article>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
          {recommendedPost && (
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2 mb-2">
                <BookOpenIcon className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-serif font-medium">
                  You might also like...
                </h3>
              </div>
              <StyledLink
                href={`/blog/${recommendedPost.slug}`}
                className="block"
              >
                <h4 className="text-base font-serif font-medium hover:text-blue-500 transition-colors">
                  {recommendedPost.title}
                </h4>
              </StyledLink>
            </div>
          )}
          <div className="flex gap-4 mt-4">
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

  const mdxSource = await serialize(source, {
    parseFrontmatter: true,
  });

  // Fetch Plausible views for this post
  let views = 0;
  try {
    const url = `https://${
      env.PLAUSIBLE_URL
    }/api/v1/stats/aggregate?site_id=jack.bio&period=custom&date=2023-01-01,${
      new Date().toISOString().split("T")[0]
    }&filters=event:page==/blog/${params?.slug}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${env.PLAUSIBLE_API_KEY}`,
        Accept: "application/json",
      },
    });
    const data = await response.json();
    views = data?.results?.visitors?.value ?? 0;
  } catch (error) {
    console.error(`Error fetching views for ${params?.slug}:`, error);
    views = 0;
  }

  // Inject views into frontmatter
  mdxSource.frontmatter = {
    ...mdxSource.frontmatter,
    views,
  };

  // Get all blog posts for recommendations
  const files = fs.readdirSync(path.join(process.cwd(), "src/blog"));
  const allPosts: BlogPost[] = await Promise.all(
    files.map(async (filename) => {
      const content = await Bun.file(
        path.join(process.cwd(), "src/blog", filename)
      ).text();
      const { frontmatter } = await serialize(content, {
        parseFrontmatter: true,
      });

      // Get views from Plausible
      let views = 0;
      try {
        const url = `https://${
          env.PLAUSIBLE_URL
        }/api/v1/stats/aggregate?site_id=jack.bio&period=custom&date=2023-01-01,${
          new Date().toISOString().split("T")[0]
        }&filters=event:page==/blog/${filename.replace(".mdx", "")}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${env.PLAUSIBLE_API_KEY}`,
            Accept: "application/json",
          },
        });
        const data = await response.json();
        views = data?.results?.visitors?.value ?? 0;
      } catch (error) {
        console.error(`Error fetching views for ${filename}:`, error);
        views = 0;
      }

      return {
        slug: filename.replace(".mdx", ""),
        frontmatter: {
          title: frontmatter.title as string,
          excerpt: frontmatter.excerpt as string,
          date: frontmatter.date as string,
          tags: (frontmatter.tags as string[]) || [],
          private: frontmatter.private as boolean,
          banner: frontmatter.banner as string | null,
          header: frontmatter.header as string | null,
          modifiedDate: frontmatter.modifiedDate as string | null,
          addendum: frontmatter.addendum as string | null,
          views: views,
        },
      };
    })
  );

  // Find a recommended post with shared tags
  const currentPost = allPosts.find((post) => post.slug === params?.slug);
  const recommendedPost = currentPost?.frontmatter.tags
    ? allPosts
        .filter(
          (post) =>
            post.slug !== params?.slug && // Not the current post
            !post.frontmatter.private && // Not a private post
            post.frontmatter.tags.some((tag) =>
              currentPost.frontmatter.tags.includes(tag)
            ) // Has at least one shared tag
        )
        .sort(() => Math.random() - 0.5)[0] // Get a random post
    : null;

  return {
    props: {
      source: mdxSource,
      params,
      recommendedPost: recommendedPost
        ? {
            slug: recommendedPost.slug,
            title: recommendedPost.frontmatter.title,
            excerpt: recommendedPost.frontmatter.excerpt,
          }
        : null,
    },
    revalidate: 3600,
  };
};
