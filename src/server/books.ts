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

// This would typically come from a database or API
// For now, we'll use static data
export const books: Book[] = [
  {
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    coverUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415428227i/20518872.jpg",
    status: "reading",
    startedDate: "2024-03-15",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg",
    status: "completed",
    startedDate: "2024-02-01",
    completedDate: "2024-03-10",
    rating: 5,
  },
  // Add more books as needed
];

export function getBooks(): Book[] {
  return books;
}
