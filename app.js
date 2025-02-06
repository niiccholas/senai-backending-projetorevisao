/*****************************************************
 * Objetivo: Manipular dados do Whatsapp por usuário
 * Data: 30/01/2025
 * Autor: Nicolas
 * Versão: 1.0
 *****************************************************/

//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Inicializando o express através do objeto app
const app = express()

const funcoes = require('./modulo/funcoes.js')

app.use((request, response, next) => {
    //Permissão de qual ou quais máquinas irão acessar a API
    response.header('Access-Control-Allow-Origin', '*')  // Pode trocar o asterisco pelo IP da máquina liberada para fazer requisições da API. Normalmente para uso empresarial (apenas empresa pode usar)
    //Permissão de quais verbos poderão ser utilizados na API
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())

    next() //next obrigatório, parecido com o return
})

app.get('/v1/whatsapp/personal/:number', cors(), async function(request, response){

    let numberId = request.params.number

    let personalData = funcoes.getDadosUser(numberId)

    if(personalData){
        response.status(200)
        response.json(personalData)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

app.get('/v1/whatsapp/profile/:number', cors(), async function(request, response){

    let numberId = request.params.number

    let profileData = funcoes.getProfileUser(numberId)

    if(profileData){
        response.status(200)
        response.json(profileData)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

app.get('/v1/whatsapp/contacts/:number', cors(), async function(request, response){
    
    let numberId = request.params.number

    let contactsData = funcoes.getContatosUser(numberId)

    if(contactsData){
        response.status(200)
        response.json(contactsData)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

app.get('/v1/whatsapp/chats/:number/filtro', cors(), async function(request, response){
    
    let numberId = request.params.number
    let nameContact = request.query.contact
    let keyWord = request.query.keyWord 

    let contactChat = funcoes.getConversa(numberId, nameContact)
    let keywordChat = funcoes.getPalavraChave(numberId, nameContact, keyWord)

    if(nameContact && keyWord == undefined){
        if(contactChat){
            response.status(200)
            response.json(contactChat)
        }else{
            response.status(404)
            response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
        }
    }else if(nameContact && keyWord){
        if(keywordChat){
            response.status(200)
            response.json(keywordChat)
        }else{
            response.status(404)
            response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
        }
    }
})

app.get('/v1/whatsapp/chats/:number', cors(), async function(request, response){

    let numberId = request.params.number

    let chatData = funcoes.getConversas(numberId)
    // if para a entrada em cada função, validando se o filtro tá undefined ou não

    if(chatData){
        response.status(200)
        response.json(chatData)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})



//Permite deixar a API aguardando novas requisições
app.listen('8080', function(){ 
    console.log('API aguardando novas requisições...')
})