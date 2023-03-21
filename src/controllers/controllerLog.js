const passport = require('passport');
const info = require('../service/info')
const logger = require('../utils/loggers/loggers')
const { Strategy: LocalStrategy } = require('passport-local');
const {passportRegisterConfig,
    passportLoginConfig,
    passportSerializerConfig,
    passportDesserializerConfig}=require('../service/passportConfig')
const {
    getAll,
    updateByUsername,
    deleteById
} = require('../service/serviceLog')
const {upload} = require('../utils/multer/multerConfig')
const generateToken = require('../utils/jsonWebToken/generateToken')

// -------------------------PASSPORT---------------------------
passport.use('register', new LocalStrategy({passReqToCallback: true}, passportRegisterConfig));

passport.use('login', new LocalStrategy(passportLoginConfig));

passport.serializeUser(passportSerializerConfig);

passport.deserializeUser(passportDesserializerConfig);
// -------------------------/PASSPORT---------------------------
const getUsers = async (req,res)=>{
    const users =await getAll()
    if(users){
        res.status(200).json(users)
    }else{
        res.status(400).json({error:'no se encontro la lista de usuarios'})
    }
}
const putUsers = async (req,res)=>{
    let username = req.params.username
    let newUser = req.body
    let userUpdated =await updateByUsername(username,newUser)
    if(userUpdated){
        res.status(200).json(newUser)
    }else{
        res.status(400).json({error:`no se puedo actualizar el usuario con id : ${JSON.stringify(username)}`})
    }
}
const deleteUsers = async (req,res)=>{
    let userId = req.params.id
    let userDeleted =await deleteById(userId)
    if (userDeleted){
        res.status(200).json(userDeleted)
    }else{
        res.status(404).json({ error: `no se pudo eliminar el usuario con id : ${JSON.stringify(userId)}` })
    }
}

const getRegister = async (req,res)=>{
    res.render('register')
}
const multerAvatar = upload.single('image')

const postPassportRegister =passport.authenticate('register', { failureRedirect: '/usuarios/registerError', successRedirect: '/' })

const postPassportLogin = passport.authenticate('login', { failureRedirect: '/usuarios/loginError'})

const postLogin = async (req,res,next)=> {
    req.login(req.user, err =>{
        if(err) return next(err)
        const token = generateToken(req.user)
        res.status(200).json({token:token,username:req.user.username})
    })
}

const getRegisterError = async (req,res)=>{
    logger.error('error de registro')
    res.render('registerError')
}

const getLoginError = async (req,res)=>{
    logger.error('error de logeo')
    res.render('loginError')
}

const getLogout = async (req, res,next) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.status(200).json('usuario deslogeado');
    });
}

const getSystemInfo = async (req,res)=>{
    let inf = info
    res.render('info',inf)
}

module.exports={getSystemInfo,
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
    postLogin}