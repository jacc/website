import React from "react";
import { HardcoverBook } from "@/server/hardcover";
import StyledLink from "./StyledLink";

type KindleBooksProps = {
  books: HardcoverBook[];
};

const getProgressDescription = (progress: number): string => {
  if (progress <= 25) return "just starting";
  if (progress <= 50) return "a quarter of the way through";
  if (progress <= 75) return "halfway through";
  if (progress <= 90) return "almost done with";
  return "nearly finished with";
};

const KindleBooks: React.FC<KindleBooksProps> = ({ books }) => {
  const introText =
    "I've been reading a lot, but only after I jailbroke my Kindle. Currently, I'm ";
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

  const displayBooks = books.slice(0, 2);

  const bookElements = displayBooks.map((book) => (
    <>
      {book.progress !== undefined &&
        `${getProgressDescription(book.progress)} `}
      <StyledLink key={book.title} href={book.link}>
        <span className="italic font-serif text-sm pr-0.5">{book.title}</span>
      </StyledLink>
      &nbsp;by&nbsp;
      {book.authors && book.authors.join(", ")}
    </>
  ));

  return (
    <>
      {introText}
      {bookElements.map((element, index) => (
        <React.Fragment key={displayBooks[index].title}>
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
