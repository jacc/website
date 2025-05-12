import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ClockIcon } from "lucide-react";

const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const estDate = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      });
      setCurrentTime(
        new Date(estDate).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-600">
      <div>
        <div className="flex justify-center items-center gap-1">
          <ClockIcon className="w-3 h-3" />
          {currentTime} EST
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
    </footer>
  );
};

export default Footer;
