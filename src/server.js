const express = require('express')
const routerLog=require('./routes/logRoutes')
const routerCart=require('./routes/cartRoutes')
const routerProd = require('./routes/productsRoutes')
const routerOrders =  require('./routes/ordersRoutes')
const routerMessage = require('./routes/messagesRoutes')
const {engine} = require('express-handlebars')
const logger = require('./utils/loggers/loggers')
const {getAll,save} = require('./service/serviceMessages')
const path = require('path')
const {Server:HttpServer}=require('http');
const {Server:IOServer}=require('socket.io');

const app = express()
const httpServer=new HttpServer(app);
const io=new IOServer(httpServer);
// USADO YARGS EN EL PUERTO
// const yargs = require('yargs/yargs')(process.argv.slice(2))
// USANDO MINIMIST EN EL PUERTO
const parseArgs = require('minimist')

app.use(express.static(`${__dirname}/../public`));
app.use('/public',express.static(`${__dirname}/images`))
app.use('/usuarios',routerLog)
app.use('/carritos',routerCart)
app.use('/productos',routerProd)
app.use('/mensajes',routerMessage)
app.use('/ordenes',routerOrders)

app.engine("handlebars",engine())
app.set("view engine","handlebars")
app.set("views",path.join(__dirname,'views'))


app.all('/*',(req,res)=>{
    res.status(404).json({error: 'ups! , esta ruta no existe'})
})


io.on('connection',async socket=> {
    let messages =await getAll()
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);
    socket.on('new-message',async data=> {
        await save(data); 
        io.sockets.emit('messages', messages); 
    });   
});


const options ={
    alias: {
        'p':'PORT'
    },
    default: {
        'PORT': 8080
    }
}
const {PORT} = parseArgs(process.argv.slice(2), options)

const server = httpServer.listen(PORT, () => { 
    logger.info(`Servidor Http con Websockets escuchando en el puerto ${server.address().port}`);
})
server.on('error', error => logger.error(`Error en servidor ${error}`))
