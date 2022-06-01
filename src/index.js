import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import slug from 'slug'

import { getNomeUf } from './util/uf.js'
import { formatDate } from './util/date.js'

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

export const readCompany = new Promise(async resolve => {
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

Promise.all([readUf, readCityPop, readCitySiafi, readCompany]).then(
  async () => {
    const arrayUf = []
    let id_uf = 1

    for await (let line of ufs) {
      arrayUf.push({
        id_uf: id_uf,
        sigla: line.sigla,
        nome_uf: getNomeUf(line.codigo_uf),
        codigo_uf: line.codigo_uf
      })
      id_uf++
    }

    const arrayCity = []
    let id_city = 1

    for await (let line of citySiafi) {
      let auxPopulacao = {}
      for (let { cod_ibge, populacao } of cityPop) {
        auxPopulacao = populacao

        if (cod_ibge == line.codigo_ibge) {
          break
        }
      }

      let auxIdUf = {}
      for (let { id_uf, codigo_uf } of arrayUf) {
        auxIdUf = id_uf

        if (codigo_uf == line.codigo_ibge.slice(0, 2)) {
          break
        }
      }

      arrayCity.push({
        id_city: id_city,
        nome: line.nome,
        latitude: line.latitude,
        longitude: line.longitude,
        codigo_ibge: line.codigo_ibge,
        siafi_id: line.siafi_id,
        populacao: auxPopulacao,
        uf_id: auxIdUf
      })
      id_city++
    }

    const arrayCompany = []

    for await (let line of company) {
      let auxIdCity = {}
      for (let { siafi_id, id_city } of arrayCity) {
        auxIdCity = id_city

        if (siafi_id == line.municipio) {
          break
        }
      }

      arrayCompany.push({
        slug: slug(line.nome_fantasia),
        nome_fantasia: line.nome_fantasia,
        dt_inicio_atividades: formatDate(line.dt_inicio_atividades),
        cnae_fiscal: line.cnae_fiscal,
        cep: line.cep,
        porte: line.porte,
        cidade_id: auxIdCity
      })
    }
    console.log(arrayCompany)
  }
)
