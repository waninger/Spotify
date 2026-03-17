import { afterEach, vi } from 'vitest'

console.log("RUNNIG TESTENV: PROD")
console.log(process.env.TEST_ENV )
process.env.USE_SPOTIFY_MOCK_DATA="false"
process.env.USE_PLAYLIST_MOCK_DATA="true"

afterEach(() => {
  vi.restoreAllMocks()
})  