import { existsSync } from 'fs'

import { allPromises } from './src/input.js'
import debug from 'debug'

const log = debug('app:democsv')

console.time('demo-csv')

const fileExists = existsSync('database/csv/output/saida.csv')

log(`processing all promises`)
const ONE_SECOND = 1000
setInterval(() => process.stdout.write('.'), ONE_SECOND).unref()
;(async function run() {
  try {
    if (!fileExists) {
      await allPromises
      return
    }
    log(`saida.csv file already exists`)
    process.exit(1)
  } catch (err) {
    throw err
  } finally {
    log(`all promises have been processed`)
    console.timeEnd('demo-csv')
  }
})()
