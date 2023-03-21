const CartFactoryDaos = require('../db/daos/CartFactoryDaos')
const carts =  CartFactoryDaos.getDao()


async function getAllCarts(){
    return await carts.getAllCarts()
}

async function createCart(){
    return await carts.createCart() 
} 

async function deleteCart(cartId){
    return await carts.deleteCart(cartId)
} 

async function getById(cartId){
    return await carts.getById(cartId)
}

async function save(idProduct,idcart){
    return await carts.save(idProduct,idcart)
}

async function deleteById(idProduct,idcart){
    return await carts.deleteById(idProduct,idcart)
}

module.exports={
    getAllCarts,
    createCart,
    deleteCart,
    getById,
    save,
    deleteById
}