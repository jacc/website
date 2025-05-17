import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { ClockIcon } from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { motion } from "framer-motion";
import StyledLink from "./StyledLink";

dayjs.extend(utc);
dayjs.extend(timezone);

interface FooterProps {
  status: string;
}

const Footer: React.FC<FooterProps> = ({ status }) => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    setDate(dayjs().tz("America/New_York"));
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
        delay: 1.2,
        duration: 0.5,
        ease: "easeOut",
      }}
      className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-600"
    >
      <div>
        <div className="flex justify-left items-center gap-1">
          <ClockIcon className="w-3 h-3" />
          {date ? date.format("h:mm:ss A") : "--:--:-- --"}{" "}
          {date && (date.hour() <= 1 || date.hour() < 6) && status === "offline"
            ? " (I'm probably asleep)"
            : ""}
        </div>
      </div>
      <div className="flex items-left justify-left gap-1 mt-1">
        <NextLink href="/shelf" passHref>
          <StyledLink intent="navigation">Digital Shelf</StyledLink>
        </NextLink>
        <span>⊹</span>
        <NextLink href="/tinkering" passHref>
          <StyledLink intent="navigation">Tinkering</StyledLink>
        </NextLink>
      </div>
    </motion.footer>
  );
};

export default Footer;
