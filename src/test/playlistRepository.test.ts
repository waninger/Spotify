import { expect, test } from "vitest";
import { playlistProvider } from "../repositories/repositoryIndex"
const ID = "1"
test("Get a no null playList from repository", async()=>{
    const playlist = await playlistProvider.getList(ID)
    expect(playlist).toMatchObject({
        id: expect.any(String),
        user: expect.any(String),
        name: expect.any(String),
        songs: expect.anything()
    })
})