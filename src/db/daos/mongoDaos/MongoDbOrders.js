const mongoModel = require('../../dbConnect/mongoConnect')
const logger = require('../../../utils/loggers/loggers');
const {asOrderDto} =  require('../../dtos/orderDto')

let instance=null

class MongoDbMessages{
    constructor(collectionName,schema){
        this.collection=mongoModel(collectionName,schema)
    }
    async getAll(){
        try {
            let files = await this.collection.find({},{__v:0})
            return asOrderDto(files)
        } catch (error) {
            logger.error(`error al cargar el archivo ${error}`)
        }
    }
    async getByUsername(email){
        try {
            let file = await this.collection.findOne({email:`${email}`},{__v:0})
            return asOrderDto([file])
        } catch (error) {
            logger.error(`error al cargar el archivo:${error}`)
        }
    }
    async getById(orderId){
        try {
            let file = await this.collection.findOne({'_id':orderId},{__v:0})
            return asOrderDto([file]) 
        } catch (error) {
            logger.error(`error al cargar el archivo:${error}`)
        }
    }
    async save(order){
        try{
            const itemSave= await this.collection.create(order)
            logger.info(`${itemSave}guardado con exito`)
            return asOrderDto([{...order,id:itemSave._id}])
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