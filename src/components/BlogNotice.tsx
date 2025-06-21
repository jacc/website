import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const blogNoticeVariants = cva(
  "p-3 rounded-lg border font-sans text-sm not-prose",
  {
    variants: {
      variant: {
        red: "bg-red-100 dark:bg-red-900/20 border-red-400 dark:border-red-500 text-red-800 dark:text-red-200",
        blue: "bg-[#DBE9FE] dark:bg-[#1E3A8A]/20 border-[#2463EB] dark:border-[#3B82F6] text-[#2463EB] dark:text-[#60A5FA]",
        green:
          "bg-[#DCFCE7] dark:bg-[#14532D]/20 border-[#22C55E] dark:border-[#4ADE80] text-[#16A34A] dark:text-[#4ADE80]",
        yellow:
          "bg-[#FEF9C3] dark:bg-[#854D0E]/20 border-[#EAB308] dark:border-[#FACC15] text-[#854D0E] dark:text-[#FACC15]",
        grey: "bg-neutral-50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  }
);

interface BlogNoticeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof blogNoticeVariants> {
  icon?: LucideIcon;
  title?: string;
}

export function BlogNotice({
  className,
  variant,
  icon: Icon,
  title,
  children,
  ...props
}: BlogNoticeProps) {
  return (
    <div
      className={cn(blogNoticeVariants({ variant }), "not-prose", className)}
      {...props}
    >
      <div className="w-full flex flex-col">
        {Icon && title && (
          <div className="flex items-center gap-2 mb-1">
            {Icon && <Icon className="w-5 h-5" />}
            {title && (
              <div className="font-bold items-center text-base">{title}</div>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
