
// TESTEO DE LAS CLASES , MANUALMENTE

const express = require('express')
const CartFactoryDaos = require('./db/daos/CartFactoryDaos')
const MessageFactoryDaos = require('./db/daos/MessageFactoryDaos')
const OrderFactoryDaos = require('./db/daos/OrderFactoryDaos')
const ProdFactoryDaos = require('./db/daos/ProdFactoryDaos')
const UserFactoryDaos = require('./db/daos/UserFactoryDao')
const cart= CartFactoryDaos.getDao() 
const message= MessageFactoryDaos.getDao()
const order= OrderFactoryDaos.getDao()
const prod= ProdFactoryDaos.getDao()
const user= UserFactoryDaos.getDao()

// const fs = require('fs')

// const routerLog=require('./routes/logRoutes')
// const routerCart=require('./routes/routesCart')
// const routerProd = require('./routes/routesProducts')
// const {engine} = require('express-handlebars')
const logger = require('./utils/loggers/loggers')
// const path = require('path')
// USADO YARGS EN EL PUERTO
// const yargs = require('yargs/yargs')(process.argv.slice(2))
// USANDO MINIMIST EN EL PUERTO
const parseArgs = require('minimist')

const app = express()

// app.use(express.static('public'))
// app.use('/public',express.static(`${__dirname}/public`))
// app.use('/user',routerLog)
// app.use('/carrito',routerCart)
// app.use('/productos',routerProd)

// app.engine("handlebars",engine())
// app.set("view engine","handlebars")
// app.set("views",path.join(__dirname,'views'))

async function probando() {
    let user1 = {
        username:'pep',
        password:'sddaddsadad',
        email:'88',
        direction:'juan',
        age:26,
        cel:322165656,
        image:'sdaddasdsadsa'
    }
    let user2 = {
        username:'fede',
        password:'45454545',
        email:'87878787',
        direction:'salma',
        age:40,
        cel:1221,
        image:'tgggggghhhhhh'
    }
    let prod1 = {        
        name:'dsdsdsdsdsa',
        price:6595959,
        description:'dasdswee',
        code:6559595995,
        url:'sf4f5s4f5sf',
        stock:89848484,}
    let prod2 ={        
        name:'89898998',
        price:66,
        description:'54554515',
        code:22,
        url:'226226',
        stock:1,}
    let order1 = {
        products:[{pepe:'sdsd',jeje:'dsadds'}],
        orderId:1,
        timestamp:4555,
        state:'sas',
        email:'sasas544s54a5',
    }
    let order2 = {
        products:[{p1111111:'4744',je22:'22525'}],
        orderId:5,
        timestamp:56565,
        state:'a',
        email:'s',
    }
    let message1 = {
        email:'sasasa4s5a4s5a4s',
        type:'as',
        timestamp:5465645,
        body:'asasas',
    }
    let message2={
        email:'8888',
        type:'s5s5s5',
        timestamp:545,
        body:'ooooooo',
    }

        let cartId = "a0eg657cf3f"
        let proid ='6408fafbc0da087949eedf70'
        let prodid=2


    // let usuarios =  await user.save(user1)
    // let usuarios =  await user.getAll()
    // let usuarios =  await user.getByUsername(user1.username)
    // let usuarios =  await user.updateByUsername(user1.username,user2)
    // let usuarios =  await user.deleteById('6407a29507bce7cf11f0aa9c')
    // console.log(usuarios)

    // let produ = await prod.getAll()
    // let produ = await prod.getById('6408fb1f72a47a9da3fa9b41')
    // let produ = await prod.save(prod2)
    // let produ = await prod.deleteById('6408fb1f72a47a9da3fa9b41')
    // let produ = await prod.updateById('6408fafbc0da087949eedf70',prod2)
    // console.log(produ)

    // let carros = await cart.getAllCarts()
    // let carros = await cart.createCart()
    // let carros = await cart.deleteCart('63fbcf207287d1ee734232d8')
    // let carros = await cart.getById('640a625bdad2aa519b15490f')
    // let carros = await cart.save(prodid,cartId)
    let carros = await cart.deleteById(prodid,cartId)
    console.log(carros)
    
    // let ordenes =  await order.getAll()
    // let ordenes =  await order.getByUsername('s')
    // let ordenes =  await order.getById(1)
    // let ordenes = await order.save(order1)
    // console.log(ordenes)

    // let mensa =  await message.getAll()
    // let mensa =  await message.getByUsername(message2.email)
    // let mensa =  await message.save(message2)
    // console.log(mensa)

}
probando()
// const admin = require('firebase-admin')
// const firebaseAccount = require('./db/daos/fireBaseDaos/gamer-house-ecommerce-firebase-adminsdk-r3y0i-1ededd0991.json')
// try {
//     admin.initializeApp({
//         credential:admin.credential.cert(firebaseAccount),

//     })
//     logger.info('base de datos conectada con exito')
// } catch (error) {
//     logger.error(error)
// }

// const db = admin.firestore()
// class pepe {
//     constructor(){
//         this.coll=db.collection('pepe')
//     }
//     async ja(){
//         let user2 = {username:'fede',password:'415154s54s'}
//         await this.coll.add(user2)
//     }
// }
// const dd = new pepe()
// dd.ja()

// app.get('*',(req,res)=>{
    //     logger.warn('ruta inexistente')
    //     res.redirect('/user/login')
// })

const options ={
    alias: {
        'p':'PORT'
    },
    default: {
        'PORT': 8080
    }
}
const {PORT} = parseArgs(process.argv.slice(2), options)

const server = app.listen(PORT, () => { 
    logger.info(`Servidor Http con Websockets escuchando en el puerto ${server.address().port}`);
})
server.on('error', error => logger.error(`Error en servidor ${error}`))