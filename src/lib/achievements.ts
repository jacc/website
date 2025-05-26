export type AchievementId = "first_visit" | "first_blog_read";

export interface Achievement {
  id: AchievementId;
  name: string;
  description: string;
}

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_visit",
    name: "First Visit",
    description: "You visited the site for the first time!",
  },
  {
    id: "first_blog_read",
    name: "Bookworm",
    description: "You read your first blog post.",
  },
];
