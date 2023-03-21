
const FileMessages = require('./fileDaos/FileMessages')
const FireBaseMessages = require('./fireBaseDaos/FireBaseMessages')
const MongoDbMessages =require('./mongoDaos/MongoDbMessages')
const {messagesSchema} = require('../mongoSchemas/mongoSchemas')

const option = process.argv[2] || 'mongo'

let dao
switch (option.toLocaleLowerCase()) {
    case 'file':
        dao = FileMessages.getInstance()
        break;
    case 'fire':
        dao = FireBaseMessages.getInstance()
        break;
    default: 'mongo'
        dao = MongoDbMessages.getInstance('mensajes',messagesSchema)
    
}

class MessageFactoryDaos{
    static getDao(){
        return dao
    }
}

module.exports=MessageFactoryDaos