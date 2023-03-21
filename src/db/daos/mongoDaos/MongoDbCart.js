
const mongoModel = require('../../dbConnect/mongoConnect')
const logger = require('../../../utils/loggers/loggers')
const {producSchema} =require('../../mongoSchemas/mongoSchemas')
const {asCartDto} = require('../../dtos/cartDto')

let instance=null

class MongoDbCart {
    constructor(collectionName,schema){
        this.collection=mongoModel(collectionName,schema)
    }
    async getAllCarts(){
        try {
            let files = await this.collection.find({},{__v:0})
            return asCartDto(files)
        } catch (error) {
            logger.error(`error al obtener los carritos: ${error}`)
        }
    }
    async createCart(){
        try{
            let cart ={
                    id:(Math.random() + 1).toString(20).substring(3),
                    timestamp:new Date().toLocaleString(),
                    products:[]}
            const itemSave= await this.collection.create(cart)
            return asCartDto([{...cart,id:itemSave.id}])
        }
        catch(error){
            logger.error(`error al crear el carrito: ${error}`)
        }
    }
    async deleteCart(cartId){
        try{
            const cart=await this.collection.find({'_id':cartId},{__v:0})
            await this.collection.deleteOne({'_id':cartId})
            return asCartDto(cart)
        }
        catch(error){
            logger.error(`error  al borrar el carrito: ${error}`)
        }
    }
    async getById(cartId){
        try{
            const cart=await this.collection.find({'_id':cartId},{__v:0})
                return asCartDto(cart)
            }
        catch(error){
            logger.error(`error al obtener el carrito: ${error}`)
        }
        }
    async save(idProduct,idcart){
        try{
            const file =await this.collection.find({},{__v:0})
            const carrito = file.find(cart=>cart._id == idcart)
            const prod=await mongoModel('productos',producSchema).find({'_id':idProduct},{__v:0})
            const product = prod.find(product=>product._id == idProduct)
            carrito.products.push(product)
            await this.collection.updateOne({'_id':idcart},carrito)
            return asCartDto([carrito])
            }
        catch(error){
            logger.error(`error al guardar en el carrito: ${error}`)
        }
    }
    async deleteById(idProduct,idcart) {
        try{
            const file =await this.collection.find({},{__v:0})
            const carrito = file.find(cart=>cart._id == idcart)
            const filterProds = carrito.products.filter(prods=>prods._id != idProduct)
            carrito.products = filterProds
            await this.collection.updateOne({'_id':idcart},carrito)
            return asCartDto([carrito])
        }
        catch(error){
            logger.error(`error al borrar del carrito: ${error}`)
        }
    }
    static getInstance(collectionName,schema){
        if(!instance){
            instance =  new MongoDbCart(collectionName,schema)
        }
        return instance
    }
}

module.exports= MongoDbCart