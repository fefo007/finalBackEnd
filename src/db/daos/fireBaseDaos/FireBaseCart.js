const db = require('../../dbConnect/firebaseConect')
const logger = require('../../../utils/loggers/loggers')
const {asCartDto} = require('../../dtos/cartDto')

let instance=null

class FireBaseCart {
    constructor(){
        this.collection = db.collection('carritos')
    }

    async getAllCarts(){
        try {
            const files = []
            let file = await this.collection.get()
            file.forEach(doc=>{
                files.push({id: doc.id,...doc.data()})
            })
            return asCartDto(files)
        } catch (error) {
            logger.error(`error al cargar el archivo ${error}`)
        }
    }

    async createCart(){
        try{
            let cart ={
                    id:(Math.random() + 1).toString(20).substring(3),
                    timestamp:new Date().toLocaleString(),
                    products:[]}
            const itemSave= await this.collection.add(cart)
            return asCartDto([{...cart,id:itemSave.id}])
        }
        catch(error){
            throw new Error('error al actualizar')
        }
    }
    async deleteCart(cartId){
        try{
            const cart=await this.collection.doc(cartId).get()
            const data = cart.data()
            await this.collection.doc(cartId).delete()
            return asCartDto([data])
        }
        catch(error){
            throw new Error('error al actualizar')
        }
    }
    async getById(cartId){
        try{
            const cart=await this.collection.doc(cartId).get()
            const data = cart.data()
                return asCartDto([data])
            }
        catch(error){
            logger.error(`error al cargar carrito: ${error}`)
        }
        }
    async save(idProduct,idcart){
        try{
            const cart=await this.collection.doc(idcart).get()
            const carrito = cart.data()
            const prod=await db.collection('productos').doc(idProduct).get()
            const product={id:prod.id,...prod.data()}
            carrito.products.push(product)
            await this.collection.doc(idcart).set(carrito)
            return asCartDto([carrito])
            }
        catch(error){
            logger.error(`error al subir producto al carrito: ${error}`)
        }
    }
    async deleteById(idProduct,idcart) {
        try{
            const cart=await this.collection.doc(idcart).get()
            const carrito = cart.data()
            const arrayFiltrado = carrito.products.filter(products => products.id !== idProduct);
            carrito.products = arrayFiltrado
            await this.collection.doc(idcart).set(carrito)
            return asCartDto([carrito])
        }
        catch(error){
            logger.error(`error al borrar producto del carrito: ${error}`)
        }
    }
    static getInstance(){
        if(!instance){
            instance =  new FireBaseCart()
        }
        return instance
    }
}

module.exports= FireBaseCart