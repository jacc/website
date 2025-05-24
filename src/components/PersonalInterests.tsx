import React from "react";
import { SteamGame } from "@/server/steam";
import { HardcoverBook } from "@/server/hardcover";
import StyledLink from "./StyledLink";

type PersonalInterestsProps = {
  music: Array<[string, string]>;
  books: HardcoverBook[];
  games: SteamGame[];
};

const getProgressDescription = (progress: number): string => {
  if (progress <= 25) return "just starting";
  if (progress <= 50) return "a quarter of the way through";
  if (progress <= 75) return "halfway through";
  if (progress <= 90) return "almost done with";
  return "nearly finished with";
};

const PersonalInterests: React.FC<PersonalInterestsProps> = ({
  music,
  books,
  games,
}) => {
  const formatList = (elements: React.ReactNode[]): React.ReactNode => {
    return elements.map((element, index) => (
      <React.Fragment key={index}>
        {index > 0 && (index === elements.length - 1 ? " and " : ", ")}
        {element}
      </React.Fragment>
    ));
  };

  const hasMusicContent = music && music.length > 0;
  const hasBookContent = books && books.length > 0;
  const hasGameContent = games && games.length > 0;

  // Music section
  const musicElements = hasMusicContent
    ? formatList(
        music.map(([artist, url]) => (
          <StyledLink key={url} href={url}>
            {artist}
          </StyledLink>
        ))
      )
    : "nothing specific";

  // Books section
  const bookElements =
    hasBookContent && books[0] ? (
      <React.Fragment>
        <StyledLink href={books[0].link}>
          <span className="italic font-serif text-sm pr-0.5">
            {books[0].title}
          </span>
        </StyledLink>
        {books[0].authors && ` by ${books[0].authors.join(", ")}`}
      </React.Fragment>
    ) : (
      "taking a break from reading"
    );

  // Get book progress string
  const bookProgress =
    hasBookContent && books[0]?.progress !== undefined
      ? `I'm ${getProgressDescription(books[0].progress)}`
      : "I'm reading";

  // Games section
  const gameElements = hasGameContent
    ? formatList(
        games.slice(0, 3).map((game) => (
          <StyledLink key={game.appid} href="/shelf">
            {game.name}
          </StyledLink>
        ))
      )
    : "whatever catches my interest";

  if (!hasMusicContent && !hasBookContent && !hasGameContent) {
    return (
      <span>
        Beyond the digital realm, I enjoy music, reading, and gaming, though
        I&apos;ve not been tracking what I&apos;ve been into lately.
      </span>
    );
  }

  return (
    <span>
      Beyond the digital realm, I&apos;m usually diving into other passions.{" "}
      {hasMusicContent ? (
        <>Lately I&apos;ve been really into {musicElements}.</>
      ) : (
        <>
          Though I&apos;m taking a break from my usual playlists at the moment.
        </>
      )}
      {hasBookContent && (
        <>
          {" "}
          I&apos;ve been reading a lot more since I jailbroke my Kindle.
          Currently {bookProgress} {bookElements}.
        </>
      )}
      {hasGameContent && (
        <>
          {" "}
          {hasBookContent || hasMusicContent ? <>And lately, </> : <>And </>}
          I&apos;ve been playing {gameElements}.
        </>
      )}
    </span>
  );
};

export default PersonalInterests;
