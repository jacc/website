import { motion } from "framer-motion";
import { item } from "@/utilities/constants";
import router from "next/router";
import StyledLink from "./StyledLink";
import { ExternalLinkIcon } from "lucide-react";

interface PostPreviewProps {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  slug: string;
  isFullPost?: boolean;
  addendum?: string;
  externalUrl?: string | null;
}

export const PostPreview = ({
  title,
  excerpt,
  date,
  tags,
  slug,
  isFullPost = false,
  addendum,
  externalUrl,
}: PostPreviewProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleClick = () => {
    if (externalUrl) {
      window.open(externalUrl, "_blank", "noopener,noreferrer");
    } else {
      router.push(`/blog/${slug}`);
    }
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    router.push(`/blog/tags/${tag}`);
  };

  return (
    <motion.div
      variants={item}
      className="group flex flex-col gap-1 cursor-pointer rounded-lg transition-colors"
      onClick={handleClick}
    >
      {isFullPost ? (
        <h1 className="text-2xl font-bold font-serif">{title}</h1>
      ) : (
        <div className="flex flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <a
              href={externalUrl || `/blog/${slug}`}
              className="text-base font-medium transition-opacity group-hover:opacity-70 flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
              target={externalUrl ? "_blank" : undefined}
              rel={externalUrl ? "noopener noreferrer" : undefined}
            >
              {title}
              {externalUrl && (
                <ExternalLinkIcon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
              )}
            </a>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {formattedDate}
          </p>
        </div>
      )}

      <div className="flex flex-row justify-between items-center gap-1">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {excerpt}
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {tags?.map((tag, index) => (
            <span key={tag}>
              <StyledLink
                href={`/blog/tags/${tag}`}
                onClick={(e) => handleTagClick(e, tag)}
              >
                #{tag}
              </StyledLink>
              {index < tags.length - 1 && " "}
            </span>
          ))}
        </p>
      </div>

      {isFullPost && addendum && (
        <div className="mt-1">
          <p className="text-md font-sans rounded-lg bg-[#DBE9FE] border border-[#2463EB] text-[#2463EB] p-3">
            <span className="font-bold">Editor&apos;s Note:</span> {addendum}
          </p>
        </div>
      )}
      <div className="h-px rounded-full bg-neutral-100/50 dark:bg-neutral-800 mt-4" />
    </motion.div>
  );
};
