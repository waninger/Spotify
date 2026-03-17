import { afterEach, vi } from 'vitest'

console.log("RUNNIG TESTENV: DEV")
console.log(process.env.TEST_ENV )
process.env.USE_SPOTIFY_MOCK_DATA="true"
process.env.USE_PLAYLIST_MOCK_DATA="true"
process.env.RUN_DB_INTEGRATION="false"
afterEach(() => {
  vi.restoreAllMocks()
})  