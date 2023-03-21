

class Carrito {
    constructor(productos){
    this.productos=productos;}

    agregarProducto(Producto){
        this.productos.push(Producto)
    }
    quitarProducto(Producto){
        this.productos.splice(Producto)
    }
}

let carrito= new Carrito ([]);


