const express = require('express')
const {Router}= require('express')
const routerCart= new Router()
const {
    getCarts,
    getCart,
    deleteCar,
    getCartProducts,
    postCartProducts,
    deleteCartProducts}=require('../controllers/controllerCart')
const authToken = require('../utils/jsonWebToken/middlewareToken')

routerCart.use(express.json())
routerCart.use(express.urlencoded({ extended: true }))

routerCart.get('/',getCarts)

routerCart.get('/carrito',authToken,getCart)

routerCart.delete('/carrito/:id',deleteCar)

routerCart.get('/carrito/:id/productos',authToken,getCartProducts)

routerCart.post('/carrito/:id/productos/:id_prod',authToken,postCartProducts)

routerCart.delete('/carrito/:id/productos/:id_prod',deleteCartProducts)


module.exports=routerCart