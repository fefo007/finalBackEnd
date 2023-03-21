const sendMail=require('../utils/sendNotifications/sendEmail')
const {newUserEmail}=require('../utils/sendNotifications/emailTemplates')
const bCrypt = require('bcrypt')
const {
    getByUsername,
    save,
} = require('./serviceLog')
const {PORT} = require('../utils/multer/multerConfig')
const config = require('../config')


const passportRegisterConfig = async (req, username, password, done) => {

    const {email,direction,age,cel} = req.body

    let user = await getByUsername(username)
    if (user) {
    return done('usuario ya existente')
    }
    user = {
        username:username,
        password:bCrypt.hashSync(password,bCrypt.genSaltSync(10),null),
        email:email,
        direction:direction,
        age:age,
        cel:cel,
        image:`${config.HOST}:${PORT}/public/${req.file.filename}`
    }

    save(user)

    const newuser=newUserEmail(user)
    sendMail('nuevo usuario',newuser)

    return done(null, user)
}

function isValidPass(user,password){
    return bCrypt.compareSync(password,user.password)
}

const passportLoginConfig= async(username, password, done) => {

    const user =await getByUsername(username)

    if (!user) {
        return done(null, false,{message:'usuario inexistente'})
    }

    if (!isValidPass(user,password)) {
        return done(null, false,{message:'password incorrecto'})
    }

    return done(null, user,{message:'logeo exitoso'});
}


const passportSerializerConfig=function (user, done) {
    done(null, user.username);
}

const passportDesserializerConfig=async function (username, done) {
    const user =await getByUsername(username)
    done(null, user);
}

module.exports={passportRegisterConfig,
    passportLoginConfig,
    passportSerializerConfig,
    passportDesserializerConfig}