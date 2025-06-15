import { env } from "@/utilities/env";
import { LastFM } from "@/utilities/lastfm";

export async function getMusic() {
  const lfm = new LastFM(env.LAST_FM_API_KEY);
  const artists = await lfm.getTopArtists(env.LAST_FM_USERNAME);
  return artists.slice(0, 3);
}
