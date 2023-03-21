const admin = require('firebase-admin')
const logger = require('../../utils/loggers/loggers')
// const firebaseAccount = require('../dbConnect/gamer-house-ecommerce-firebase-adminsdk-r3y0i-1ededd0991.json')
const config = require('../../config')

try {
    admin.initializeApp({
        credential:admin.credential.cert(JSON.parse(config.FIREBASE_CONFIG)),

    })
    logger.info('base de datos fireBase conectada con exito')
} catch (error) {
    logger.error(error)
}

const db = admin.firestore()

module.exports=db