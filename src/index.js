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

const readCityPop = new Promise(async resolve => {
  const streamCityPop = createReadStream(paths[1], {
    start: 43
  })

  const fileCityPopLines = createInterface({
    input: streamCityPop
  })

  for await (let line of fileCityPopLines) {
    const cityPopLineSplit = line.split(',')
    cityPop.push({
      cod_ibge: cityPopLineSplit[0],
      nome_cidade: cityPopLineSplit[1],
      nome_uf: cityPopLineSplit[2],
      populacao: cityPopLineSplit[3]
    })
  }
  resolve()
})

Promise.all([readUf, readCityPop]).then(() => {
  console.log(ufs)
  console.log(cityPop)
})
