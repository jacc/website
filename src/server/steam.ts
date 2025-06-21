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
    const urlMap: Record<number, string> = {};

    for (const appid of appids) {
      try {
        const gridData = await fetch(
          `https://www.steamgriddb.com/api/v2/grids/steam/${appid}?limit=1`,
          {
            headers: {
              Authorization: `Bearer ${env.STEAMGRID_API_KEY}`,
            },
          }
        );
        const gridJson = await gridData.json();

        if (
          gridJson.success &&
          gridJson.data &&
          Array.isArray(gridJson.data) &&
          gridJson.data.length > 0
        ) {
          urlMap[appid] = gridJson.data[0].url;
        }
      } catch (error) {
        console.error(`Error fetching grid for appid ${appid}:`, error);
      }
    }

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
      playtime_2weeks: game.playtime_2weeks,
      playtime_forever: game.playtime_forever,
      img_icon_url: game.img_icon_url,
    };
  });

  const gridUrls = await getSteamGridUrls(
    games.map((game: { appid: number }) => game.appid)
  );

  const gamesWithGrids = games.map((game: SteamGame) => ({
    ...game,
    gridUrl: gridUrls[game.appid] || null,
  }));

  const totalPlaytime = games.reduce(
    (accumulator: number, game: SteamGame) =>
      accumulator + Math.floor(game.playtime_2weeks / 60),
    0
  );

  return { games: gamesWithGrids, totalPlaytime };
}
