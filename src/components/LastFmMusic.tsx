import React from "react";
import StyledLink from "./StyledLink";

type LastFmMusicProps = {
  music: Array<[string, string]>;
};

const LastFmMusic: React.FC<LastFmMusicProps> = ({ music }) => {
  const introText = "I've been really into ";
  const fallbackText = "nothing in particular";
  const outroText = ".";

  if (!music || music.length === 0) {
    return (
      <>
        {introText}
        <span>{fallbackText}</span>
        {outroText}
      </>
    );
  }

  const musicElements = music.map(([artist, url]) => (
    <StyledLink key={url} href={url}>
      {artist}
    </StyledLink>
  ));

  return (
    <>
      {introText}
      {musicElements.map((element, index) => (
        <React.Fragment key={music[index][1]}>
          {" "}
          {element}
          {index < musicElements.length - 1 &&
            (index === musicElements.length - 2 ? " and " : ", ")}
        </React.Fragment>
      ))}
      {outroText}
    </>
  );
};

export default LastFmMusic;
