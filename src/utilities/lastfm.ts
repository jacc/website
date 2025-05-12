export type LastFMParams = { method: string } & Record<string, string>;

export class LastFM {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getTopAlbums(
    user: string,
    period:
      | "overall"
      | "7day"
      | "1month"
      | "3month"
      | "6month"
      | "12month" = "overall",
    limit:
      | "5"
      | "8"
      | "10"
      | "15"
      | "20"
      | "25"
      | "30"
      | "35"
      | "40"
      | "45"
      | "50" = "8"
  ): Promise<LastFmGetAlbum[]> {
    return this.req<GetTopAlbumsResponse>({
      user,
      method: "user.gettopalbums",
      period,
      limit,
    }).then((res) => res.topalbums.album);
  }

  async getTopArtists(user: string): Promise<Array<[string, string]>> {
    return this.req<GetTopArtistsResponse>({
      user,
      method: "user.gettopartists",
      period: "3month",
    }).then((res) => {
      return res.topartists.artist
        .map((artist) => [artist.name, artist.url] as [string, string])
        .filter((v, i, a) => a.findIndex((t) => t[0] === v[0]) === i);
    });
  }

  async getTopTrack(user: string): Promise<LastFmGetTrack> {
    return this.req<GetTopTracksResponse>({
      user,
      method: "user.gettoptracks",
      period: "7day",
    }).then((res) => {
      return res.toptracks.track[0];
    });
  }

  protected async req<T>(params: LastFMParams) {
    const url = new URL("https://ws.audioscrobbler.com/2.0/");
    url.search = new URLSearchParams({
      api_key: this.apiKey,
      format: "json",
      ...params,
    }).toString();

    const request = await fetch(url.toString());
    const response = (await request.json()) as T;

    if (request.status >= 400) {
      throw new Error(`Last.fm API error failed with status ${request.status}`);
    }

    return response;
  }
}

export interface LastFmGetAlbum {
  streamable: {
    fulltrack: string;
    "#text": string;
  };
  mbid: string;
  name: string;
  image: Array<{
    size: string;
    "#text": string;
  }>;
  artist: {
    url: string;
    name: string;
    mbid: string;
  };
  url: string;
  duration: string;
  "@attr": {
    rank: string;
  };
  playcount: string;
}

export interface GetTopAlbumsResponse {
  topalbums: {
    album: LastFmGetAlbum[];
    "@attr": {
      user: string;
      totalPages: string;
      page: string;
      perPage: string;
      total: string;
    };
  };
}

export interface LastFmGetArtist {
  name: string;
  mbid: string;
  url: string;
  image: Array<{
    size: string;
    "#text": string;
  }>;
  streamable: string;
  ontour: string;
  stats?: {
    listeners: string;
    playcount: string;
  };
}

export interface GetTopArtistsResponse {
  topartists: {
    artist: LastFmGetArtist[];
    "@attr": {
      user: string;
      totalPages: string;
      page: string;
      perPage: string;
      total: string;
    };
  };
}

export interface LastFmGetTrack {
  name: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: {
    "#text": string;
    fulltrack: string;
  };
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  image: Array<{
    size: string;
    "#text": string;
  }>;
  "@attr"?: {
    rank: string;
  };
}

export interface GetTopTracksResponse {
  toptracks: {
    track: LastFmGetTrack[];
    "@attr": {
      user: string;
      totalPages: string;
      page: string;
      perPage: string;
      total: string;
    };
  };
}
