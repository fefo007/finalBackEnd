const ProdFactoryDaos = require('../db/daos/ProdFactoryDaos')
const prod = ProdFactoryDaos.getDao()

async function getAll(){
    return await prod.getAll()
}

async function getById(prodId){
    return await prod.getById(prodId)
}

async function save(produc){
    const saved = await prod.save(produc)
    return saved
}

async function deleteById(prodId){
    const delet = await prod.deleteById(prodId)
    return delet
}

async function updateById(prodId,newProd){
    const update = await prod.updateById(prodId,newProd)
    return update
}

module.exports={
    getAll,
    getById,
    save,
    deleteById,
    updateById
}