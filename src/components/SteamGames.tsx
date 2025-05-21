import Link from "next/link";
import { SteamGame } from "@/server/steam";
import React from "react";
import StyledLink from "./StyledLink";

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
    <Link key={game.appid} href="/shelf" passHref>
      <StyledLink>{game.name}</StyledLink>
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
