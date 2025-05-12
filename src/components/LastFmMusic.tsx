import React from "react";

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
    <a
      key={url}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 decoration-zinc-500/50"
    >
      {artist}
    </a>
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
