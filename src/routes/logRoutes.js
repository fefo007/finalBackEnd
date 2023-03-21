const express =require('express')
const {Router}=require( 'express')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport');
const {getSystemInfo,
    getLogout,
    getLoginError,
    getRegisterError,
    postPassportLogin,
    postPassportRegister,
    multerAvatar,
    getRegister,
    getUsers,
    putUsers,
    deleteUsers,
    postLogin}=require('../controllers/controllerLog')
const sessionConfig = require('../db/dbConnect/sessionConectMongo')
const routerLog=new Router()
const authToken = require('../utils/jsonWebToken/middlewareToken')

routerLog.use(session(sessionConfig))

routerLog.use(passport.initialize());
routerLog.use(passport.session());

routerLog.use(express.json())
routerLog.use(express.urlencoded({ extended: true }))

routerLog.get('/',getUsers)

routerLog.put('/:username',putUsers)

routerLog.delete('/:id',deleteUsers)

routerLog.get('/register',getRegister)

routerLog.post('/register',multerAvatar,postPassportRegister)

routerLog.post('/login',postPassportLogin,postLogin)

routerLog.get('/registerError',getRegisterError)

routerLog.get('/loginError',getLoginError)

routerLog.get("/logout", getLogout);


// COMPRIMIR LA RUTA INFO
routerLog.get('/sistemInfo',authToken,compression(),getSystemInfo)



module.exports=routerLog