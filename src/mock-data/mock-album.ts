import { Album } from "@/types/album";
export const album: Album = {
  "id": "4BbsHmXEghoPPevQjPnHXx",
  "name": "Hot Fuss",
  "album_type": "album",
  "total_tracks": 11,
  "release_date": "2004-06-07",
  "release_date_precision": "day",
  "genres": [],
  "popularity": 78,
  "label": "Island Records",
  "uri": "spotify:album:4BbsHmXEghoPPevQjPnHXx",
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
      "type": "artist",
      "href": "https://api.spotify.com/v1/artists/0C0XlULifJtAgn6ZNCW2eu",
      "uri": "spotify:artist:0C0XlULifJtAgn6ZNCW2eu",
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/0C0XlULifJtAgn6ZNCW2eu"
      }
    }
  ],
  "tracks": {
    "href": "https://api.spotify.com/v1/albums/4BbsHmXEghoPPevQjPnHXx/tracks",
    "limit": 50,
    "offset": 0,
    "next": null,
    "previous": null,
    "total": 11,
    "items": [
      {
        "id": "3n3Ppam7vgaVa1iaRUc9Lp",
        "name": "Mr. Brightside",
        "duration_ms": 222075,
        "explicit": false,
        "track_number": 2,
        "disc_number": 1,
        "uri": "spotify:track:3n3Ppam7vgaVa1iaRUc9Lp",
        "preview_url": null,
        "external_urls": {
          "spotify": "https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp"
        },
        "artists": [
          {
            "id": "0C0XlULifJtAgn6ZNCW2eu",
            "name": "The Killers",
            "type": "artist",
            "href": "https://api.spotify.com/v1/artists/0C0XlULifJtAgn6ZNCW2eu",
            "uri": "spotify:artist:0C0XlULifJtAgn6ZNCW2eu",
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/0C0XlULifJtAgn6ZNCW2eu"
            }
          }
        ],
        "type": "track"
      }
    ]
  },
  "copyrights": [
    {
      "text": "(P) 2004 Island Records",
      "type": "P"
    }
  ],
  "external_urls": {
    "spotify": "https://open.spotify.com/album/4BbsHmXEghoPPevQjPnHXx"
  },
  "type": "album"
};