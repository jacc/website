import { env } from "@/utilities/env";

export type HardcoverBook = {
  title: string;
  slug: string;
  link: string;
  authors: string[];
  progress: number;
};

export type HardcoverBookResponse = {
  data: {
    me: Array<{
      user_books: Array<{
        book: {
          title: string;
          slug: string;
          contributions: Array<{
            author: {
              name: string;
            };
          }>;
        };
        user_book_reads: Array<{
          progress: number;
        }>;
      }>;
    }>;
  };
};

export async function fetchBooks(): Promise<HardcoverBook[]> {
  const query = `
    query MyQuery {
      me {
        user_books(where: {user_book_status: {id: {_eq: 2}}}) {
          book {
            title
            slug
            contributions {
              author {
                name
              }
            }
          }
          user_book_reads {
            progress
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.hardcover.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.HARDCOVER_API_TOKEN}`,
    },
    body: JSON.stringify({ query, operationName: "MyQuery" }),
  });

  const result = await response.json();
  const me = result?.data?.me?.[0];
  if (!me) return [];

  // jesus
  return me.user_books.map(
    (ub: HardcoverBookResponse["data"]["me"][0]["user_books"][0]) => ({
      title: ub.book.title,
      link: `https://hardcover.app/books/${ub.book.slug}`,
      authors: ub.book.contributions.map(
        (
          c: HardcoverBookResponse["data"]["me"][0]["user_books"][0]["book"]["contributions"][0]
        ) => c.author.name
      ),
      progress: ub.user_book_reads?.[0]?.progress
        ? Math.round(ub.user_book_reads[0].progress)
        : 0,
    })
  );
}
