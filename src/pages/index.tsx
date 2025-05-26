import Image from "next/image";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import { group, item } from "@/utilities/constants";
import { getStatusColor, Status } from "@/components/DiscordStatus";
import { getSteamRecentGames, SteamRecentGamesResponse } from "@/server/steam";
import { getMusic } from "@/server/lastfm";
import { getCurrentlyReading, HardcoverBook } from "@/server/hardcover";
import PersonalInterests from "../components/PersonalInterests";
import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";
import clsx from "clsx";
import { useLanyardWS } from "use-lanyard";
import { GithubIcon, Linkedin, Twitter } from "lucide-react";
import StyledLink from "@/components/StyledLink";
import { getWeather } from "@/server/weather";
import SEO from "@/components/SEO";
import { useEffect } from "react";
import { toast } from "@/components/toast";

type Props = {
  steam: SteamRecentGamesResponse;
  music: Array<[string, string]>;
  books: HardcoverBook[];
  weather: {
    location?: string;
    tempF?: string;
    desc?: string;
  } | null;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const steam = await getSteamRecentGames();
  const music = await getMusic();
  const books = await getCurrentlyReading();
  const weather = await getWeather("Tampa");

  return {
    props: {
      steam,
      music,
      books,
      weather,
    },
    revalidate: 3600,
  };
};

export default function Home(props: Props) {
  // The variable is hardcoded due to a server validated env variable not being available on the client.
  const lanyard = useLanyardWS("657057112593268756");
  const status = lanyard?.discord_status || "offline";

  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Excuse the mess!",
        description: "The site is still under construction :)",
        intent: "success",
        duration: 7500,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO title="Jack LaFond" />
      <PageLayout>
        <motion.div variants={group} className="flex flex-col gap-4">
          <motion.div variants={item} className="flex flex-col gap-4">
            <div className="sticky shrink-0">
              <Image
                src="https://avatars.githubusercontent.com/u/6956351?v=4"
                alt="logo"
                width={75}
                height={75}
                priority={true}
                // Thank you Shayan / https://userjot.com
                className="p-0.5 rounded-full border shrink-0 shadow-sm border-gray-200"
              />
              {status !== "offline" && (
                <div
                  className={clsx(
                    "absolute bottom-0.5 left-14.5 w-4 h-4 border-2 border-white dark:border-[#0A0A0A] rounded-full shadow-sm transition-colors duration-500",
                    getStatusColor(status, "background")
                  )}
                ></div>
              )}
            </div>

            <h1 className="text-2xl font-bold font-serif">
              ...who&apos;s Jack LaFond?
            </h1>
          </motion.div>
          <motion.div className="flex flex-col gap-4" variants={group}>
            <motion.p
              className="text-base dark:text-zinc-300 font-sans"
              variants={item}
            >
              Hi! I&apos;m Jack. I&apos;ve been called a lot of things over the
              years, but at my core, I&apos;ve always been a tinkerer. I
              recently graduated with a degree in Cybersecurity from the
              University of Tampa (and liked it so much, I decided to stick
              around for my MBA!)
            </motion.p>
            <motion.div variants={item}>
              <p className="text-base dark:text-zinc-300 font-sans">
                Over the last decade, I&apos;ve been learning how to build,
                break, and bother digital systems. That&apos;s led to some
                pretty cool stories:
              </p>
              <ul className="list-disc ml-4 text-base dark:text-zinc-300 font-sans mt-2">
                <li>
                  <StyledLink href="/blog/life360">
                    Reversing Life360 and going viral for it
                  </StyledLink>
                </li>
                <li>
                  <StyledLink href="/blog/tracelabs">
                    Winning a global missing persons competition
                  </StyledLink>
                </li>
                <li>
                  Writing software used by tens of thousands of people monthly
                </li>
                <li>
                  <StyledLink href="/blog/wafflehouse">
                    Receiving a cease and desist from beloved breakfast
                    restaurant, Waffle House
                  </StyledLink>
                </li>
              </ul>
            </motion.div>
            <motion.p
              className="text-base dark:text-zinc-300 font-sans"
              variants={item}
            >
              I&apos;m currently working at Security Innovation as a Security
              Engineer Intern, where I get to put all that tinkering to good
              use.
            </motion.p>
            <motion.p
              className="text-base dark:text-zinc-300 font-sans"
              variants={item}
            >
              My passion for cybersecurity and computer science keeps me busy,
              but I&apos;ve also been diving deep into OSINT, full stack
              development with React & Next.js, and constantly tinkering with my
              home lab.
            </motion.p>
            <motion.p
              className="text-base dark:text-zinc-300 font-sans"
              variants={item}
            >
              <PersonalInterests
                music={props.music}
                books={props.books}
                games={props.steam.games}
              />
            </motion.p>
            <motion.p
              className="text-base dark:text-zinc-300 font-sans"
              variants={item}
            >
              One of my favorite things about the internet is how it connects
              people from all over the world. Feel free to reach out if
              you&apos;d like to chat! My Discord is{" "}
              <span className="font-serif italic text-sm">@lafond</span> -
              I&apos;m currently <Status status={status} />.
            </motion.p>
            <motion.div variants={item} className="flex flex-col gap-2">
              <motion.p className="text-base dark:text-zinc-300 font-sans">
                You can also find me scattered across the internet here:
              </motion.p>
              <motion.div variants={item} className="flex gap-4">
                <StyledLink
                  href="https://github.com/jacc"
                  intent="social"
                  icon={GithubIcon}
                  ariaLabel="Visit my GitHub profile"
                >
                  GitHub
                </StyledLink>
                <StyledLink
                  href="https://www.x.com/1afond"
                  icon={Twitter}
                  intent="social"
                  ariaLabel="Visit my Twitter profile"
                >
                  Twitter
                </StyledLink>
                <StyledLink
                  href="https://www.linkedin.com/in/jacklafond/"
                  icon={Linkedin}
                  intent="social"
                  ariaLabel="Visit my LinkedIn profile"
                >
                  LinkedIn
                </StyledLink>
              </motion.div>
            </motion.div>
            <Footer status={status} weather={props.weather} />
          </motion.div>
        </motion.div>
      </PageLayout>
    </>
  );
}
