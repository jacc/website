import { XMLParser } from "fast-xml-parser";

interface LetterboxdMovie {
  title: string;
  link: string;
  watchedDate: string;
  rating: number | null;
  review: string | null;
  posterUrl: string | null;
  year: number;
  isRewatch: boolean;
}

interface LetterboxdRSSItem {
  title: string;
  link: string;
  guid: { "@_isPermaLink": string; "#text": string };
  pubDate: string;
  "letterboxd:watchedDate"?: string;
  "letterboxd:rewatch"?: string;
  "letterboxd:filmTitle"?: string;
  "letterboxd:filmYear"?: string;
  "letterboxd:memberRating"?: string;
  description?: string;
  "dc:creator": string;
}

export async function getLetterboxdMovies(): Promise<LetterboxdMovie[]> {
  try {
    const response = await fetch("https://letterboxd.com/jlaf/rss/", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    const xmlData = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      textNodeName: "#text",
    });

    const result = parser.parse(xmlData);

    const items = result.rss.channel.item as LetterboxdRSSItem[];

    return items
      .filter((item) => item["letterboxd:filmTitle"])
      .map((item) => {
        const description = item.description || "";

        const posterMatch = description.match(/<img src="([^"]+)"/);
        const posterUrl = posterMatch ? posterMatch[1] : null;

        const reviewMatch = description.match(/<p>([^<]+)<\/p>/);
        const review =
          reviewMatch && !reviewMatch[1].startsWith("Watched on")
            ? reviewMatch[1]
            : null;

        return {
          title: item["letterboxd:filmTitle"]!,
          link: item.link,
          watchedDate: item["letterboxd:watchedDate"]!,
          rating: item["letterboxd:memberRating"]
            ? parseFloat(item["letterboxd:memberRating"])
            : null,
          review,
          posterUrl,
          year: parseInt(item["letterboxd:filmYear"]!),
          isRewatch: item["letterboxd:rewatch"] === "Yes",
        };
      })
      .sort(
        (a: LetterboxdMovie, b: LetterboxdMovie) =>
          new Date(b.watchedDate).getTime() - new Date(a.watchedDate).getTime()
      );
  } catch (error) {
    console.error("Error fetching Letterboxd data:", error);
    return [];
  }
}
