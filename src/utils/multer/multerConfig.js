const config = require('../../config')
const mimeType = require('mime-types')
const multer = require('multer')

const parseArgs = require('minimist')
const options ={
    alias: {
        'p':'PORT'
    },
    default: {
        'PORT': 8080
    }
}
const {PORT} = parseArgs(process.argv.slice(2), options)

// ------------CONGIFURACION DE MULTER PARA RECIBIR Y GUARDAR IMAGENES--------------
const storage = multer.diskStorage({    
    destination:`${__dirname}/../../images`,
    filename:function (req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}.${mimeType.extension(file.mimetype)}`)
    }
})
const upload = multer({
    storage:storage,
    limits:10000000,
    fileFilter:(req,file,cb)=>{
        const fileTypes = ['image/jpeg','image/png','image/webp']
        if(fileTypes.includes(file.mimetype)){
            cb(null,true)}
        else{
            cb(new Error('solo archivos .jpeg, .png o .webp estan permitidos'))}
    }
})
// ---------------------------------------------------------------

module.exports={upload,PORT}