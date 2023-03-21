const mongoModel = require('../../dbConnect/mongoConnect')
const logger = require('../../../utils/loggers/loggers');
const {asMessageDto} = require('../../dtos/messageDto')

let instance=null

class MongoDbMessages{
    constructor(collectionName,schema){
        this.collection=mongoModel(collectionName,schema)
    }
    async getAll(){
        try {
            let files = await this.collection.find({},{__v:0})
            return asMessageDto(files)
        } catch (error) {
            logger.error(`error al cargar el archivo ${error}`)
        }
    }
    async getByUsername(email){
        try {
            let file = await this.collection.findOne({email:`${email}`},{__v:0})
            return asMessageDto([file])
        } catch (error) {
            logger.error(`error al cargar el archivo:${error}`)
        }
    }
    async save(message){
        try{
            const itemSave= await this.collection.create(message)
            return asMessageDto([{...message,id:itemSave._id}])
        }
            catch(error){
                logger.error(`error de escritura:${error}`)
            }
    }
    static getInstance(collectionName,schema){
        if(!instance){
            instance =  new MongoDbMessages(collectionName,schema)
        }
        return instance
    }
}
module.exports=MongoDbMessages