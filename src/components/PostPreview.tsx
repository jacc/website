import { motion } from "framer-motion";
import { item } from "@/utilities/constants";
import StyledLink from "./StyledLink";

interface PostPreviewProps {
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  slug: string;
  isFullPost?: boolean;
  addendum?: string;
}

export const PostPreview = ({
  title,
  excerpt,
  date,
  tags,
  slug,
  isFullPost = false,
  addendum,
}: PostPreviewProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div variants={item} className="flex flex-col gap-1">
      {isFullPost ? (
        <h1 className="text-2xl font-bold font-serif">{title}</h1>
      ) : (
        <StyledLink href={`/blog/${slug}`} className="text-lg font-serif">
          {title}
        </StyledLink>
      )}

      {!isFullPost && (
        <h2 className="text-base font-serif text-zinc-600 dark:text-zinc-400">
          {excerpt}
        </h2>
      )}

      <p className="text-sm text-zinc-500 dark:text-zinc-600">
        {formattedDate}
        {tags && tags.length > 0 && " · "}
        {tags?.map((tag, index) => (
          <span key={tag}>
            <StyledLink href={`/blog/tags/${tag}`}>#{tag}</StyledLink>
            {index < tags.length - 1 && " "}
          </span>
        ))}
      </p>

      {isFullPost && addendum && (
        <div className="mt-1">
          <p className="text-md font-sans rounded-lg bg-[#DBE9FE] border border-[#2463EB] text-[#2463EB] p-3">
            <span className="font-bold">Editor&apos;s Note:</span> {addendum}
          </p>
        </div>
      )}
    </motion.div>
  );
};
