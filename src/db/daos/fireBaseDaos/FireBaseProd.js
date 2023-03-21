
const logger = require('../../../utils/loggers/loggers')
const db = require('../../dbConnect/firebaseConect')
const {asProdDto} = require('../../dtos/prodDto')

let instance = null

class FireBaseProd {
    constructor(){
        this.collection = db.collection('productos')
    }

    async getAll(){
        try {
            const files = []
            let file = await this.collection.get()
            file.forEach(doc=>{
                files.push({id: doc.id,...doc.data()})
            })
            return asProdDto(files)
        }
        catch(error){
            logger.error(`error al cargar el archivo:${error}`)
        }
    }
    async getById(idProduct){
        try{
            let file = await this.collection.doc(idProduct).get()
            const data = file.data()
            return asProdDto([{...data,id:idProduct}])
        }
        catch(error){
            logger.error(`error al cargar el archivo:${error}`)
        }
    }
    async save(product){
        try{
            const itemSave= await this.collection.add(product)
            return asProdDto([{...product,id:itemSave.id}])
        }
            catch(error){
                logger.error(`error de escritura:${error}`)
            }
    }
    async  updateById(productId,newProduct){
        try{
            await this.collection.doc(productId).set(newProduct)
            return asProdDto([{...newProduct,id:productId}])
        }
            catch(error){
                logger.error(`error al actualizar el archivo:${error}`)
            }
    }
    async deleteById(idProduct) {
        try{
            const prod = await this.collection.doc(idProduct).get()
            await this.collection.doc(idProduct).delete()
            return asProdDto([{...prod.data(),id:prod.id}])
        }
            catch(error){
                logger.error(`error al borrar el archivo:${error}`)
            }
    }
    static getInstance(){
        if(!instance){
            instance =  new FireBaseProd()
        }
        return instance
    }
}

module.exports= FireBaseProd