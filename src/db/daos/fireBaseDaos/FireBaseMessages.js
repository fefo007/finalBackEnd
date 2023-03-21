const db = require('../../dbConnect/firebaseConect')
const logger = require('../../../utils/loggers/loggers');
const {asMessageDto} =  require('../../dtos/messageDto')

let instance=null

class FireBaseMessages{
    constructor(){
        this.collection = db.collection('mensages')
    }
    async getAll(){
        try {
            const files = []
            let file = await this.collection.get()
            file.forEach(doc=>{
                files.push({id: doc.id,...doc.data()})
            })
            console.log(files)
            return asMessageDto(files)
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
            return asMessageDto(files)
        } catch (error) {
            logger.error(`error al cargar el archivo:${error}`)
        }
    }
    async save(message){
        try{
            const itemSave= await this.collection.add(message)
            return asMessageDto([{...message,id:itemSave._id}])}
            catch(error){
                logger.error(`error de escritura:${error}`)
            }
    }
    static getInstance(){
        if(!instance){
            instance =  new FireBaseMessages()
        }
        return instance
    }
}
module.exports=FireBaseMessages