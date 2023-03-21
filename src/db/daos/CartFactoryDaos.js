
const FileCart = require('./fileDaos/FileCart')
const FireBaseCart = require('./fireBaseDaos/FireBaseCart')
const MongoDbCart =require('./mongoDaos/MongoDbCart')
const {cartSchema} = require('../mongoSchemas/mongoSchemas')

const option = process.argv[2] || 'mongo'

let dao
switch (option.toLocaleLowerCase()) {
    case 'file':
        dao = FileCart.getInstance()
        break;
    case 'fire':
        dao = FireBaseCart.getInstance()
        break;
    default: 'mongo'
        dao = MongoDbCart.getInstance('carritos',cartSchema)
        
}

class CartFactoryDaos{
    static getDao(){
        return dao
    }
}

module.exports=CartFactoryDaos