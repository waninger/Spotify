export const album:Album = {
  "id": "4BbsHmXEghoPPevQjPnHXx",
  "name": "Hot Fuss",
  "album_type": "album",
  "total_tracks": 11,
  "release_date": "2004-06-07",
  "release_date_precision": "day",
  "genres": [],
  "popularity": 78,
  "label": "Island Records",
  "images": [
    {
      "height": 640,
      "width": 640,
      "url": "/image.png"
    }
  ],
  "artists": [
    {
      "id": "0C0XlULifJtAgn6ZNCW2eu",
      "name": "The Killers",
      "type": "artist"
    }
  ],
  "tracks": {
    "items": [
      {
        "id": "3n3Ppam7vgaVa1iaRUc9Lp",
        "name": "Mr. Brightside",
        "duration_ms": 222075,
        "explicit": false,
        "track_number": 2,
        "type": "track"
      }
    ],
    "limit": 50,
    "offset": 0,
    "total": 11
  },
  "external_urls": {
    "spotify": "https://open.spotify.com/album/4BbsHmXEghoPPevQjPnHXx"
  },
  "type": "album"
}
export type Album = {
  id: string;
  name: string;
  album_type: string;
  total_tracks: number;
  release_date: string;
  release_date_precision: string;
  genres: string[];
  popularity: number;
  label: string;
  images: {
    height: number;
    width: number;
    url: string;
  }[];
  artists: {
    id: string;
    name: string;
    type: "artist";
  }[];
  tracks: {
    items: {
      id: string;
      name: string;
      duration_ms: number;
      explicit: boolean;
      track_number: number;
      type: "track";
    }[];
    limit: number;
    offset: number;
    total: number;
  };
  external_urls: {
    spotify: string;
  };
  type: "album";
};

