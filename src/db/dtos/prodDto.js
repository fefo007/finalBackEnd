
class ProdDto {
    constructor({name,price,platform,category,description,code,url,stock,id}){
        this.name=name
        this.price=price
        this.platform=platform
        this.category=category
        this.description=description
        this.code=code
        this.url=url
        this.stock=stock
        this.id=id
    }
}

function asProdDto(prods) {
    if(Array.isArray(prods)){
        return prods.map(prods => new ProdDto(prods))
    }else{
        return new ProdDto()
    }
}

module.exports={asProdDto}