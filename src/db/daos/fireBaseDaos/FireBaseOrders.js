const db = require('../../dbConnect/firebaseConect')
const logger = require('../../../utils/loggers/loggers');
const {asOrderDto} = require('../../dtos/orderDto')

let instance=null

class FireBaseOrders{
    constructor(){
        this.collection = db.collection('ordenesDeCompra')
    }
    async getAll(){
        try {
            const files = []
            let file = await this.collection.get()
            file.forEach(doc=>{
                files.push({id: doc.id,...doc.data()})
            })
            console.log(files)
            return asOrderDto(files)
        } catch (error) {
            logger.error(`error al cargar el archivo ${error}`)
        }
    }
    async getByUsername(email){
        try {
            const files = []
            const order =await this.collection.where('email','==',email).get()
            order.forEach(doc=>{
                files.push({id: doc.id,...doc.data()})
            })
            return asOrderDto(files)
        } catch (error) {
            logger.error(`error al cargar el archivo:${error}`)
        }
    }
    async getById(orderId){
        try {
            let file = await this.collection.doc(orderId).get()
            const data = file.data()
            console.log(data)
            return asOrderDto([data])
        } catch (error) {
            logger.error(`error al cargar el archivo:${error}`)
        }
    }
    async save(order){
        try{
            const itemSave= await this.collection.add(order)
            return asOrderDto([{...order,id:itemSave._id}])
        }
            catch(error){
                logger.error(`error de escritura:${error}`)
            }
    }
    static getInstance(){
        if(!instance){
            instance =  new FireBaseOrders()
        }
        return instance
    }
}

module.exports=FireBaseOrders