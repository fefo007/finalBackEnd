
const {asUserDto} = require('../../dtos/userDto')
const fs = require('fs')
const logger = require('../../../utils/loggers/loggers')

let instance = null

class FileUsers {
    constructor(){
        this.rute=`${__dirname}/users.json`
    }
    
    async getAll(){
        try {
            const object = fs.readFileSync(this.rute, 'utf-8') 
            return asUserDto(JSON.parse(object))
        } catch (error) {
            logger.error(`error al cargar el archivo ${error}`)
        }
    }
    async getByUsername(username){
        try {
            const object = fs.readFileSync(this.rute, 'utf-8') 
            const users = JSON.parse(object)
            const user = users.find(usuario => usuario.username == username)
            // return asUserDto([{...user}])
            return user
        } catch (error) {
            logger.error(`error al cargar el archivo ${error}`)
        }
    }
    async save(user){
        const object = fs.readFileSync(this.rute, 'utf-8') 
        const users = JSON.parse(object)
        let userId 
        if(users.length == 0){
            userId = 1
        }else{
            userId=users.length + 1
        }
        const newUser={...user,id:userId}
        users.push(newUser)
        try {
            fs.writeFile(this.rute,JSON.stringify(users,null,2),(error)=>{
                if(error){
                    logger.error(`descripcion del error: ${error}`)
                }
            })
            return asUserDto([{...newUser}])
        } catch (error) {
            logger.error(`error al guardar el archivo ${error}`)
        }
    }
    async  updateByUsername(username,userUpdate){
        try {
            const object = fs.readFileSync(this.rute, 'utf-8') 
            const users = JSON.parse(object)
            const userId = users.find(user => user.username == username)
            const userIndex =users.findIndex(user => user.username == username);
            users.splice(userIndex,1,{...userUpdate,id:userId.id})
            fs.writeFileSync(this.rute,JSON.stringify(users,null,2))
            return asUserDto([{...userUpdate}])
        } catch (error) {
            logger.error(`error al actualizar el archivo ${error}`)
        }
    }
    async deleteById(userId){
            const object = fs.readFileSync(this.rute, 'utf-8') 
            const users = JSON.parse(object)
            const userDelete = users.find(user => user.id === userId)
            const arrayFiltrado =users.filter(user => user.id !== userId);
            if(arrayFiltrado == -1){
                logger.error(`error no se encontro un usuario con ese id:${idProduct}`)
            }
            try {
                fs.writeFileSync(this.rute,JSON.stringify(arrayFiltrado,null,2))
                return asUserDto([{...userDelete}])
            } catch (error) {
                logger.error(`error al borrar : ${error}`)
            }
    }
    static getInstance(){
        if(!instance){
            instance =  new FileUsers()
        }
        return instance
    }
}

module.exports=FileUsers