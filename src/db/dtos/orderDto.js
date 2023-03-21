
class OrderDto {
    constructor({products,id,timestamp,state,email}){
        this.products=products
        this.id=id
        this.timestamp=timestamp
        this.state=state
        this.email=email
    }
}

function asOrderDto(orders) {
    if(Array.isArray(orders)){
        return orders.map(orders => new OrderDto(orders))
    }else{
        return new OrderDto()
    }
}

module.exports={asOrderDto}