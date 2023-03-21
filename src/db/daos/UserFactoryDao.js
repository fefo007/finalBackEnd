
const FileUsers = require('./fileDaos/FileUsers')
const FireBaseUser = require('./fireBaseDaos/FireBaseUser')
const MongoDbUser =require('./mongoDaos/MongoDbUser')
const {userSchema} = require('../mongoSchemas/mongoSchemas')

const option = process.argv[2] || 'mongo'

let dao
switch (option.toLocaleLowerCase()) {
    case 'file':
        dao = FileUsers.getInstance()
        break;
    case 'fire':
        dao = FireBaseUser.getInstance()
        break;
    default: 'mongo'
        dao = MongoDbUser.getInstance('usuarios',userSchema)
}

class UserFactoryDaos{
    static getDao(){
        return dao
    }
}

module.exports=UserFactoryDaos