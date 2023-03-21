
class UserDto {
    constructor({username,password,email,direction,age,cel,image,id}){
        this.username=username
        this.password=password
        this.email=email
        this.direction=direction
        this.age=age
        this.cel=cel
        this.image=image
        this.id=id
    }
}

function asUserDto(users) {
    if(Array.isArray(users)){
        return users.map(users => new UserDto(users))
    }else{
        return new UserDto()
    }
}

module.exports={asUserDto}