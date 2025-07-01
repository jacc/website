import React from "react";
import StyledLink from "./StyledLink";

type PersonalInterestsProps = {
  music: Array<[string, string]>;
  spotify?: {
    song: string;
    artist: string;
    album: string;
    album_art_url: string | null;
  } | null;
};

const PersonalInterests: React.FC<PersonalInterestsProps> = ({
  music,
  spotify,
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
  const isListeningToSpotify = spotify !== null && spotify !== undefined;

  // Music section
  const musicElements = isListeningToSpotify ? (
    <React.Fragment>
      You actually caught me listening to{" "}
      <StyledLink
        href={`https://open.spotify.com/search/${encodeURIComponent(
          spotify.song
        )}`}
      >
        {spotify.song}
      </StyledLink>{" "}
      by {spotify.artist} right now!
    </React.Fragment>
  ) : hasMusicContent ? (
    <>
      Music is one of my favorite things, and I&apos;ve been listening to a lot
      of{" "}
      {formatList(
        music.map(([artist, url]) => (
          <StyledLink key={url} href={url}>
            {artist}
          </StyledLink>
        ))
      )}{" "}
      recently.
    </>
  ) : (
    "I listen to a lot of music, though I&apos;m taking a break from my usual playlists at the moment"
  );

  if (!hasMusicContent && !isListeningToSpotify) {
    return (
      <span>
        I listen to a lot of music, though I&apos;m taking a break from my usual
        playlists at the moment. Beyond the digital realm, I enjoy music,
        reading, and gaming. If you want to learn more about what I&apos;ve been
        into lately, I have more details on my{" "}
        <StyledLink href="/shelf">digital shelf</StyledLink>.
      </span>
    );
  }

  return (
    <span>
      {musicElements} Beyond the digital realm, I enjoy music, reading, and
      gaming. If you want to learn more about what I&apos;ve been into lately, I
      have more details on my{" "}
      <StyledLink href="/shelf">digital shelf</StyledLink>.
    </span>
  );
};

export default PersonalInterests;
