const TOKEN_URL = "https://accounts.spotify.com/api/token";

type TokenCache = {
  accessToken: string;
  expiresAt: number; 
};
const SAFETY_MARGIN = 60_000;

let cache: TokenCache | null = null;
let inFlight: Promise<string> | null = null;

export async function getSpotifyAccessToken(): Promise<string> {
  const now = Date.now();

  if (cache && now < cache.expiresAt - SAFETY_MARGIN) {
    return cache.accessToken;
  }

  if (inFlight) return inFlight;

  inFlight = (async () => {
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

    cache = {
      accessToken: json.access_token,
      expiresAt: Date.now() + json.expires_in * 1000,
    };

    return cache.accessToken;
  })();

  try {
    return await inFlight;
  } finally {
    inFlight = null;
  }
}