let funcao = require('./contatos.js')
const dadosUsuarios = funcao.contatos['whats-users']

function getDadosUser(telefone){
    let profile = {}
    let status = false

    dadosUsuarios.forEach(function(usuario){
        if(usuario.number == telefone){
            status = true
            profile.id = usuario.id
            profile.account = usuario.account
            profile['created-since'] = usuario['created-since']
            profile.number = usuario.number
        }
    })

    if(status != true){
        return false
    }else{
        return profile
    }
}


function getProfileUser(telefone){
    let profile = {}
    let status = false

    dadosUsuarios.forEach(function(usuario){
        if(usuario.number == telefone){
            status = true
            profile.nickname = usuario.nickname
            profile['profile-image'] = usuario['profile-image']
            profile.background = usuario.background
        }
    })

    if(status != true){
        return false
    }else{
        return profile
    }
}

function getContatosUser(telefone){
    let status = false
    lista = {
        contatos: []
    }

    dadosUsuarios.forEach(function(usuario){
        if(usuario.number == telefone){
            usuario.contacts.forEach(function(contato){
                status = true
                infoContact = {
                    name: contato.name,
                    description: contato.description,
                    image: contato.image
                }
                lista.contatos.push(infoContact)
            })
        }
    })

    if(status == true){
        return lista
    }else{
        return status
    }
}

function getConversas(telefone){
    let status = false
    lista = {
        contatos: [
            /*{
            nome: 'João'
            messages: [
            {sender: eu
            content: 'Oi, tudo bem?'}]
            } */
        ]
    }

    dadosUsuarios.forEach(function(usuario){
        if(usuario.number == telefone){
            usuario.contacts.forEach(function(contato){
                if(contato.messages != []){
                    status = true
                    infoContact = {
                        name: contato.name,
                        messages: contato.messages
                    }
                }
                lista.contatos.push(infoContact)
            })
        }
    })

    if(status == true){
        return lista
    }else{
        return status
    }
}

function getConversa(telefone, nomeContato){
    let status = false
    lista = {
        /* messages: [
        {sender: eu
        content: 'Oi, tudo bão?'}]*/
    }

    dadosUsuarios.forEach(function(usuario){
        if(usuario.number == telefone){
            usuario.contacts.forEach(function(contato){
                if(contato.name == nomeContato){
                    status = true
                    lista.messages = contato.messages
                }
            })
        }
    })

    if(status == true){
        return lista
    }else{
        return status
    }
}

function getPalavraChave(telefone, nomeContato, keyword){
    let status = false

    lista = {
        messages: []
    }

    dadosUsuarios.forEach(function(usuario){
        if(usuario.number == telefone){
            usuario.contacts.forEach(function(contato){
                if(contato.name == nomeContato){
                    contato.messages.forEach(function(mensagem){
                        if(mensagem.content.includes(keyword)){
                            status = true
                            lista.messages.push(mensagem)
                        }
                    })
                }
            })
        }
    })

    if(status == true){
        return lista
    }else{
        return status
    }
}

module.exports = {
    getContatosUser,
    getConversa,
    getConversas,
    getDadosUser,
    getPalavraChave,
    getProfileUser
}

// console.log(getPalavraChave('11987876567', 'Ana Maria', 'for'))
// console.log(getDadosUser('11987876567'))
// console.log(getConversa('11987876567', 'Ana Maria'))