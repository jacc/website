import { useCallback, useEffect, useState } from "react";
import { ALL_ACHIEVEMENTS, AchievementId } from "@/lib/achievements";
import { toast } from "@/components/toast";

const STORAGE_KEY = "user_achievements";

type AchievementUnlocks = Partial<Record<AchievementId, string>>;

function getStoredAchievements(): AchievementUnlocks {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    ) as AchievementUnlocks;
  } catch {
    return {};
  }
}

export function useAchievements() {
  const [unlocked, setUnlocked] = useState<AchievementUnlocks>({});

  useEffect(() => {
    setUnlocked(getStoredAchievements());
  }, []);

  const unlock = useCallback(
    (id: AchievementId) => {
      if (!unlocked[id]) {
        const now = new Date().toISOString();
        const updated = { ...unlocked, [id]: now };
        setUnlocked(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        const achievement = ALL_ACHIEVEMENTS.find((a) => a.id === id);
        if (achievement) {
          toast({
            title: `Achievement Unlocked: ${achievement.name}`,
            description: achievement.description,
            intent: "success",
          });
        }
      }
    },
    [unlocked]
  );

  const unlockedAchievements = ALL_ACHIEVEMENTS.filter(
    (a) => unlocked[a.id]
  ).map((a) => ({ ...a, unlockedAt: unlocked[a.id] }));

  const lockedAchievements = ALL_ACHIEVEMENTS.filter((a) => !unlocked[a.id]);

  return {
    unlockedAchievements, // now includes unlockedAt
    lockedAchievements,
    unlock,
    hasAchievement: (id: AchievementId) => Boolean(unlocked[id]),
  };
}
