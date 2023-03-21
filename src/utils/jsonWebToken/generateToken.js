const jwt = require('jsonwebtoken')
const config = require('../../config')

function generateToken(user){
    const token = jwt.sign({data:user},config.PRIVATE_KEY,{expiresIn:'24h'})
    return token
}

module.exports=generateToken