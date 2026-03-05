import { Playlist } from "../types/playList"
import { PlaylistService } from "./interfaces"
import { playlist } from "../spotyfi-utils/mock-playList"
export const playlistMockRepository: PlaylistService = {
    async getList(id:string):Promise<Playlist|null>{
        return playlist
    },

    async getAll(userId) {
        return null;
    },
}