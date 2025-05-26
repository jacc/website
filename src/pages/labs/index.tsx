import { useAchievements } from "@/hooks/useAchievements";
import PageLayout from "@/components/PageLayout";
import { Trophy } from "lucide-react";

export default function LabsPage() {
  const { unlockedAchievements, lockedAchievements } = useAchievements();

  return (
    <PageLayout showBackButton>
      <h1 className="text-2xl font-bold font-serif">LaFond Labs™</h1>
      <p className="">
        LaFond Labs™ is my personal playground for building and experimenting
        with ideas across this site.
      </p>
      <div className="space-y-8">
        {/* Achievements */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Achievements
            </h2>
            <span className="text-sm">
              {unlockedAchievements.length} of{" "}
              {unlockedAchievements.length + lockedAchievements.length} unlocked
            </span>
          </div>
          <div className="space-y-2">
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center justify-between py-2 "
              >
                <div>
                  <h3 className="font-bold font-sans">{achievement.name}</h3>
                  <p className="text-sm">{achievement.description}</p>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  {new Date(achievement.unlockedAt!).toLocaleDateString()}
                </div>
              </div>
            ))}
            {unlockedAchievements.length === 0 && (
              <p className="text-gray-500">No achievements unlocked yet!</p>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
