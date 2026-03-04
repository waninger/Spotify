import { spotifyMockSongService, spotyfiMockArtistService, spotyfiMockAlbumService, spotifyMockSearchService, spotifySearchService, spotifySongService, spotyfiAlbumService, spotyfiArtistService} from "./spotifyServices";
import { SongService, ArtistService, AlbumService, SearchService } from "./interfaces";

export const songProvider : SongService = process.env.USE_SPOTIFY_API == "true" ? spotifySongService : spotifyMockSongService // change dependence on development vs production search service here
export const artistProvider : ArtistService = process.env.USE_SPOTIFY_API == "true" ? spotyfiArtistService : spotyfiMockArtistService // no production api implemented yet
export const albumProvider : AlbumService = process.env.USE_SPOTIFY_API == "true" ? spotyfiAlbumService : spotyfiMockAlbumService // change dependence on development vs production search service here
export const musicSearchProvider : SearchService = process.env.USE_SPOTIFY_API === "true" ? spotifySearchService : spotifyMockSearchService // change dependence on development vs production search service here