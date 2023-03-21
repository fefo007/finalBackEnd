const express = require('express')
const {Router}= require('express')
const routerMessage = new Router()
const {
    getMessages,
    getUserMessages,
    postMessages}=require('../controllers/controllerMessages')

routerMessage.use(express.json())
routerMessage.use(express.urlencoded({ extended: true }))

routerMessage.get('/',getMessages)

routerMessage.get('/:username',getUserMessages)

routerMessage.post('/',postMessages)

module.exports=routerMessage