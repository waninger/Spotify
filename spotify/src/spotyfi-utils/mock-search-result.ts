import { SearchResult } from "../repositories/interfaces";
export const mockSearchResult:SearchResult = {
  "tracks": {
    "href": "https://api.spotify.com/v1/search?query=the+killers&type=track&offset=0&limit=2",
    "items": [
      {
        "id": "3n3Ppam7vgaVa1iaRUc9Lp",
        "name": "Mr. Brightside",
        "type": "track",
        "duration_ms": 222075,
        "explicit": false,
        "preview_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "popularity": 85,
        "artists": [
          {
            "id": "0C0XlULifJtAgn6ZNCW2eu",
            "name": "The Killers",
            "type": "artist"
          }
        ],
        "album": {
          "id": "4piJq7R3gjUOxnYs6lDCTg",
          "name": "Hot Fuss",
          "type": "album",
          "images": [
            {
              "url": "/spotify/album-640.png",
              "width": 640,
              "height": 640
            },
            {
              "url": "/spotify/album-300.png",
              "width": 300,
              "height": 300
            },
            {
              "url": "/spotify/album-64.png",
              "width": 64,
              "height": 64
            }
          ]
        }
      }
    ],
    "limit": 2,
    "offset": 0,
    "total": 1234,
    "next": "https://api.spotify.com/v1/search?query=the+killers&type=track&offset=2&limit=2",
    "previous": null
  },

  "albums": {
    "href": "https://api.spotify.com/v1/search?query=the+killers&type=album&offset=0&limit=2",
    "items": [
      {
        "id": "4piJq7R3gjUOxnYs6lDCTg",
        "name": "Hot Fuss",
        "album_type": "album",
        "release_date": "2004-06-07",
        "total_tracks": 11,
        "type": "album",
        "artists": [
          {
            "id": "0C0XlULifJtAgn6ZNCW2eu",
            "name": "The Killers",
            "type": "artist"
          }
        ],
        "images": [
          {
            "url": "/spotify/album-640.png",
            "width": 640,
            "height": 640
          }
        ]
      }
    ],
    "limit": 2,
    "offset": 0,
    "total": 56,
    "next": null,
    "previous": null
  },

  "artists": {
    "href": "https://api.spotify.com/v1/search?query=the+killers&type=artist&offset=0&limit=2",
    "items": [
      {
        "id": "0C0XlULifJtAgn6ZNCW2eu",
        "name": "The Killers",
        "type": "artist",
        "popularity": 82,
        "genres": ["alternative rock", "modern rock"],
        "images": [
          {
            "url": "/spotify/artist-640.png",
            "width": 640,
            "height": 640
          }
        ]
      }
    ],
    "limit": 2,
    "offset": 0,
    "total": 1,
    "next": null,
    "previous": null
  }
}
