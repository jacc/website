import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch("https://letterboxd.com/jlaf/rss/");
    const data = await response.text();

    // Set cache headers - cache for 1 hour
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );
    res.status(200).send(data);
  } catch (error) {
    console.error("Error fetching Letterboxd data:", error);
    res.status(500).json({ error: "Failed to fetch Letterboxd data" });
  }
}
