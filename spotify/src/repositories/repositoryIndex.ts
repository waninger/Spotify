import { spotifyMockSongService, spotyfiMockArtistService, spotyfiMockAlbumService, spotifyMockSearchService, spotifySearchService, spotifySongService} from "./spotifyServices";
import { SongService, ArtistService, AlbumService, SearchService } from "./interfaces";

export const songProvider : SongService = process.env.USE_SPOTIFY_API === "true" ? spotifySongService : spotifyMockSongService // change dependence on development vs production search service here
export const artistProvider : ArtistService = spotyfiMockArtistService // no production api implemented yet
export const albumProvider : AlbumService = spotyfiMockAlbumService // no production api implemented yet
export const musicSearchProvider : SearchService = process.env.USE_SPOTIFY_API === "true" ? spotifySearchService : spotifyMockSearchService // change dependence on development vs production search service here