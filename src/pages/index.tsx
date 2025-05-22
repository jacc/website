import Image from "next/image";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import { group, item } from "@/utilities/constants";
import { getStatusColor, Status } from "@/components/DiscordStatus";
import { getSteamRecentGames, SteamRecentGamesResponse } from "@/server/steam";
import { getMusic } from "@/server/lastfm";
import { getCurrentlyReading, HardcoverBook } from "@/server/hardcover";
import SteamGames from "../components/SteamGames";
import KindleBooks from "../components/KindleBooks";
import LastFmMusic from "../components/LastFmMusic";
import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";
import clsx from "clsx";
import { useLanyardWS } from "use-lanyard";
import { GithubIcon, Linkedin } from "lucide-react";
import StyledLink from "@/components/StyledLink";

type Props = {
  steam: SteamRecentGamesResponse;
  music: Array<[string, string]>;
  books: HardcoverBook[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const steam = await getSteamRecentGames();
  const music = await getMusic();
  const books = await getCurrentlyReading();

  return {
    props: {
      steam,
      music,
      books,
    },
    revalidate: 3600,
  };
};

export default function Home(props: Props) {
  // The variable is hardcoded due to a server validated env variable not being available on the client.
  const lanyard = useLanyardWS("657057112593268756");
  const status = lanyard?.discord_status || "offline";

  return (
    <PageLayout>
      <motion.div variants={group}>
        <motion.div variants={item} className="flex flex-col gap-4 mb-4">
          <div className="sticky shrink-0">
            <Image
              src="https://avatars.githubusercontent.com/u/6956351?v=4"
              alt="logo"
              width={75}
              height={75}
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
            Hi! I&apos;m Jack. I&apos;ve been called many things in my life, but
            at heart I&apos;ve always enjoyed being called a breaker. I&apos;m a
            recent cybersecurity graduate from the University of Tampa (and
            enjoyed it so much, I&apos;m also pursuing an MBA).
          </motion.p>
          <motion.p
            className="text-base dark:text-zinc-300 font-sans"
            variants={item}
          >
            I&apos;ve spent the last decade of my life learning how to build,
            break and bother digital systems. That&apos;s lead to some pretty
            cool experiences. Some personal favorites include: reversing Life360
            and going viral for it, placing first in a global competition for
            contributing to missing person cases, writing software used by tens
            of thousands of people monthly, and getting a cease and desist from
            beloved breakfast restaurant chain, Waffle House.
          </motion.p>
          <motion.p
            className="text-base dark:text-zinc-300 font-sans"
            variants={item}
          >
            I&apos;m currently working at Security Innovation as a Security
            Engineer Intern.
          </motion.p>
          <motion.p
            className="text-base dark:text-zinc-300 font-sans"
            variants={item}
          >
            I&apos;m very interested in cybersecurity and computer science
            (duh). Outside of that, I&apos;ve been enjoying diving deep on
            OSINT, full stack development using React & Next.js, and always
            keeping busy with my home lab.
          </motion.p>
          <motion.p
            className="text-base dark:text-zinc-300 font-sans"
            variants={item}
          >
            Outside of technology, I&apos;m a huge music fan - recently,{" "}
            <LastFmMusic music={props.music} />{" "}
            <KindleBooks books={props.books} />{" "}
            <SteamGames games={props.steam.games} />
          </motion.p>
          <motion.p
            className="text-base dark:text-zinc-300 font-sans"
            variants={item}
          >
            One of the best parts of the internet has been connecting with
            people from all over the world. Please reach out if you&apos;d like
            to chat! My Discord is{" "}
            <span className="font-serif italic text-sm">@lafond</span> -
            I&apos;m currently <Status status={status} />.
          </motion.p>
          <motion.div variants={item} className="flex flex-col gap-2">
            <p className="text-base dark:text-zinc-300 font-sans">
              Other than that, I&apos;m scattered across the internet. Find me
              here:
            </p>
            <div className="flex gap-4">
              <StyledLink
                href="https://github.com/jacc"
                intent="social"
                isAnimated
                animationVariants={item}
                icon={GithubIcon}
                ariaLabel="Visit my GitHub profile"
              >
                GitHub
              </StyledLink>
              <StyledLink
                href="https://www.linkedin.com/in/jacklafond/"
                icon={Linkedin}
                intent="social"
                isAnimated
                animationVariants={item}
                ariaLabel="Visit my LinkedIn profile"
              >
                LinkedIn
              </StyledLink>
            </div>
          </motion.div>
          <Footer status={status} />
        </motion.div>
      </motion.div>
    </PageLayout>
  );
}
