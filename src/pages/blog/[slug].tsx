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
import {
  getPlausibleViews,
  getPlausibleViewsForMultipleSlugs,
} from "@/utilities/plausible";

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
  keywords?: string[];
  externalUrl?: string;
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
        keywords={source.frontmatter.keywords}
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
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Written on{" "}
            {new Date(source.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {source.frontmatter.tags && source.frontmatter.tags.length > 0 && (
              <>
                {" · "}
                {source.frontmatter.tags
                  .slice()
                  .sort()
                  .map((tag: string, index: number) => (
                    <span key={tag}>
                      <StyledLink href={`/blog/tags/${tag}`}>#{tag}</StyledLink>
                      {index < source.frontmatter.tags.length - 1 && " "}
                    </span>
                  ))}
              </>
            )}
            {" · "}
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {source.frontmatter.views.toLocaleString()} views
            </span>
          </p>
        </div>

        {source.frontmatter.addendum && (
          <BlogNotice variant="blue" icon={HandIcon} title="Editor's Note:">
            {source.frontmatter.addendum}
          </BlogNotice>
        )}

        <article className="prose prose-base dark:text-neutral-300 text-[var(--foreground)] prose-headings:font-serif prose-headings:text-xl prose-headings:mt-2 prose-headings:mb-2 prose-p:font-sans prose-a:text-blue-500 dark:prose-invert prose-p:leading-normal prose-img:rounded-lg prose-img:w-full prose-img:my-4 prose-img:mx-auto prose-img:max-w-full prose-img:border prose-img:shrink-0 prose-img:shadow-sm prose-img:border-gray-200 prose-li:my-0">
          <MDXRemote
            compiledSource={""}
            components={components}
            scope={{}}
            {...source}
          />
        </article>

        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
          {recommendedPost && (
            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
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
  const views = await getPlausibleViews(params?.slug as string);

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
          views: 0, // Will be updated below
          keywords: frontmatter.keywords as string[] | undefined,
          externalUrl: frontmatter.externalUrl as string | undefined,
        },
      };
    })
  );

  // Get views for all posts in parallel
  const slugs = allPosts.map((post) => post.slug);
  const viewsMap = await getPlausibleViewsForMultipleSlugs(slugs);

  // Update posts with views
  const postsWithViews = allPosts.map((post) => ({
    ...post,
    frontmatter: {
      ...post.frontmatter,
      views: viewsMap[post.slug] || 0,
    },
  }));

  // Find a recommended post with shared tags
  const currentPost = postsWithViews.find((post) => post.slug === params?.slug);
  const recommendedPost = currentPost?.frontmatter.tags
    ? postsWithViews
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
  };
};
