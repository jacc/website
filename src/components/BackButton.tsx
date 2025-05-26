import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface BackButtonProps {
  href?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href, className }) => {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setCanGoBack(window.history.state?.idx > 0);
    };

    handleRouteChange(); // Check initial state
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else if (canGoBack) {
      router.back();
    } else {
      router.push("/");
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
        md:absolute md:top-[63px] md:left-[-100px] md:mb-0
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
