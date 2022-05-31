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
const citySiafi = []
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

const readCitySiafi = new Promise(async resolve => {
  const streamCitySiafi = createReadStream(paths[2], {
    start: 55
  })

  const fileCitySiafiLines = createInterface({
    input: streamCitySiafi
  })

  for await (let line of fileCitySiafiLines) {
    const citySiafiLineSplit = line.split(',')
    citySiafi.push({
      codigo_ibge: citySiafiLineSplit[0],
      nome: citySiafiLineSplit[1],
      latitude: citySiafiLineSplit[2],
      longitude: citySiafiLineSplit[3],
      codigo_uf: citySiafiLineSplit[4],
      siafi_id: citySiafiLineSplit[5]
    })
  }
  resolve()
})

const readCompany = new Promise(async resolve => {
  const streamCompany = createReadStream(paths[3], {
    start: 71
  })

  const fileCompanyLines = createInterface({
    input: streamCompany
  })

  for await (let line of fileCompanyLines) {
    const companyLineSplit = line.split(',')
    company.push({
      nome_fantasia: companyLineSplit[0],
      dt_inicio_atividades: companyLineSplit[1],
      cnae_fiscal: companyLineSplit[2],
      cep: companyLineSplit[3],
      municipio: companyLineSplit[4],
      porte: companyLineSplit[5]
    })
  }
  resolve()
})

Promise.all([readUf, readCityPop, readCitySiafi, readCompany]).then(() => {
  console.log(ufs)
  console.log(cityPop)
  console.log(citySiafi)
  console.log(company)
})
