const jwt = require('jsonwebtoken')
const config = require('../../config')

function authToken(req,res,next){
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({error:'usuario no registrado para acceder a esta ruta'})
    }
    const token = authHeader.split(' ')[1]

    jwt.verify(token,config.PRIVATE_KEY,(error,decoded)=>{
        if(error){
            return res.status(403).json({error:'usuario no autoriza para acceder a esta ruta'})
        }
        req.user = decoded.data
        next()
    })
}

module.exports=authToken