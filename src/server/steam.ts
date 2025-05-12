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
}

export type SteamRecentGamesResponse = {
  games: SteamGame[];
  totalPlaytime: number;
};

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
    };
  });

  const totalPlaytime = games.reduce(
    (accumulator: number, game: { playtime: number }) =>
      accumulator + game.playtime,
    0
  );

  return { games, totalPlaytime };
}
