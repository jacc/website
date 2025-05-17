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
      "Created a digital shelf to track books and movies I've consumed, with Letterboxd integration.",
    date: "2025-03-20",
    tags: ["Next.js", "TypeScript", "Letterboxd API"],
    isActive: true,
  },
  {
    id: "2",
    title: "stardew.app",
    description:
      "Created a digital shelf to track books and movies I've consumed, with Letterboxd integration.",
    date: "2022-07",
    tags: ["Next.js", "TypeScript"],
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
    description:
      "Created a digital shelf to track books and movies I've consumed, with Letterboxd integration.",
    date: "2022-07",
    tags: ["Next.js", "TypeScript"],
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
      "Created a digital shelf to track books and movies I've consumed, with Letterboxd integration.",
    date: "2022-03",
    tags: ["Next.js", "TypeScript"],
  },
  {
    id: "5",
    title: "RecipeBot",
    description:
      "Created a digital shelf to track books and movies I've consumed, with Letterboxd integration.",
    date: "2024-08",
    tags: ["Next.js", "TypeScript"],
  },
  {
    id: "6",
    title: "CertCertCert (cert3)",
    description:
      "Created a digital shelf to track books and movies I've consumed, with Letterboxd integration.",
    date: "2024-05",
    tags: ["Next.js", "TypeScript"],
  },
  {
    id: "7",
    title: "tunes.ninja",
    description:
      "Created a digital shelf to track books and movies I've consumed, with Letterboxd integration.",
    date: "2021-10",
    tags: ["Next.js", "TypeScript"],
  },
  {
    id: "8",
    title: "Librarian (WIP)",
    description:
      "Created a digital shelf to track books and movies I've consumed, with Letterboxd integration.",
    date: "2025-05",
    tags: ["Next.js", "TypeScript"],
  },
  {
    id: "9",
    title: "Magic Terms for Obsidian",
    description:
      "Created a digital shelf to track books and movies I've consumed, with Letterboxd integration.",
    date: "2025-02",
    tags: ["Next.js", "TypeScript"],
  },
  {
    id: "10",
    title: "music-box",
    description:
      "Created a digital shelf to track books and movies I've consumed, with Letterboxd integration.",
    date: "2019-08",
    tags: ["Next.js", "TypeScript"],
    link: "https://github.com/jacc/music-box",
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
    tags: ["iOS", "jailbreak"],
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
