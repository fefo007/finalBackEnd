const mongoose = require("mongoose");
const config = require ('../../config')
const logger = require('../../utils/loggers/loggers')

mongoose.set('strictQuery', false);
try {
    mongoose.connect(config.MONGO_STORE)
    logger.info('base de datos mongo-Atlas conectada')
} catch (error) {
    logger.error(error)
}

function mongoModel(collectionName,schema) {
    return mongoose.model(collectionName,schema)
}

module.exports=mongoModel