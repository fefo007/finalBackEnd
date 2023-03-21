const fs = require('fs');
const logger = require('../../../utils/loggers/loggers');
const {asMessageDto} =  require('../../dtos/messageDto')

let instance=null

class FileMessages{
    constructor(){
        this.rute=`${__dirname}/messages.json`;
    }
    async getAll(){
        try {
            const object = fs.readFileSync(this.rute, 'utf-8') 
            const messages = JSON.parse(object)
            return asMessageDto(messages)
        } catch (error) {
            logger.error(`error al cargar el archivo ${error}`)
        }
    }
    async getByUsername(email){
        try {
            const object = fs.readFileSync(this.rute, 'utf-8') 
            const messages = JSON.parse(object)
            let resultMessages=messages.find(message => message.email===email)   
            return asMessageDto([resultMessages])
        } catch (error) {
            logger.error(`error al cargar el archivo:${error}`)
        }
    }
    async save(message){
        const object = fs.readFileSync(this.rute, 'utf-8') 
        const messages = JSON.parse(object)
        let messageId 
        if(messages.length == 0){
            messageId = 1
        }else{
            messageId=messages.length + 1
        }
        const newMessage={...message,id:messageId}
        messages.push(newMessage)
        try {
            await fs.writeFile(this.rute,JSON.stringify(messages,null,2),(error)=>{
                if(error){
                    logger.error(`descripcion del error: ${error}`)
                }
            })
            return asMessageDto([message])
        } catch (error) {
            logger.error(`error al guardar el archivo ${error}`)
        }
    }
    static getInstance(){
        if(!instance){
            instance =  new FileMessages()
        }
        return instance
    }
}
module.exports=FileMessages