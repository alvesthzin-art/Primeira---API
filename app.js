/*****************************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de Estados e Cidades
 * Data: 01/04/2026
 * Autor: Thiago
 * Versão: 1.0
 * 
 * Instalação do EXPRESS - npm intall express --save
 *      Dependencia responsavel pela utilização do protocolo HTTP para
 *      criar uma API     
 * 
 * Instalação do CORS    - npm install cors --save
 *      Dependencia responsavel pelas configurações a serem realizadas
 *      para a permissão de acesso da API
 * 
 *****************************************************************************************************/

//Import das dependencias para criar a API
const express = require("express")
const cors    = require("cors")

//Criando um objeto para manipular o express
const app = express()

//Conjunto de permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: "*", //A origem da requisição, podendo ser um IP ou *(Todos)
    methods: ["GET", "POST", "PUT", "DELETE"], //São os verbos que serão liberados na API
    allowedHeaders: ["Content-type", "Authorization"] //São permissões de cabeçalho do CORS
}

//Configura as permissões da API através do CORS
app.use(cors(corsOptions))

//Response -> Retornos da API
//Request  -> São chegadas de dados na API    

//Import das funções
const estadosCidades = require("./modulo/funcoes.js")

//Import do arquivo de dados
const arquivo = require("./modulo/arquivo.js")

//Criando EndPoints para a API

//Retorna dados do estado filtrando pelo uf
app.get("/v1/senai/dados/estado/:uf", function(request, response){
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(arquivo.listaDeEstados.estados,sigla)

    if(estado){
        response.status(200)
        response.json(estado)
        }else{
            response.status(404)
            response.json({"message": "O estado informado não foi encontrado!"})
        }
})

//Retrona dados da capital de cada estado filtrando pelo uf
app.get("/v1/senai/capital/estado/:uf", function(request, response){
    let sigla = request.params.uf
    let estado = estadosCidades.getCapitalEstado(arquivo.listaDeEstados.estados,sigla)

    if(estado){
        response.status(200)
        response.json(estado)
        }else{
            response.status(404)
            response.json({"message": "O estado informado não foi encontrado!"})
        }
})

//Retorna dados dos estados que forma capitais do Brasil
app.get("/v1/senai/estados/capital/brasil", function(request, response){
    let estado = estadosCidades.getCapitalPais(arquivo.listaDeEstados.estados)

    if(estado){
        response.status(200).json(estado)
    } else {
        response.status(404).json({"message": "Nenhum dado encontrado!"})
    }
})

//Retorna dados dos estados filtrando pela região
app.get("/v1/senai/estados/regiao/:regiao", function(request, response){
    let sigla = request.params.regiao
    let estado = estadosCidades.getEstadosRegiao(arquivo.listaDeEstados.estados,sigla)

    if(estado){
        response.status(200)
        response.json(estado)
        }else{
            response.status(404)
            response.json({"message": "A região informada não foi encontrada!"})
        }
})

//Retorna dados das cidades filtrando pelo uf
app.get("/v1/senai/cidades/estado/:uf", function(request, response){
    let sigla = request.params.uf
    let estado = estadosCidades.getCidades(arquivo.listaDeEstados.estados,sigla)

    if(estado){
        response.status(200)
        response.json(estado)
        }else{
            response.status(404)
            response.json({"message": "A cidade informada não foi encontrada!"})
        }
})

app.get("/v1/senai/estados", function(request, response){
    
    //Chama a função que retorna a lista de estados passando o arquivo de dados
    
    let estados = estadosCidades.getCidades(arquivo.listaDeEstados.estados)

    response.json(estados)
    response.status(200)

})

app.get("/v1/senai/help", function(request, response){
    let docAPI = {
        "API-description": "API para manipular dados de Estados e Cidades",
        "date": "2026-04-02",
        "Development": "Thiago Costa",
        "Version": "1.0",
        "Endpoints": [
            {   "id": 1,
                "Rota 1": "/v1/senai/estados",
                "obs": "Retorna a lista de todos os estados"
            },
            {   "id": 2,
                "Rota 2": "/v1/senai/dados/estado/sp",
                "obs": "Retorna os dados do estado filtrando pela sigla do estado"
            },
            {   "id": 3,
                "Rota 3": "/v1/senai/capital/estado/sp",
                "obs": "Retorna os dados da capital filtrando pela sigla do estado"
            },
            {   "id": 4,
                "Rota 4": "/v1/senai/estados/capital/brasil",
                "obs": "Retorna todos os estados que formaram capital do Brasil"
            },
            {   "id": 5,
                "Rota 5": "/v1/senai/estados/regiao/sudeste",
                "obs": "Retorna todos os estados referente a uma região"
            },
            {   "id": 6,
                "Rota 6": "/v1/senai/cidades/estado/sp",
                "obs": "Retorna todas as cidades filtrando pela sigla do estado"
            }
        ]
    }

    response.status(200)
    response.json(docAPI)
})

//Serve para inicializar a API para receber requisições
app.listen(8080, function(){
    console.log("API funcionando e aguardando novas requisições ...")
})