import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { motion } from "framer-motion";
import StyledLink from "./StyledLink";
import { item } from "@/utilities/constants";
import tzlookup from "@photostructure/tz-lookup";
import { WeatherData } from "@/hooks/useWeather";

dayjs.extend(utc);
dayjs.extend(timezone);

interface FooterProps {
  status: string;
  weather?: WeatherData;
}

const Footer: React.FC<FooterProps> = ({ status, weather }) => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [hasWeatherData, setHasWeatherData] = useState(false);

  useEffect(() => {
    if (weather?.lat && weather?.long) {
      setHasWeatherData(true);
    }
  }, [weather?.lat, weather?.long]);

  useEffect(() => {
    const update = () => {
      if (weather?.lat && weather?.long) {
        // Get timezone from coordinates
        const timezone = tzlookup(Number(weather.lat), Number(weather.long));
        // Create date in the correct timezone
        setDate(dayjs().tz(timezone));
      }
    };

    if (hasWeatherData) {
      update();
      const id = setInterval(update, 1000);
      return () => clearInterval(id);
    }
  }, [weather?.lat, weather?.long, hasWeatherData]);

  return (
    <motion.footer variants={item} className="text-sm">
      <div className="flex flex-col gap-1">
        <StyledLink href="https://corner.inc/jack" intent="navigation">
          <p className="font-bold">
            {weather?.location}
            {weather?.tempF && weather?.desc && (
              <span className="font-normal">
                {" "}
                — {weather.tempF}°F and {weather.desc.toLowerCase()}
              </span>
            )}
          </p>
        </StyledLink>

        <div className="font-sans">
          {hasWeatherData && date
            ? date.format("dddd, MMMM D, YYYY — hh:mm:ss A")
            : ""}
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
