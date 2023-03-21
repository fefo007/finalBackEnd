const {
    getAll,
    getById,
    save,
    deleteById,
    updateById
} = require('../service/serviceProducts')
const {upload,PORT} = require('../utils/multer/multerConfig')
const config = require('../config')

// // ---------------------------------------------------------------
const multerProduct = upload.single('url')

const getProducts = async (req,res)=>{
    const products =await getAll()
    if(products){
        res.status(200).render('productsUp',{products})
    }else{
        res.status(400).json({error:'no se encontro la lista de productos'})
    }
}
const getProductsFront = async (req,res)=>{
    const products =await getAll()
    if(products){
        res.status(200).json(products)
    }else{
        res.status(400).json({error:'no se encontro la lista de productos'})
    }
}
const getChargeProducts = async (req,res)=>{
    let prodId = req.params.id
    const product=await getById(prodId)
    if(product){
        res.status(200).json(product)
    }else{
        res.status(400).json({error:`no se encontro el producto con este id :${JSON.stringify(prodId)}`})
    }
}

const postChargeProducts = async (req,res)=>{
    let body = req.body
    let image = `${config.HOST}:${PORT}/public/${req.file.filename}`
    const prod = {...body,url:image}
    const productSaved =await save(prod)
    if(productSaved){
        res.status(200).redirect('/productos')
    }else{
        res.status(400).json({error:`no se pudo agregar el producto : ${JSON.stringify(prod)}`})
    }
}

const putChargeProducts = async (req,res)=>{
    let prodId = req.params.id
    let newProd = req.body
    let productUpdated =await updateById(prodId,newProd)
    if(productUpdated){
        res.status(200).json(newProd)
    }else{
        res.status(400).json({error:`no se puedo actualizar el producto con id : ${JSON.stringify(prodId)}`})
    }
}

const deleteChargeProducts = async (req,res)=>{
    let prodId = req.params.id
    let productDeleted =await deleteById(prodId)
    if (productDeleted){
        res.status(200).json(productDeleted)
    }else{
        res.status(404).json({ error: `no se pudo eliminar el producto con id : ${JSON.stringify(prodId)}` })
    }
}

module.exports={getProducts,
    getProductsFront,
    getChargeProducts,
    postChargeProducts,
    putChargeProducts,
    deleteChargeProducts,
    multerProduct}