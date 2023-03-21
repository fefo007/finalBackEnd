
const FileOrders = require('./fileDaos/FileOrders')
const FireBaseOrders = require('./fireBaseDaos/FireBaseOrders')
const MongoDbOrders =require('./mongoDaos/MongoDbOrders')
const {ordersSchema} = require('../mongoSchemas/mongoSchemas')

const option = process.argv[2] || 'mongo'

let dao
switch (option.toLocaleLowerCase()) {
    case 'file':
        dao = FileOrders.getInstance()
        break;
    case 'fire':
        dao = FireBaseOrders.getInstance()
        break;
    default: 'mongo'
        dao = MongoDbOrders.getInstance('ordenes',ordersSchema)
    
}

class OrdersFactoryDaos{
    static getDao(){
        return dao
    }
}

module.exports=OrdersFactoryDaos