import PageLayout from "@/components/PageLayout";
import { getLetterboxdMovies } from "@/server/letterboxd";
import { getBooks } from "@/server/books";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

interface Movie {
  title: string;
  link: string;
  watchedDate: string;
  rating: number | null;
  review: string | null;
  posterUrl: string | null;
  year: number;
  isRewatch: boolean;
}

interface Book {
  title: string;
  author: string;
  coverUrl: string | null;
  status: "reading" | "completed";
  startedDate: string;
  completedDate?: string;
  rating?: number;
  review?: string;
}

type Props = {
  movies: Movie[];
  books: Book[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const movies = await getLetterboxdMovies();
  const books = getBooks();

  return {
    props: {
      movies,
      books,
    },
    revalidate: 10,
  };
};

export default function Shelf(props: Props) {
  const currentlyReading = props.books.filter(
    (book) => book.status === "reading"
  );

  // Combine all media items
  const allMedia = [
    ...currentlyReading.map((book) => ({
      ...book,
      type: "book" as const,
      date: book.startedDate,
      isCurrentlyReading: true,
    })),
    ...props.books
      .filter((book) => book.status === "completed")
      .map((book) => ({
        ...book,
        type: "book" as const,
        date: book.completedDate || book.startedDate,
        isCurrentlyReading: false,
      })),
    ...props.movies.map((movie) => ({
      ...movie,
      type: "movie" as const,
      date: movie.watchedDate,
      isCurrentlyReading: false,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <PageLayout>
      <h1 className="text-2xl font-serif font-bold mb-12">My Digital Shelf</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allMedia.map((item) => (
          <Link
            key={`${item.type}-${item.title}`}
            href={item.type === "movie" ? item.link : "#"} // Replace '#' with actual book review link when available
            className={`relative aspect-[2/3] rounded-lg overflow-hidden hover:opacity-90 transition-opacity ${
              item.isCurrentlyReading ? "ring-2 ring-blue-500" : ""
            }`}
          >
            {(item.type === "movie" ? item.posterUrl : item.coverUrl) && (
              <Image
                src={item.type === "movie" ? item.posterUrl! : item.coverUrl!}
                alt={item.title}
                fill
                className="object-cover"
              />
            )}
            {(item.rating || (item.type === "movie" && item.rating)) && (
              <div className="absolute top-2 right-2 bg-[#FAFAFA] border border-zinc-500/50 text-[#525252] text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                {item.rating} ⭐
              </div>
            )}
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
