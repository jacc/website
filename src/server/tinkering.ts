interface TinkeringProject {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  link?: string;
  links?: { [key: string]: string }[];
  isActive?: boolean;
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
  },
  {
    id: "3",
    title: "stardew.me",
    description:
      "Created a digital shelf to track books and movies I've consumed, with Letterboxd integration.",
    date: "2022-07",
    tags: ["Next.js", "TypeScript"],
    isActive: true,
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
  },
];

export function getTinkeringProjects(): TinkeringProject[] {
  return tinkeringProjects;
}
