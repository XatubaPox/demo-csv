import { allPromises } from './src/input.js'
;(async function run() {
  try {
    await allPromises
  } catch (err) {
    throw err
  }
})()
