import React from "react";
import { HardcoverBook } from "@/server/hardcover";
import StyledLink from "./StyledLink";

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
    <>
      {book.progress}% of the way through{" "}
      <StyledLink key={book.title} href={book.link}>
        <span className="italic font-serif text-sm pr-0.5">{book.title}</span>
      </StyledLink>
      &nbsp;by&nbsp;
      {book.authors.join(", ")}
    </>
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
