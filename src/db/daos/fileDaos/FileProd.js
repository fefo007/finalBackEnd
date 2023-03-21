const fs = require('fs');
const logger = require('../../../utils/loggers/loggers');
const {asProdDto} = require('../../dtos/prodDto')

let instance =  null

class FileProd{
    constructor(){
        this.rute=`${__dirname}/products.json`;
    }
    async getAll(){
        try {
            const file = fs.readFileSync(this.rute, 'utf-8')
            const products = JSON.parse(file)
            return asProdDto(products)
        } catch (error) {
            logger.error(`error al cargar el archivo ${error}`)
        }
    }
    async getById(idProduct){
        try {
            const file = fs.readFileSync(this.rute, 'utf-8')
            const products = JSON.parse(file)
            const produc = products.find(product=>product.id===Number(idProduct))
            return asProdDto([produc])
        } catch (error) {
            logger.error(`error al cargar el archivo ${error}`)
        }
    }
    async save(product){
        const file = fs.readFileSync(this.rute, 'utf-8')
        const products = JSON.parse(file)
        let producId 
        if(products.length == 0){
            producId = 1
        }else{
            producId=products.length + 1
        }
        const newProduct={...product,id:producId}
        products.push(newProduct)
        try {
            fs.writeFileSync(this.rute,JSON.stringify(products,null,2))
            return asProdDto([newProduct])
        } catch (error) {
            logger.error(`error al guardar el archivo ${error}`)
        }
    }
    async deleteById(idProduct) {
        const file = fs.readFileSync(this.rute, 'utf-8')
        const products = JSON.parse(file)
        const deleteProd= products.find(prod=>prod.id===idProduct)
        const arrayFiltrado =products.filter(products => products.id !== idProduct);
        if(arrayFiltrado == -1){
            logger.error(`error no se encontro un producto con ese id:${idProduct}`)
        }
        try {
            fs.writeFileSync(this.rute,JSON.stringify(arrayFiltrado,null,2))
            return asProdDto([deleteProd])
        } catch (error) {
            logger.error(`error al borrar : ${error}`)
        }
    }
    async updateById(idProduc,newProduct){
        const file = fs.readFileSync(this.rute, 'utf-8')
        const products = JSON.parse(file)
        newProduct.id=idProduc
        const prodIndex = products.findIndex(prod => prod.id===idProduc)
        products.splice(prodIndex, 1, newProduct)
        try {
            fs.writeFileSync(this.rute,JSON.stringify(products,null,2))
            return asProdDto([{...newProduct,id:idProduc}])
        } catch (error) {
            logger.error(`error al actualizar: ${error}`)
        }
}
static getInstance(){
    if(!instance){
        instance =  new FileProd()
    }
    return instance
}
}

module.exports=FileProd