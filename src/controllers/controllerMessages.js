const {
    getAll,
    getByUsername,
    save} = require('../service/serviceMessages')


const getMessages = async (req,res)=>{
    const messages =await getAll()
    if(messages){
        res.status(200).render('messages',{messages})
    }else{
        res.status(400).json({error:'no se encontro la lista de mensajes'})
    }
}

const getUserMessages =  async (req,res)=>{
    let messageUser = req.params.username
    const message=await getByUsername(messageUser)
    if(message){
        res.status(200).json(message)
    }else{
        res.status(400).json({error:`no se encontro el mensaje con este usuario :${JSON.stringify(messageUser)}`})
    }
}

const postMessages =  async (req,res)=>{
    let message = req.body
    const messageSaved =await save({...message,timestamp:new Date().toLocaleString()})
    if(messageSaved){
        res.status(200).redirect('/mensajes')
    }else{
        res.status(400).json({error:`no se pudo agregar el mensage : ${JSON.stringify(message)}`})
    }
}


module.exports={
    getMessages,
    getUserMessages,
    postMessages}