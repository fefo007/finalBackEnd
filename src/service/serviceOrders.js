const OrderFactoryDaos = require('../db/daos/OrderFactoryDaos')
const orders = OrderFactoryDaos.getDao()


async function getAll(){
    return await orders.getAll()
}

async function getByUsername(email){
    return await orders.getByUsername(email)
} 

async function getById(orderId){
    return await orders.getById(orderId)
}

async function save(order){
    const saved = await orders.save(order)
    return saved
}

module.exports={
    getAll,
    getByUsername,
    getById,
    save
}