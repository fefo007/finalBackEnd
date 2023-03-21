const express = require('express')
const {Router}= require('express')
const routerOrders = new Router()
const {
    getOrders,
    getUserOrders,
    getIdOrders,
    postOrders
} = require('../controllers/controllerOrders')
const authToken = require('../utils/jsonWebToken/middlewareToken')

routerOrders.use(express.json())
routerOrders.use(express.urlencoded({ extended: true }))

routerOrders.get('/',authToken,getOrders)

routerOrders.get('/username/:username',authToken,getUserOrders)

routerOrders.get('/id/:id',authToken,getIdOrders)

routerOrders.post('/',authToken,postOrders)

module.exports=routerOrders