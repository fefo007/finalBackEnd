const MessageFactoryDaos = require('../db/daos/MessageFactoryDaos')
const messages = MessageFactoryDaos.getDao()


async function getAll(){
    return await messages.getAll()
}

async function getByUsername(email){
    return await messages.getByUsername(email)
} 

async function save(messa){
    const saved = await messages.save(messa)
    return saved
}

module.exports={
    getAll,
    getByUsername,
    save
}