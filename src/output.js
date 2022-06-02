import { createWriteStream } from 'fs'

import { connection } from '../database/database.js'
import csv from 'fast-csv'

export const output = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const filename = 'database/csv/output/saida.csv'
      const writableStream = createWriteStream(filename)

      await connection
        .query(`SELECT * FROM saida`)
        .then(([rows]) => {
          const data = JSON.parse(JSON.stringify(rows))
          csv.write(data, { headers: true }).pipe(writableStream)
        })
        .catch(err => {
          throw err
        })
      resolve()
    } catch (err) {
      reject(err)
    }
  })
    .then(() => {
      console.log('Arquivo saida.csv gerado com sucesso!')
    })
    .catch(() => {
      console.log('Não foi possível gerar o arquivo de saída.')
    })
}
