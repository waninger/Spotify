const TOKEN_URL = "https://accounts.spotify.com/api/token";

type TokenCache = {
  accessToken: string;
  expiresAt: number; 
};
const SAFETY_MARGIN = 60_000;

type TokenStore = {
  cache: TokenCache | null;
  inFlight: Promise<string> | null;
};

function getTokenStore(): TokenStore {
  const globalStore = globalThis as typeof globalThis & {
    __spotifyTokenStore?: TokenStore;
  };

  if (!globalStore.__spotifyTokenStore) {
    globalStore.__spotifyTokenStore = {
      cache: null,
      inFlight: null,
    };
  }

  return globalStore.__spotifyTokenStore;
}

export async function getSpotifyAccessToken(): Promise<string> {
  const store = getTokenStore();
  const now = Date.now();

  if (store.cache && now < store.cache.expiresAt - SAFETY_MARGIN) {
    return store.cache.accessToken;
  }

  if (store.inFlight) return store.inFlight;

  store.inFlight = (async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      throw new Error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET");
    }

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "client_credentials" }),
      cache: "no-store",
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Spotify token error: ${res.status} ${txt}`);
    }

    const json: { access_token: string; expires_in: number } = await res.json();

    store.cache = {
      accessToken: json.access_token,
      expiresAt: Date.now() + json.expires_in * 1000,
    };

    return store.cache.accessToken;
  })();

  try {
    return await store.inFlight;
  } finally {
    store.inFlight = null;
  }
}