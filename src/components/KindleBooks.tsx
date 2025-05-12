import React from "react";
import { HardcoverBook } from "@/server/hardcover";

type KindleBooksProps = {
  books: HardcoverBook[];
};

const KindleBooks: React.FC<KindleBooksProps> = ({ books }) => {
  const introText =
    "I've been reading a lot, but only after I jailbroke my Kindle. I'm currently ";
  const fallbackText = "not reading anything right now";
  const outroText = ".";

  if (!books || books.length === 0) {
    return (
      <>
        {introText}
        <span>{fallbackText}</span>
        {outroText}
      </>
    );
  }

  const bookElements = books.map((book) => (
    <span key={book.title}>
      <a
        href={book.link}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        {book.progress}% of the way through{" "}
        <span className="italic font-serif text-sm underline underline-offset-2 decoration-zinc-500/50 pr-0.5">
          {book.title}
        </span>
        &nbsp;by&nbsp;
        {book.authors.join(", ")}
      </a>
    </span>
  ));

  return (
    <>
      {introText}
      {bookElements.map((element, index) => (
        <React.Fragment key={books[index].title}>
          {" "}
          {element}
          {index < bookElements.length - 1 &&
            (index === bookElements.length - 2 ? " and " : ", ")}
        </React.Fragment>
      ))}
      {outroText}
    </>
  );
};

export default KindleBooks;
