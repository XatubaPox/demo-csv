import { allPromises } from './src/input.js'
import debug from 'debug'

const log = debug('app:democsv')

console.time('demo-csv')

log(`processing all promises`)
const ONE_SECOND = 1000
setInterval(() => process.stdout.write('.'), ONE_SECOND).unref()
;(async function run() {
  try {
    await allPromises
  } catch (err) {
    throw err
  } finally {
    log(`all promises have been processed`)
    console.timeEnd('demo-csv')
  }
})()
