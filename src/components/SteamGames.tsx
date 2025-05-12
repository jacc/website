import Link from "next/link";
import { SteamGame } from "@/server/steam";
import React from "react";

type SteamGamesProps = {
  games: SteamGame[];
};

const SteamGames: React.FC<SteamGamesProps> = ({ games }) => {
  const introText = "I've also been playing a lot of ";
  const fallbackText = "nothing recently";
  const outroText = ".";

  if (!games || games.length === 0) {
    return (
      <>
        {introText}
        <span>{fallbackText}</span>
        {outroText}
      </>
    );
  }

  const gameElements = games.map((game) => (
    <Link
      key={game.appid}
      href="/shelf"
      className="underline underline-offset-2 decoration-zinc-500/50 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
    >
      {game.name}
    </Link>
  ));

  return (
    <>
      {introText}
      {gameElements.map((element, index) => (
        <React.Fragment key={games[index].appid}>
          {" "}
          {element}
          {index < gameElements.length - 1 &&
            (index === gameElements.length - 2 ? " and " : ", ")}
        </React.Fragment>
      ))}
      {outroText}
    </>
  );
};

export default SteamGames;
