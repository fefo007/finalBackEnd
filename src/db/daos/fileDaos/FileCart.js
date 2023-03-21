const fs = require('fs');
const logger = require('../../../utils/loggers/loggers');
const {asCartDto} = require('../../dtos/cartDto')

let instance=null

class FileCart{
    constructor(){
        this.rute=`${__dirname}/carts.json`;
    }
    async getAllCarts(){
        try {
            const file = fs.readFileSync(this.rute, 'utf-8')
            const carts = JSON.parse(file)
            return asCartDto(carts)
        } catch (error) {
            logger.error(`error al cargar el archivo ${error}`)
        }
    }
    async createCart(){
        try {
            const file = fs.readFileSync(this.rute, 'utf-8')
            const carts = JSON.parse(file)
            let cart ={
                    id:(Math.random() + 1).toString(20).substring(3),
                    timestamp:new Date().toLocaleString(),
                    products:[]}
            carts.push(cart)
            fs.writeFileSync(this.rute,JSON.stringify(carts),null,2)
            return asCartDto([cart])
        } catch (error) {
            logger.error(`error al crear un carrito ${error}`)
        }
    }
    async deleteCart(cartId){
        const file = fs.readFileSync(this.rute, 'utf-8')
        const carts = JSON.parse(file)
        const deleteCart = carts.find(cart=>cart.id == cartId)
        const arrayFiltrado = carts.filter(cart => cart.id != cartId);
        this.carts=arrayFiltrado
        if(arrayFiltrado == -1){
            logger.error(`error no se encontro un producto con ese id:${idProduct}`)
        }
        try {
            fs.writeFileSync(this.rute,JSON.stringify(arrayFiltrado,null,2))
            return asCartDto([deleteCart])
        } catch (error) {
            logger.error(`error al borrar : ${error}`)
        }
    }
    async getById(cartId){
        try {
            const file = fs.readFileSync(this.rute, 'utf-8')
            const carts = JSON.parse(file)
            let resultCart=carts.find(cart => cart.id==cartId)   
            return asCartDto([resultCart])
        } catch (error) {
            logger.error(`error al cargar el archivo:${error}`)
        }
}
    async save(idProduct,idcart){
        try{
            const file = fs.readFileSync(this.rute, 'utf-8')
            const carts = JSON.parse(file)
            let resultCart=carts.find(cart => cart.id==idcart)  
            const productRead =fs.readFileSync(`${__dirname}/products.json`,'utf-8')
            const productToObj = JSON.parse(productRead)
            const productArray=productToObj.find(product=>product.id==Number(idProduct))
            resultCart.products.push(productArray)
            const cartIndex = carts.findIndex(cart => cart.id==idcart)
            carts.splice(cartIndex,1,resultCart)
            fs.writeFileSync(this.rute,JSON.stringify(carts,null,2))
            return asCartDto([resultCart])
        }
        catch(error){
            logger.error(`error de lectura ${error}`)
        }
    }
    async deleteById(idProduct,idcart) {
        try {
            const file = fs.readFileSync(this.rute, 'utf-8')
            const carts = JSON.parse(file)
            let resultCart=carts.find(cart => cart.id==idcart)  
            const arrayFiltrado = resultCart.products.filter(prod => prod.id != idProduct)
            resultCart.products=arrayFiltrado
            const cartIndex = carts.findIndex(cart => cart.id==idcart)
            carts.splice(cartIndex,1,resultCart)
            fs.writeFileSync(this.rute,JSON.stringify(carts,null,2))
            return asCartDto([resultCart])
        } catch (error) {
            logger.error(`error al eliminar el producto del carrito:${error}`)
        }
    }
    static getInstance(){
        if(!instance){
            instance =  new FileCart()
        }
        return instance
    }
}

module.exports=FileCart