import { afterEach, vi } from 'vitest'

console.log("RUNNIG TESTENV: PROD")
console.log(process.env.TEST_ENV )


afterEach(() => {
  vi.restoreAllMocks()
})  