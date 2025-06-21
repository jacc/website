import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";
import { LucideIcon } from "lucide-react";

const linkVariants = cva("transition-colors duration-150 ease-in-out", {
  variants: {
    intent: {
      primary:
        "underline underline-offset-2 decoration-neutral-500/50 hover:text-neutral-500 dark:hover:text-neutral-400",
      social:
        "text-base underline underline-offset-2 decoration-neutral-500/50 hover:text-neutral-600 dark:hover:text-neutral-400",
      navigation: "hover:text-neutral-700 dark:hover:text-neutral-400",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export interface StyledLinkProps extends VariantProps<typeof linkVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  ariaLabel?: string;
  isAnimated?: boolean;
  animationVariants?: unknown;
  icon?: LucideIcon;
}

const StyledLink = ({
  href,
  children,
  className,
  intent,
  target,
  rel,
  onClick,
  ariaLabel,
  isAnimated,
  animationVariants,
  icon: Icon,
}: StyledLinkProps) => {
  const defaultTarget =
    href.startsWith("http") || href.startsWith("mailto") ? "_blank" : undefined;
  const defaultRel =
    defaultTarget === "_blank" ? "noopener noreferrer" : undefined;

  const LinkComponent = isAnimated ? motion.create(Link) : Link;

  return (
    <LinkComponent
      href={href}
      className={clsx(linkVariants({ intent }), className)}
      target={target ?? defaultTarget}
      rel={rel ?? defaultRel}
      onClick={onClick}
      aria-label={ariaLabel}
      variants={isAnimated ? (animationVariants as Variants) : undefined}
    >
      {Icon && <Icon className="inline-block w-4 h-4 mr-1" />}
      {children}
    </LinkComponent>
  );
};

export default StyledLink;
