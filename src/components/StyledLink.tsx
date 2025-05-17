import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, Variants } from "framer-motion";
import { LucideProps } from "lucide-react";
import clsx from "clsx";

const styledLinkVariants = cva(
  "transition-colors duration-150 ease-in-out", // Base classes
  {
    variants: {
      intent: {
        primary:
          "underline underline-offset-2 decoration-zinc-500/50 hover:text-zinc-700 dark:hover:text-zinc-400",
        social:
          "text-base underline underline-offset-2 decoration-zinc-500/50 hover:text-zinc-600 dark:hover:text-zinc-400",
        navigation: "hover:text-zinc-700 dark:hover:text-zinc-400",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

// Classes for icon layout, applied conditionally if an icon is provided
const iconLayoutClasses = "flex items-center gap-2";

export interface StyledLinkProps
  extends VariantProps<typeof styledLinkVariants> {
  href?: string;
  children: React.ReactNode;
  icon?: React.ElementType<LucideProps>;
  iconClassName?: string;
  isAnimated?: boolean;
  animationVariants?: Variants;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  ariaLabel?: string; // Use aria-label for accessibility
  // Add other specific anchor props as needed, e.g., download, hrefLang, etc.
}

const StyledLink = React.forwardRef<HTMLAnchorElement, StyledLinkProps>(
  (
    {
      href,
      children,
      className,
      intent,
      icon: Icon,
      iconClassName = "w-5 h-5",
      isAnimated,
      animationVariants,
      target,
      rel,
      onClick,
      ariaLabel,
    },
    ref // ref from React.forwardRef
  ) => {
    const finalClassName = clsx(
      styledLinkVariants({ intent }),
      Icon && iconLayoutClasses,
      className
    );

    const defaultTarget =
      href && (href.startsWith("http") || href.startsWith("mailto"))
        ? "_blank"
        : undefined;
    const defaultRel =
      defaultTarget === "_blank" ? "noopener noreferrer" : undefined;

    const anchorProps = {
      href,
      className: finalClassName,
      target: target !== undefined ? target : defaultTarget,
      rel: rel !== undefined ? rel : defaultRel,
      onClick,
      "aria-label": ariaLabel, // Ensure aria-label is passed correctly
    };

    if (isAnimated) {
      return (
        <motion.a {...anchorProps} variants={animationVariants} ref={ref}>
          {Icon && <Icon className={iconClassName} />}
          {children}
        </motion.a>
      );
    }

    return (
      <a {...anchorProps} ref={ref}>
        {Icon && <Icon className={iconClassName} />}
        {children}
      </a>
    );
  }
);

StyledLink.displayName = "StyledLink"; // Good practice for forwardRef components

export default StyledLink;
