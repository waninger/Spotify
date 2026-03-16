export type Song = {
  id: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  disc_number: number;
  is_local: boolean;
  external_urls: {
    spotify: string;
  };
  artists: {
    id: string;
    name: string;
    type: "artist";
  }[];
  album: {
    id: string;
    name: string;
    release_date: string;
    total_tracks: number;
  };
  type: "track";
};


export const song:Song = {
  "id": "3n3Ppam7vgaVa1iaRUc9Lp",
  "name": "Mr. Brightside",
  "duration_ms": 222075,
  "explicit": false,
  "popularity": 85,
  "preview_url": "https://p.scdn.co/mp3-preview/...",
  "track_number": 2,
  "disc_number": 1,
  "is_local": false,
  "external_urls": {
    "spotify": "https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp"
  },
  "artists": [
    {
      "id": "0C0XlULifJtAgn6ZNCW2eu",
      "name": "The Killers",
      "type": "artist"
    }
  ],
  "album": {
    "id": "4BbsHmXEghoPPevQjPnHXx",
    "name": "Hot Fuss",
    "release_date": "2004-06-07",
    "total_tracks": 11
  },
  "type": "track"
}