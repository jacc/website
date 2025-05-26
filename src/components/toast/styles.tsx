import { cva } from "class-variance-authority";

export const toastCloseButtonVariants = cva(
  [
    "absolute",
    "-right-2.5",
    "-top-2.5",
    "size-5",
    "items-center",
    "justify-center",
    "rounded-full",
    "border",
    "transition-colors",
    "focus:outline-none",
    "focus-visible:ring-2",
  ],
  {
    variants: {
      intent: {
        none: [
          "bg-[#F5F5F5]",
          "text-[#222]",
          "border-[#E1E1E1]",
          "hover:border-[#CFCFCF]",
          "hover:bg-[#EDEDED]",
          "active:bg-[#E1E1E1]",
        ],
        info: [
          "bg-[#E6F0FF]",
          "text-[#2463EB]",
          "border-[#B3D1FF]",
          "hover:border-[#2463EB]",
          "hover:bg-[#DBE9FE]",
          "active:bg-[#B3D1FF]",
        ],
        success: [
          "bg-[#E6F9F0]",
          "text-[#15803D]",
          "border-[#A7F3D0]",
          "hover:border-[#15803D]",
          "hover:bg-[#D1FAE5]",
          "active:bg-[#A7F3D0]",
        ],
        fail: [
          "bg-[#FEE2E2]",
          "text-[#B91C1C]",
          "border-[#FCA5A5]",
          "hover:border-[#B91C1C]",
          "hover:bg-[#FECACA]",
          "active:bg-[#FCA5A5]",
        ],
        warning: [
          "bg-[#FEF9C3]",
          "text-[#B45309]",
          "border-[#FDE68A]",
          "hover:border-[#B45309]",
          "hover:bg-[#FEF3C7]",
          "active:bg-[#FDE68A]",
        ],
        orange: [
          "bg-[#FFF7ED]",
          "text-[#EA580C]",
          "border-[#FDBA74]",
          "hover:border-[#EA580C]",
          "hover:bg-[#FED7AA]",
          "active:bg-[#FDBA74]",
        ],
      },
      isTouchScreen: {
        true: ["flex"],
        false: ["animate-in", "fade-in", "hidden", "group-hover:flex"],
      },
    },
  }
);

export const toastContainerStyles = ["flex", "flex-col", "gap-1", "w-full"];

export const toastDescriptionVariants = cva(
  ["text-xs", "font-normal", "leading-4", "w-full"],
  {
    variants: {
      intent: {
        none: ["text-[#F5E9DD]", "dark:text-[#F5E9DD]"],
        info: ["text-[#60A5FA]", "dark:text-[#60A5FA]"],
        success: ["text-[#22C55E]", "dark:text-[#22C55E]"],
        fail: ["text-[#FCA5A5]", "dark:text-[#FCA5A5]"],
        warning: ["text-[#FDE68A]", "dark:text-[#FDE68A]"],
        orange: ["text-[#FDBA74]", "dark:text-[#FDBA74]"],
      },
      clip: {
        true: ["overflow-hidden", "text-ellipsis", "line-clamp-1"],
        false: [],
      },
    },
  }
);

export const toastIconContainerVariants = cva(
  ["flex", "items-center", "justify-center", "w-5", "[&>svg]:h-5"],
  {
    variants: {
      intent: {
        none: ["text-[#222]"],
        info: ["text-[#2463EB]"],
        success: ["text-[#15803D]"],
        fail: ["text-[#B91C1C]"],
        warning: ["text-[#B45309]"],
        orange: ["text-[#EA580C]"],
      },
    },
  }
);

export const toastTitleVariants = cva(
  [
    "text-sm",
    "font-medium",
    "leading-[1.125rem]",
    "overflow-hidden",
    "text-ellipsis",
    "line-clamp-1",
    "relative",
  ],
  {
    variants: {
      intent: {
        none: ["text-[#F5E9DD]", "dark:text-[#F5E9DD]"],
        info: ["text-[#60A5FA]", "dark:text-[#60A5FA]"],
        success: ["text-[#22C55E]", "dark:text-[#22C55E]"],
        fail: ["text-[#FCA5A5]", "dark:text-[#FCA5A5]"],
        warning: ["text-[#FDE68A]", "dark:text-[#FDE68A]"],
        orange: ["text-[#FDBA74]", "dark:text-[#FDBA74]"],
      },
    },
  }
);

export const toastVariants = cva(
  [
    "group",
    "w-full",
    "flex",
    "items-center",
    "justify-between",
    "space-x-4",
    "overflow-hidden",
    "p-3",
    "border",
    "rounded-md",
    "pointer-events-auto",
    "focus:outline-none",
  ],
  {
    variants: {
      intent: {
        none: [
          "bg-[#F5F5F5]",
          "border-[#E1E1E1]",
          "dark:bg-[#2C1C0F]",
          "dark:border-[#A97A50]",
        ],
        info: [
          "bg-[#E6F0FF]",
          "border-[#B3D1FF]",
          "dark:bg-[#1E293B]",
          "dark:border-[#2463EB]",
        ],
        success: [
          "bg-[#E6F9F0]",
          "border-[#A7F3D0]",
          "dark:bg-[#052E1B]",
          "dark:border-[#22C55E]",
        ],
        fail: [
          "bg-[#FEE2E2]",
          "border-[#FCA5A5]",
          "dark:bg-[#3B1A1A]",
          "dark:border-[#B91C1C]",
        ],
        warning: [
          "bg-[#FEF9C3]",
          "border-[#FDE68A]",
          "dark:bg-[#3B2F1A]",
          "dark:border-[#B45309]",
        ],
        orange: [
          "bg-[#FFF7ED]",
          "border-[#FDBA74]",
          "dark:bg-[#3B241A]",
          "dark:border-[#EA580C]",
        ],
      },
    },
  }
);
