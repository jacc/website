import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { motion } from "framer-motion";
import StyledLink from "./StyledLink";
import { item } from "@/utilities/constants";

dayjs.extend(utc);
dayjs.extend(timezone);

interface FooterProps {
  status: string;
  weather?: {
    location?: string;
    tempF?: string;
    desc?: string;
  } | null;
}

const Footer: React.FC<FooterProps> = ({ status, weather }) => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    setDate(dayjs());
    const update = () => {
      setDate(dayjs());
    };
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.footer variants={item} className="text-sm">
      <div className="flex flex-col gap-1">
        <p className="font-bold">
          {weather?.location}
          {weather?.tempF && weather?.desc && (
            <span className="font-normal">
              {" "}
              — {weather.tempF}°F and {weather.desc.toLowerCase()}
            </span>
          )}
        </p>

        <div className="font-sans">
          {date
            ? date.format("dddd, MMMM D, YYYY — hh:mm:ss A")
            : "--, -- ---- ----, --.--.-- -- ---"}
          {date && (date.hour() <= 1 || date.hour() < 6) && status === "offline"
            ? " (I'm probably asleep)"
            : ""}
        </div>
      </div>
      <nav className="flex items-center gap-1 mt-1">
        <StyledLink href="/shelf" intent="navigation">
          Digital Shelf
        </StyledLink>
        <span>⊹</span>
        <StyledLink href="/tinkering" intent="navigation">
          Tinkering
        </StyledLink>
        <span>⊹</span>
        <StyledLink href="/blog" intent="navigation">
          Blog
        </StyledLink>
        <span>⊹</span>
        <StyledLink href="/labs" intent="navigation">
          LaFond Labs™
        </StyledLink>
      </nav>
    </motion.footer>
  );
};

export default Footer;
