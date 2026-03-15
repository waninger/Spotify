import { expect, test } from "vitest";
import { playlistProvider } from "../repositories/repositoryIndex"
import { pool } from "@/repositories/playlistRepository";

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

test("Get all users", async()=>{
    const users = await pool.query('SELECT * FROM users')
    console.log(users.rows)
})