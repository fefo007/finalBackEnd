const {
    getAllCarts,
    createCart,
    deleteCart,
    getById,
    save,
    deleteById
}= require('../service/serviceCarts')

const getCarts =async (req,res)=>{
    const carts =await getAllCarts()
    if(carts){
        res.status(200).json(carts)
    }else{
        res.status(400).json({error:'no se encontro la lista de carritos'})
    }
}

const getCart = async (req,res)=>{
    const cart =await createCart()
    if(cart){
        res.status(200).json(cart)
    }else{
        res.status(400).json({error:'no se pudo crear el carrito'})
    }
}

const deleteCar = async (req,res)=>{
    let cartid = req.params.id
    const cart =await deleteCart(cartid)
    if(cart){
        res.status(200).json(cart)
    }else{
        res.status(400).json({error:'no se pudo eliminar el carrito'})
    }
}

const getCartProducts = async (req,res)=>{
    let cartid = req.params.id
    const cart =await getById(cartid)
    if(cart){
        res.status(200).json(cart)
    }else{
        res.status(400).json({error:'no se pudo obtener el carrito'})
    }
}

const postCartProducts = async (req,res)=>{
    let {id,id_prod} = req.params
    const cart = await save(id_prod,id)
    if(cart){
        res.status(200).json(cart)
    }else{
        res.status(400).json({error:'no se pudo guardar el producto en el carrito'})
    }
}

const deleteCartProducts = async (req,res)=>{
    let {id,id_prod} = req.params
    const cart =await deleteById(id_prod,id)
    if(cart){
        res.status(200).json(cart)
    }else{
        res.status(400).json({error:'no se pudo borrar el producto de carrito'})
    }
}

module.exports={
    getCarts,
    getCart,
    deleteCar,
    getCartProducts,
    postCartProducts,
    deleteCartProducts}