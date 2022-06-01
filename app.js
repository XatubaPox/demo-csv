import { readCompany } from './src/index.js'

import { connection } from './database/database.js'
;(async function run() {
  try {
    connection.connect()
    readCompany
  } catch (err) {
    throw err
  } finally {
  }
})()
