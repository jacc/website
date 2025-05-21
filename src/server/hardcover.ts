import { env } from "@/utilities/env";

export type HardcoverBook = {
  title: string;
  author: string;
  coverUrl: string | null;
  status: "reading" | "completed";
  startedDate: string;
  completedDate?: string;
  rating?: number;
  review?: string;
  link: string;
  progress?: number;
  authors?: string[];
};

export type HardcoverBookResponse = {
  data: {
    me: Array<{
      user_books: Array<{
        book: {
          title: string;
          slug: string;
          image?: {
            url: string;
          };
          contributions: Array<{
            author: {
              name: string;
            };
          }>;
        };
        rating?: number;
        updated_at: string;
        user_book_reads?: Array<{
          progress: number;
        }>;
      }>;
    }>;
  };
};

export async function getCurrentlyReading(): Promise<HardcoverBook[]> {
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

export async function getCompletedBooks(): Promise<HardcoverBook[]> {
  const query = `
    query GetReadBooks {
      me {
        user_books(where: {user_book_status: {id: {_eq: 3}}}) {
          book {
            title
            slug
            image {
              url
            }
            contributions {
              author {
                name
              }
            }
          }
          rating
          updated_at
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
    body: JSON.stringify({ query, operationName: "GetReadBooks" }),
  });

  const result = await response.json();
  const me = result?.data?.me?.[0];
  if (!me) return [];

  return me.user_books.map(
    (ub: HardcoverBookResponse["data"]["me"][0]["user_books"][0]) => ({
      title: ub.book.title,
      author: ub.book.contributions[0]?.author.name || "Unknown Author",
      coverUrl: ub.book.image?.url || null,
      status: "completed" as const,
      startedDate: ub.updated_at,
      completedDate: ub.updated_at,
      rating: ub.rating || undefined,
      link: `https://hardcover.app/books/${ub.book.slug}/reviews/@reading`,
    })
  );
}
