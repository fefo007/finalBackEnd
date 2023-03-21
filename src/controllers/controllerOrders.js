const {
    getAll,
    getByUsername,
    getById,
    save
}= require('../service/serviceOrders')

const getOrders = async (req,res)=>{
    const orders =await getAll()
    if(orders){
        res.status(200).json(orders)
    }else{
        res.status(400).json({error:'no se encontro la lista de ordenes'})
    }
}

const getUserOrders =  async (req,res)=>{
    let orderUser = req.params.username
    const order=await getByUsername(orderUser)
    if(order){
        res.status(200).json(order)
    }else{
        res.status(400).json({error:`no se encontro la orden con este usuario :${JSON.stringify(orderUser)}`})
    }
}

const getIdOrders = async (req,res)=>{
    let orderId = req.params.id
    const order=await getById(orderId)
    if(order){
        res.status(200).json(order)
    }else{
        res.status(400).json({error:`no se encontro la orden con este id :${JSON.stringify(orderId)}`})
    }
}

const postOrders =  async (req,res)=>{
    let order = req.body
    const orderSaved =await save(order)
    if(orderSaved){
        res.status(200).json(orderSaved)
    }else{
        res.status(400).json({error:`no se pudo agregar la orden : ${JSON.stringify(order)}`})
    }
}

module.exports={
    getOrders,
    getUserOrders,
    getIdOrders,
    postOrders
}