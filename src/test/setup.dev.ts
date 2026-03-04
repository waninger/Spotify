import { afterEach, vi } from 'vitest'

console.log("RUNNIG TESTENV: DEV")
console.log(process.env.TEST_ENV )
process.env.USE_SPOTIFY_API="false"



afterEach(() => {
  vi.restoreAllMocks()
})  