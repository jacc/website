import { motion } from "framer-motion";
import { group } from "@/utilities/constants";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  showConfetti?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <main className="mx-auto max-w-xl px-3 pt-10 md:pt-18 pb-16">
      <motion.div
        className="flex flex-col gap-4"
        initial="hidden"
        animate="show"
        variants={group}
      >
        {children}
      </motion.div>
    </main>
  );
};

export default PageLayout;
