import { env } from "@/utilities/env";

export interface SteamGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
  gridUrl?: string;
}

export type SteamRecentGamesResponse = {
  games: SteamGame[];
  totalPlaytime: number;
};

async function getSteamGridUrls(
  appids: number[]
): Promise<Record<number, string>> {
  try {
    const gridData = await fetch(
      `https://www.steamgriddb.com/api/v2/grids/steam/${appids.join(
        ","
      )}?limit=1`,
      {
        headers: {
          Authorization: `Bearer ${env.STEAMGRID_API_KEY}`,
        },
      }
    );
    const gridJson = await gridData.json();

    const urlMap: Record<number, string> = {};
    gridJson.data.forEach(
      (item: { data: { url: string }[] }, index: number) => {
        if (item.data && item.data.length > 0) {
          urlMap[appids[index]] = item.data[0].url;
        }
      }
    );

    return urlMap;
  } catch (error) {
    console.error("Error fetching SteamGridDB data:", error);
    return {};
  }
}

export async function getSteamRecentGames(): Promise<SteamRecentGamesResponse> {
  const response = await fetch(
    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${env.STEAM_ID}`
  );

  const json = await response.json();

  const games = json.response.games.map((game: SteamGame) => {
    return {
      appid: game.appid,
      name: game.name,
      playtime: Math.floor(game.playtime_2weeks / 60),
      img_icon_url: game.img_icon_url,
    };
  });

  // Get SteamGridDB URLs for all games
  const gridUrls = await getSteamGridUrls(
    games.map((game: { appid: number }) => game.appid)
  );

  // Add grid URLs to games
  const gamesWithGrids = games.map((game: { appid: number }) => ({
    ...game,
    gridUrl: gridUrls[game.appid],
  }));

  const totalPlaytime = games.reduce(
    (accumulator: number, game: { playtime: number }) =>
      accumulator + game.playtime,
    0
  );

  return { games: gamesWithGrids, totalPlaytime };
}
