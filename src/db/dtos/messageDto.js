
class MessageDto {
    constructor({email,timestamp,body}){
        this.email=email
        this.timestamp=timestamp
        this.body=body
    }
}

function asMessageDto(messages) {
    if(Array.isArray(messages)){
        return messages.map(messages => new MessageDto(messages))
    }else{
        return new MessageDto()
    }
}

module.exports={asMessageDto}