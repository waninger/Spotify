export const artist:Artist = {
  "id": "0C0XlULifJtAgn6ZNCW2eu",
  "name": "The Killers",
  "genres": ["alternative rock", "modern rock"],
  "popularity": 82,
  "followers": {
    "total": 13500000
  },
  "images": [
    {
      "height": 640,
      "width": 640,
      "url": "https://i.scdn.co/image/..."
    }
  ],
  "external_urls": {
    "spotify": "https://open.spotify.com/artist/0C0XlULifJtAgn6ZNCW2eu"
  },
  "type": "artist"
}

export type Artist = {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  followers: {
    total: number;
  };
  images: {
    height: number;
    width: number;
    url: string;
  }[];
  external_urls: {
    spotify: string;
  };
  type: "artist";
};