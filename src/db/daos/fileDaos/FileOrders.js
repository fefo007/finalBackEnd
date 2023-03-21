const fs = require('fs');
const logger = require('../../../utils/loggers/loggers');
const {asOrderDto} = require('../../dtos/orderDto')

let instance=null

class FileOrders{
    constructor(){
        this.rute=`${__dirname}/orders.json`;
    }
    async getAll(){
        try {
            const object = fs.readFileSync(this.rute, 'utf-8') 
            const order = JSON.parse(object)
            return asOrderDto(order)
        } catch (error) {
            logger.error(`error al cargar el archivo ${error}`)
        }
    }
    async getByUsername(email){
        try {
            const orders =fs.readFileSync(this.rute, 'utf-8') 
            const order = JSON.parse(orders)
            let resultOrders=order.find(order => order.email===email)  
            console.log(resultOrders)
            return asOrderDto([resultOrders])
        } catch (error) {
            logger.error(`error al cargar el archivo:${error}`)
        }
    }
    async getById(orderId){
        try {
            const object = fs.readFileSync(this.rute, 'utf-8') 
            const order = JSON.parse(object)
            let resultOrder=order.find(order => order.id==orderId)   
            console.log(resultOrder)
            return asOrderDto([resultOrder])
        } catch (error) {
            logger.error(`error al cargar el archivo:${error}`)
        }
    }
    async save(order){
        const object = fs.readFileSync(this.rute, 'utf-8') 
        const orders = JSON.parse(object)
        let orderId 
        if(orders.length == 0){
            orderId = 1
        }else{
            orderId=orders.length + 1
        }
        const newOrder={...order,id:orderId}
        orders.push(newOrder)
        try {
            await fs.writeFile(this.rute,JSON.stringify(orders,null,2),(error)=>{
                if(error){
                    logger.error(`descripcion del error: ${error}`)
                }
            })
            return asOrderDto([newOrder])
        } catch (error) {
            logger.error(`error al guardar el archivo ${error}`)
        }
    }
    static getInstance(){
        if(!instance){
            instance =  new FileOrders()
        }
        return instance
    }
}

module.exports=FileOrders