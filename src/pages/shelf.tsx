import PageLayout from "@/components/PageLayout";
import { getLetterboxdMovies } from "@/server/letterboxd";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCompletedBooks } from "@/server/hardcover";
import {
  getSteamRecentGames,
  SteamGame as SteamGameType,
} from "@/server/steam";
import SEO from "@/components/SEO";

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
  link: string;
}

type MediaItem = {
  type: "book" | "movie" | "game";
  date: string;
  isCurrentlyReading: boolean;
  title: string;
  coverUrl: string | null;
  link: string;
  rating?: number | null;
  playtime?: number | null;
};

type Props = {
  movies: Movie[];
  books: Book[];
  steamGames: SteamGameType[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const movies = await getLetterboxdMovies();
  const books = await getCompletedBooks();
  const { games: steamGames } = await getSteamRecentGames();

  return {
    props: {
      movies,
      books,
      steamGames,
    },
    revalidate: 10,
  };
};

export default function Shelf(props: Props) {
  const currentlyReading = props.books.filter(
    (book) => book.status === "reading"
  );

  // Combine all media items
  const allMedia: MediaItem[] = [
    ...currentlyReading.map((book) => ({
      type: "book" as const,
      date: book.startedDate,
      isCurrentlyReading: true,
      title: book.title,
      coverUrl: book.coverUrl,
      link: book.link,
      rating: book.rating,
    })),
    ...props.books
      .filter((book) => book.status === "completed")
      .map((book) => ({
        type: "book" as const,
        date: book.completedDate || book.startedDate,
        isCurrentlyReading: false,
        title: book.title,
        coverUrl: book.coverUrl,
        link: book.link,
        rating: book.rating,
      })),
    ...props.movies.map((movie) => ({
      type: "movie" as const,
      date: movie.watchedDate,
      isCurrentlyReading: false,
      title: movie.title,
      coverUrl: movie.posterUrl,
      link: movie.link,
      rating: movie.rating,
    })),
    ...props.steamGames.map((game) => ({
      type: "game" as const,
      date: new Date().toISOString(),
      isCurrentlyReading: false,
      title: game.name,
      coverUrl: game.gridUrl || null,
      link: `https://store.steampowered.com/app/${game.appid}`,
      playtime: Math.floor(game.playtime_2weeks / 60),
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <SEO
        title="Jack LaFond | Digital Shelf"
        description="Explore Jack LaFond's digital shelf: games, books, and more."
      />
      <PageLayout showBackButton={true}>
        <h1 className="text-2xl font-bold font-serif">
          Jack&apos;s Digital Shelf
        </h1>
        <p className="text-base dark:text-zinc-300 font-sans">
          By nature, humans are social creatures. We crave connection, and one
          of the most popular ways to share connection is through a love of
          films, literature, and music. Below are some things I&apos;ve played,
          read, and watched recently.
        </p>
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
          {allMedia.map((item, index) => (
            <Link
              key={`${item.type}-${item.title}`}
              href={item.link}
              className={`relative aspect-[2/3] rounded-lg overflow-hidden hover:opacity-90 transition-opacity ${
                item.isCurrentlyReading
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : ""
              }`}
              target={item.link.startsWith("http") ? "_blank" : undefined}
              rel={
                item.link.startsWith("http") ? "noopener noreferrer" : undefined
              }
            >
              {item.coverUrl && (
                <Image
                  src={item.coverUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
                  priority={index === 0}
                  className="object-cover"
                />
              )}
              {item.rating && (
                <div className="absolute top-2 right-2 bg-[#FAFAFA] border border-zinc-500/50 text-[#525252] text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  {item.rating} ⭐
                </div>
              )}
            </Link>
          ))}
        </div>
      </PageLayout>
    </>
  );
}
