const {asUserDto} = require('../../dtos/userDto')
const logger = require('../../../utils/loggers/loggers')
const db = require('../../dbConnect/firebaseConect')

let instance = null

class FireBaseUser{
    constructor(){
        this.collection = db.collection('usuarios')
    }

    async getAll(){
        try {
            const files = []
            let file = await this.collection.get()
            file.forEach(doc=>{
                files.push({id: doc.id,...doc.data()})
            })
            return asUserDto(files)
        } catch (error) {
            logger.error('no se pudo cargar el archivo'+{error})
        }
    }
    async getByUsername(username){
        try{
            const files = []
            const user =await this.collection.where('username','==',username).get()
            user.forEach(doc=>{
                files.push({id: doc.id,...doc.data()})
            })
            return asUserDto(files)
        }
        catch(error){
            logger.error(`no se pudo cargar el archivo ${error}`)
        }
    }
    async save(user){
        try{
            const userSave= await this.collection.add(user)
            logger.info(`guardado con exito`)
            return asUserDto([{...user,id:userSave.id}])
        }
        catch (error){
            logger.error('error de escritura'+{error})
        }
    }
    async  updateByUsername(username,userUpdate){
        try{
            const files = []
            const user =await this.collection.where('username','==',username).get()
            user.forEach(doc=>{
                files.push({id: doc.id,...doc.data()})
            })
            const userId = files.find(user=>
                user.username == username)
            await this.collection.doc(userId.id).update(userUpdate)
            return asUserDto([{...userUpdate,id:userId.id}])
        }
        catch(error){
            logger.error('error al actualizar usuario'+{error})
        }
    }

    async deleteById(userId){
        try {
            const user = await this.collection.doc(userId).get()
            await this.collection.doc(userId).delete()
            return asUserDto([{...user.data(),id:user.id}])
        } catch (error) {
            logger.error('error al borrar usuario'+{error})
        }
    }

    static getInstance(){
        if(!instance){
            instance =  new FireBaseUser()
        }
        return instance
    }
}

module.exports = FireBaseUser