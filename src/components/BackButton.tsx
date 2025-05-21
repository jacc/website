import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface BackButtonProps {
  href?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href = "/", className }) => {
  return (
    <Link
      href={href}
      aria-label="Go back to homepage"
      className={`
        group
        z-50
        mb-4
        text-sm
        md:absolute md:top-[79px] md:left-[-100px] md:mb-0
        transition-all duration-150 ease-in-out flex items-center gap-2
        ${className}
      `}
    >
      <ArrowLeft className="w-4 h-4 transition-transform duration-150 ease-in-out group-hover:-translate-x-0.5" />{" "}
      Home
    </Link>
  );
};

export default BackButton;
