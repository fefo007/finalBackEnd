const UserFactoryDao = require('../db/daos/UserFactoryDao')
const user = UserFactoryDao.getDao()


async function getAll(){
    return await user.getAll()
}

async function getByUsername(username){
    return await user.getByUsername(username)
}

async function save(us){
    return await user.save(us)
}

async function updateByUsername(username,userUpdate){
    return await updateByUsername(username,userUpdate)
} 

async function deleteById(userId){
    return await deleteById(userId)
}

module.exports={
    getAll,
    getByUsername,
    save,
    updateByUsername,
    deleteById
}