const express = require('express')
const {Router}= require('express')
const routerProd = new Router()
const {getProducts,
    getProductsFront,
    getChargeProducts,
    postChargeProducts,
    putChargeProducts,
    deleteChargeProducts,
    multerProduct}=require('../controllers/controllerProducts')

routerProd.use(express.json())
routerProd.use(express.urlencoded({ extended: true }))

routerProd.get('/',getProducts)

routerProd.get('/front',getProductsFront)

routerProd.get('/:id',getChargeProducts)

routerProd.post('/cargarProductos',multerProduct,postChargeProducts)

routerProd.put('/cargarProductos/:id',putChargeProducts)

routerProd.delete('/cargarProductos/:id',deleteChargeProducts)

module.exports=routerProd