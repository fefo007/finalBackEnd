
const logger = require('../../../utils/loggers/loggers')
const mongoModel = require('../../dbConnect/mongoConnect')
const {asProdDto} = require('../../dtos/prodDto')

let instance=null

class MongoDbProd {
    constructor(collectionName,schema){
        this.collection=mongoModel(collectionName,schema)
    }
    async getAll(){
        try {
            let files = await this.collection.find({},{__v:0})
            return asProdDto(files)
        }
        catch(error){
            logger.error(`error al obtener productos: ${error}`)
        }
    }
    async getById(idProduct){
        try{
            let file = await this.collection.find({'_id':idProduct},{__v:0})
            return asProdDto(file)
        }
        catch(error){
            logger.error(`error al obtener producto: ${error}`)
        }
    }
    async save(product){
        try{
            const itemSave= await this.collection.create(product)
            return asProdDto([{...product,id:itemSave._id}])
        }
        catch (error){
            logger.error(`error al guardar producto: ${error}`)
        }
    }
    async  updateById(prodid,newProduct){
        try{
            await this.collection.replaceOne({'_id':prodid},newProduct)
            return asProdDto([{...newProduct,id:prodid}])
        }
        catch(error){
            logger.error(`error al actualizar producto: ${error}`)
        }
    }
    async deleteById(idProduct) {
        try{
            let file = await this.collection.findOne({_id:`${idProduct}`},{__v:0})
            await this.collection.deleteOne({'_id':idProduct})
            return asProdDto([file])
        }
        catch(error){
            logger.error(`error al borrar producto: ${error}`)
        }
    }
    static getInstance(collectionName,schema){
        if(!instance){
            instance =  new MongoDbProd(collectionName,schema)
        }
        return instance
    }
}

module.exports= MongoDbProd