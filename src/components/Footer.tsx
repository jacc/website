import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ClockIcon } from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { motion } from "framer-motion";
dayjs.extend(utc);
dayjs.extend(timezone);

const Footer: React.FC = () => {
  const [date, setDate] = useState(() => dayjs().tz("America/New_York"));

  useEffect(() => {
    const update = () => {
      setDate(dayjs().tz("America/New_York"));
    };

    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.2, // This delay ensures the footer appears after the main content animation
        duration: 0.5,
        ease: "easeOut",
      }}
      className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-600"
    >
      <div>
        <div className="flex justify-center items-center gap-1">
          <ClockIcon className="w-3 h-3" />
          {date.format("h:mm:ss A")}{" "}
          {date.hour() <= 1 && date.hour() < 6 ? " (I'm probably asleep)" : ""}
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 mt-1">
        <Link
          href="/shelf"
          className="hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors"
        >
          Digital Shelf
        </Link>
        <span>⊹</span>
        <Link
          href="/tinkering"
          className="hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors"
        >
          Tinkering
        </Link>
      </div>
    </motion.footer>
  );
};

export default Footer;
