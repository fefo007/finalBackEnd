const {asUserDto} = require('../../dtos/userDto')
const mongoModel = require('../../dbConnect/mongoConnect')
const logger = require('../../../utils/loggers/loggers')

let instance = null

class MongoDbUser{
    constructor(collectionName,schema){
        this.collection = mongoModel(collectionName,schema)
    }
    async getAll(){
        try {
            let files = await this.collection.find({},{__v:0})
            return asUserDto(files)
        } catch (error) {
            logger.error(`error al obtener usuarios: ${error}`)
        }
    }
    async getByUsername(username){
        try{
            let file = await this.collection.findOne({username:`${username}`},{__v:0})
            console.log(file)
            return asUserDto([file])
        }
        catch(error){
            logger.error(`error al obtener usuario: ${error}`)
        }
    }
    async save(user){
        try{
            const userSave= await this.collection.create(user)
            logger.info(`${userSave}guardado con exito`)
            return asUserDto([{...user,id:userSave._id}])}
        catch (error){
            logger.error(`error al guardar usuario: ${error}`)
        }
    }
    async  updateByUsername(username,userUpdate){
        try{
            await this.collection.replaceOne({username:username},userUpdate)
            return asUserDto([userUpdate])
        }
        catch(error){
            logger.error(`error al actualizar usuario: ${error}`)
        }
    }
    async deleteById(userId){
        try {
            let file = await this.collection.findOne({_id:`${userId}`},{__v:0})
            await this.collection.deleteOne({'_id':userId})
            return asUserDto([file])
        } catch (error) {
            logger.error(`error al borrar usuario: ${error}`)
        }
    }
    static getInstance(collectionName,schema){
        if(!instance){
            instance =  new MongoDbUser(collectionName,schema)
        }
        return instance
    }
}

module.exports = MongoDbUser