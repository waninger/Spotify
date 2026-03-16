import { spotifyMockSongService, spotyfiMockArtistService, spotyfiMockAlbumService, spotifyMockSearchService, spotifySearchService, spotifySongService, spotyfiAlbumService, spotyfiArtistService} from "@/repositories/spotifyServices";
import { SongService, ArtistService, AlbumService, SearchService, PlaylistService } from "@/repositories/interfaces";
import { playlistMockRepository, playlistRepository } from "@/repositories/playlistRepository"

export const songProvider : SongService = process.env.USE_SPOTIFY_MOCK_DATA == "true" ? spotifyMockSongService : spotifySongService // change dependence on development vs production search service here
export const artistProvider : ArtistService = process.env.USE_SPOTIFY_MOCK_DATA == "true" ? spotyfiMockArtistService : spotyfiArtistService // no production api implemented yet
export const albumProvider : AlbumService = process.env.USE_SPOTIFY_MOCK_DATA == "true" ? spotyfiMockAlbumService : spotyfiAlbumService // change dependence on development vs production search service here
export const musicSearchProvider : SearchService = process.env.USE_SPOTIFY_MOCK_DATA == "true" ? spotifyMockSearchService : spotifySearchService // change dependence on development vs production search service here
export const playlistProvider : PlaylistService = process.env.USE_PLAYLIST_MOCK_DATA == "true" ? playlistMockRepository : playlistRepository
