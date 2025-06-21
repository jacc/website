import { env } from "@/utilities/env";

interface PlausibleViewsCache {
  [slug: string]: number;
}

// Cache to avoid duplicate API calls during the same build
const viewsCache: PlausibleViewsCache = {};

export async function getPlausibleViews(slug: string): Promise<number> {
  // Check cache first
  if (viewsCache[slug] !== undefined) {
    return viewsCache[slug];
  }

  let views = 0;
  try {
    const url = `https://${
      env.PLAUSIBLE_URL
    }/api/v1/stats/aggregate?site_id=jack.bio&period=custom&date=2023-01-01,${
      new Date().toISOString().split("T")[0]
    }&filters=event:page==/blog/${slug}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${env.PLAUSIBLE_API_KEY}`,
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });
    const data = await response.json();
    views = data?.results?.visitors?.value ?? 0;
  } catch (error) {
    console.error(`Error fetching views for ${slug}:`, error);
    views = 0;
  }

  // Cache the result
  viewsCache[slug] = views;
  return views;
}

export async function getPlausibleViewsForMultipleSlugs(
  slugs: string[]
): Promise<Record<string, number>> {
  const results: Record<string, number> = {};

  // Fetch views for all slugs in parallel
  await Promise.all(
    slugs.map(async (slug) => {
      results[slug] = await getPlausibleViews(slug);
    })
  );

  return results;
}
