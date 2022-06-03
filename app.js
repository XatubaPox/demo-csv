import { allPromises } from './src/input.js'

const ONE_SECOND = 1000
setInterval(() => process.stdout.write('.'), ONE_SECOND).unref()
;(async function run() {
  try {
    await allPromises
  } catch (err) {
    throw err
  }
})()
