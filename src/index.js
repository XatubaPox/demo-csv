import { createReadStream } from 'fs'
import { createInterface } from 'readline'

const paths = [
  'database/csv/input/uf.csv',
  'database/csv/input/cidade_populacao.csv',
  'database/csv/input/cidade_siafi.csv',
  'database/csv/input/empresas_bahia.csv'
]

const ufs = []
const cityPop = []
const citiSiafi = []
const company = []

const readUf = new Promise(async resolve => {
  const streamUf = createReadStream(paths[0], {
    start: 16
  })

  const fileUfLines = createInterface({
    input: streamUf
  })

  for await (let line of fileUfLines) {
    const ufLineSplit = line.split(',')
    ufs.push({
      codigo_uf: ufLineSplit[0],
      sigla: ufLineSplit[1]
    })
  }
  resolve()
})

Promise.all([readUf]).then(() => {
  console.log(ufs)
})
