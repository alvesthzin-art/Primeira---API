const { listaDeEstados } = require("./arquivo")

const getListaDeEstado = function(listaCompleta, siglaBusca) {
    let dadosEncontrados = false

    listaCompleta.forEach(function(item) {
        if (String(item.sigla).toUpperCase() === String(siglaBusca).toUpperCase()) {
            
            dadosEncontrados = {
                uf: item.sigla,
                descricao: item.nome, 
                capital: item.capital
            }
        }
    })

    return dadosEncontrados
}

const getDadosEstado = function(listaCompleta, siglaBusca) {
    let dadosEncontrados = false


    listaCompleta.forEach(function(item) {
        if (String(item.sigla).toUpperCase() === String(siglaBusca).toUpperCase()) {
            
            const nomeCidades = item.cidades.map(function(cidade) {
                return cidade.nome
            })
            dadosEncontrados = {
                uf: item.sigla,
                descricao: item.nome, 
                quantidade_cidades: item.cidades.length,
                cidades: nomeCidades
            }
        }
    })

    return dadosEncontrados
}

const getCapitalEstado = function(listaCompleta, siglaBusca) {
        let dadosEncontrados = false
    
        listaCompleta.forEach(function(item) {
            if (String(item.sigla).toUpperCase() === String(siglaBusca).toUpperCase()) {
                dadosEncontrados = {
                    uf: item.sigla,
                    descricao: item.nome, 
                    capital: item.capital
                }
            }
        })
    
        return dadosEncontrados
}

const getEstadosRegiao = function(listaCompleta, buscaRegiao) {
    if (!listaCompleta || !buscaRegiao) return false

    let estruturaRegiao = {
        regiao: buscaRegiao.toUpperCase(),
        estados: [] 
    }

    let status = false

    listaCompleta.forEach(function(item) {
        if (String(item.regiao).toUpperCase() === String(buscaRegiao).toUpperCase()) {
            
            estruturaRegiao.estados.push({
                uf: item.sigla,
                descricao: item.nome
            })
            
            status = true
        }
    })

    return status ? estruturaRegiao : false
}

const  getCapitalPais= function(listaCompleta) {
    if(!listaCompleta) return false

    let listaFiltrada = []

    listaCompleta.forEach(function(item) {

        if (item.capital_pais) {

            listaFiltrada.push({

                capital_atual: item.capital_pais.capital,
                uf: item.sigla,
                descricao: item.nome,
                capital: item.capital,
                regiao: item.regiao,
                capital_pais_ano_inicio: item.capital_pais.ano_inicio,
                capital_pais_ano_fim: item.capital_pais.ano_fim
            })
        }
    })


    return listaFiltrada.length > 0 ? { capitais: listaFiltrada } : false
}

const getCidades = function(listaCompleta, siglaBusca) {
    let dadosEncontrados = false


    listaCompleta.forEach(function(item) {
        if (String(item.sigla).toUpperCase() === String(siglaBusca).toUpperCase()) {
            
            const nomeCidades = item.cidades.map(function(cidade) {
                return cidade.nome
            })
            dadosEncontrados = {
                uf: item.sigla,
                descricao: item.nome, 
                quantidade_cidades: item.cidades.length,
                cidades: nomeCidades
            }
        }
    })

    return dadosEncontrados
}


module.exports = { 
    getListaDeEstado, getDadosEstado, getCapitalEstado,
    getEstadosRegiao, getCapitalPais, getCidades
}



