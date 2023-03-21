
class CartDto {
    constructor({id,timestamp,products}){
        this.id=id
        this.timestamp=timestamp
        this.products=products
    }
}

function asCartDto(carts) {
    if(Array.isArray(carts)){
        return carts.map(carts => new CartDto(carts))
    }else{
        return new CartDto()
    }
}

module.exports={asCartDto}