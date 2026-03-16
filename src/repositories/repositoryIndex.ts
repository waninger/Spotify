import { spotifyMockSongService, spotyfiMockArtistService, spotyfiMockAlbumService, spotifyMockSearchService, spotifySearchService, spotifySongService, spotyfiAlbumService, spotyfiArtistService} from "@/repositories/spotifyServices";
import { SongService, ArtistService, AlbumService, SearchService, PlaylistService } from "@/repositories/interfaces";
import { playlistMockRepository, playlistRepository } from "@/repositories/playlistRepository"

export const songProvider : SongService = process.env.USE_SPOTIFY_MOCK_DATA == "false" ? spotifySongService : spotifyMockSongService // change dependence on development vs production search service here
export const artistProvider : ArtistService = process.env.USE_SPOTIFY_MOCK_DATA == "false" ? spotyfiArtistService : spotyfiMockArtistService // no production api implemented yet
export const albumProvider : AlbumService = process.env.USE_SPOTIFY_MOCK_DATA == "false" ? spotyfiAlbumService : spotyfiMockAlbumService // change dependence on development vs production search service here
export const musicSearchProvider : SearchService = process.env.USE_SPOTIFY_MOCK_DATA == "false" ? spotifySearchService : spotifyMockSearchService // change dependence on development vs production search service here
export const playlistProvider : PlaylistService = process.env.USE_PLAYLIST_MOCK_DATA == "false" ? playlistRepository : playlistMockRepository

console.log("Using song provider:", process.env.USE_SPOTIFY_MOCK_DATA == "false" ? "Spotify API" : "Mock Data");
console.log("Using playlist provider:", process.env.USE_PLAYLIST_MOCK_DATA == "false" ? "PostgreSQL Database" : "Mock Data");