interface TinkeringProject {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  link?: string;
  links?: { [key: string]: string }[];
  isActive?: boolean;
  isAbandoned?: boolean;
}

export const tinkeringProjects: TinkeringProject[] = [
  {
    id: "1",
    title: "Digital Shelf",
    description:
      "This website. Built with Next.js, Tailwind CSS, and TypeScript. Uses integrations for Last.fm, Letterboxd, and more.",
    date: "2025-05",
    tags: ["Next.js", "TypeScript", "API Reversing"],
    isActive: true,
  },
  {
    id: "2",
    title: "stardew.app",
    description:
      "Stardew Valley companion app, built with Next.js, TypeScript, and Tailwind CSS. Used by 30,000+ users a month",
    date: "2022-07",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    isActive: true,
    link: "https://stardew.app",
    links: [
      {
        GitHub: "https://github.com/communitycenter/stardew.app",
      },
    ],
  },
  {
    id: "3",
    title: "stardew.me",
    description: "Stardew Valley avatar generator. ",
    date: "2022-07",
    tags: ["Next.js", "TypeScript", "Python", "XML"],
    isActive: true,
    link: "https://stardew.me",
    links: [
      {
        GitHub: "https://github.com/communitycenter/stardew.me",
      },
    ],
  },
  {
    id: "4",
    title: "Stats360",
    description:
      "Web dashboard for Life360, a GPS tracking app. Went viral on TikTok with over 100,000 users.",
    date: "2022-03",
    tags: ["Next.js", "TypeScript", "API Reversing"],
    links: [
      {
        "Blog Post": "/blog/life360",
      },
    ],
  },
  {
    id: "5",
    title: "RecipeBot",
    description:
      "AI-powered recipe generator powered by Instagram and TikTok captions, utilizing a custom implemented scraper for social media platforms.",
    date: "2024-08",
    tags: ["Next.js", "TypeScript", "AI", "Web Scraping", "Redis"],
  },
  {
    id: "6",
    title: "CertCertCert (cert3)",
    description:
      "Cybersecurity certificate studying platform, integrating AI-powered flashcards and quizzes.",
    date: "2024-05",
    tags: ["Next.js", "TypeScript", "AI"],
  },
  {
    id: "7",
    title: "tunes.ninja",
    description:
      "Discord bot bridging the gap between music streaming services. Created synced playlists through Discord, get links to all platforms a song is on, and more.",
    date: "2021-10",
    tags: ["TypeScript", "Discord.js"],
    links: [
      {
        GitHub: "https://github.com/jacc/tunes.ninja",
      },
    ],
    isAbandoned: true,
  },
  {
    id: "8",
    title: "Librarian (WIP)",
    description:
      "Scraper for popular ePub files, allowing you to download and send them to your Kindle.",
    date: "2025-05",
    tags: ["Next.js", "TypeScript", "SMTP", "Web Scraping"],
  },
  {
    id: "9",
    title: "Magic Terms for Obsidian",
    description:
      "Plugin for Obsidian, a note-taking app. Adds functionality via plugin that allows you to create flashcards from your notes using AI.",
    date: "2025-02",
    tags: ["TypeScript", "AI"],
  },
  {
    id: "10",
    title: "music-box",
    description:
      "Last.fm integration for GitHub profiles. Winner of the 2019 GitHub #PinsToWin contest.",
    date: "2019-08",
    tags: ["TypeScript"],
    link: "https://github.com/jacc/music-box",
    links: [
      {
        "GitHub blog post":
          "https://github.blog/developer-skills/career-growth/pins-to-win-stunning-student-profiles/#:~:text=Jack%20wrote%20music%2Dbox%2C%20combining%20the%20Last.fm%20API%20with%20a%20gist%20updater%2C%20to%20show%20off%20his%20music%20listening%20habits%20on%20his%20profile.%20As%20Jack%20put%20it%2C%20%E2%80%9CWhat%20better%20way%20to%20get%20to%20know%20someone%20than%20to%20express%20your%20interest%20in%20music?%E2%80%9D",
      },
    ],
  },
  {
    id: "11",
    title: "Waffle House Index",
    description:
      "A ficticious replica of FEMA's index of open and closed Waffle House locations across the United States, built during hurricane season.",
    date: "2024-09",
    tags: ["Next.js", "TypeScript"],
    links: [
      {
        "How it works (YouTube)": "https://www.youtube.com/watch?v=TBrR3AEutsI",
      },
    ],
  },
  {
    id: "12",
    title: "Satellite",
    description:
      "Commerically sold Discord bot used to send 1,500,000+ webhook messages in item reselling groups.",
    date: "2020-08",
    tags: ["Python", "API"],
    isAbandoned: true,
  },
  {
    id: "13",
    title: "Project Watchdog",
    description:
      "Custom developed Discord bot used to scrape eBay listings and correlate them with a database of users.",
    date: "2020-09",
    tags: ["Python", "Web Scraping"],
    isAbandoned: true,
  },
  {
    id: "14",
    title: "Wiivamp",
    description:
      "iOS jailbreaking tweak used to play Wii channel music while using the device.",
    date: "2020-02",
    tags: ["iOS"],
    isAbandoned: true,
  },
  {
    id: "15",
    title: "Number Geek",
    description:
      "Google Assistant action used to answer questions about numbers.",
    date: "2017-12",
    tags: ["Google Assistant", "Node.js"],
    isAbandoned: true,
  },
];

export function getTinkeringProjects(): TinkeringProject[] {
  return tinkeringProjects;
}
