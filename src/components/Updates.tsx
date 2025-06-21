import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface StatusUpdate {
  id: number;
  text: string;
  timestamp: string;
}

const group = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const StatusPill = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status] = useState("🟢 Online");

  const updates: StatusUpdate[] = [
    { id: 1, text: "Working on a new project", timestamp: "2m ago" },
    { id: 2, text: "Learning new technologies", timestamp: "1h ago" },
    { id: 3, text: "Taking a coffee break", timestamp: "2h ago" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          mass: 1,
          damping: 100,
          stiffness: 500,
        }}
        className="relative"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-400 px-4 py-2 rounded-[20px] text-sm font-medium shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          {status}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={group}
              transition={{
                type: "spring",
                mass: 11,
                damping: 80,
                stiffness: 500,
                staggerChildren: 0.2,
              }}
              className="absolute bottom-full right-0 mb-2 w-64"
            >
              <div className="space-y-2 p-1">
                {[...updates].reverse().map((update) => (
                  <motion.div
                    key={update.id}
                    variants={item}
                    transition={{
                      type: "spring",
                      mass: 1,
                      damping: 100,
                      stiffness: 500,
                    }}
                    className={clsx(
                      "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-400",
                      "rounded-[20px] px-4 py-2 shadow-lg"
                    )}
                  >
                    <p className="text-sm">{update.text}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      {update.timestamp}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default StatusPill;
