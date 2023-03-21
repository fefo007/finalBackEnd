const FileProd = require('./fileDaos/FileProd')
const FireBaseProd = require('./fireBaseDaos/FireBaseProd')
const MongoDbProd =require('./mongoDaos/MongoDbProd')
const {producSchema} = require('../mongoSchemas/mongoSchemas')

const option = process.argv[2] || 'Mongo'

let dao
switch (option.toLocaleLowerCase()) {
    case 'file':
        dao = FileProd.getInstance()
        break;
    case 'fire':
        dao = FireBaseProd.getInstance()
        break;
    default: 'mongo'
        dao = MongoDbProd.getInstance('productos',producSchema)
}

class ProdFactoryDaos{
    static getDao(){
        return dao
    }
}

module.exports=ProdFactoryDaos