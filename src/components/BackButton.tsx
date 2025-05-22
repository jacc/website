import { ArrowLeft } from "lucide-react";
import React from "react";
import { useRouter } from "next/router";

interface BackButtonProps {
  href?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href, className }) => {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      className={`
        group
        z-50
        mb-4
        text-sm
        md:absolute md:top-[79px] md:left-[-100px] md:mb-0
        transition-all duration-150 ease-in-out flex items-center gap-2 hover:cursor-pointer
        ${className}
      `}
    >
      <ArrowLeft className="w-4 h-4 transition-transform duration-150 ease-in-out group-hover:-translate-x-0.5" />{" "}
      Back
    </button>
  );
};

export default BackButton;
