import { Playlist } from "../types/playlist"
import { PlaylistService } from "./interfaces"
import { playlist } from "../spotyfi-utils/mock-playlist"
export const playlistMockRepository: PlaylistService = {
    async getList(id:string):Promise<Playlist|null>{
        return playlist
    },

    async getAll(userId) {
        return [playlist, playlist];
    },
}