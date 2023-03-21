
// CARRITO DE COMPRAS


function agregarProducto (idProducto){
    const producto =productos.find(producto=>producto.id==idProducto);
    carrito.productos.push(producto);
    localStorage.setItem('carrito',JSON.stringify(carrito))
    mostrarEnCarro();
    contadorProducto();
}

function quitarProducto(idProduc){
    const producto =carrito.productos.find(producto=>producto.id==idProduc);
    const indice=carrito.productos.indexOf(producto)
    carrito.productos.splice(indice,1);
    localStorage.setItem('carrito',JSON.stringify(carrito))
    mostrarEnCarro();
    contadorProducto();

}

    function mostrarEnCarro (){
        const carroLateral = document.getElementsByClassName("offcanvas-body")[0];
        carroLateral.innerHTML="";
        carrito.productos.forEach(producto=>{
            const {id,img,nombre,precio}=producto
            const productoEnCarro = document.createElement("div")
            productoEnCarro.setAttribute("class","principal__costado__productos__tienda producto__en__carro"+id)
            productoEnCarro.innerHTML=(`<img class="principal__costado__productos__tienda__imagen" height="80" src="${img}" alt="${nombre}">
                                                    <div class="principal__costado__productos__tienda__parrafos"><p class="principal__costado__productos__tienda__parrafos__1">${nombre}</p>
                                                    <p class="principal__costado__productos__tienda__parrafos__2">${precio}</p></div>
                                                    <div class:"principal__costado__productos__tienda__boton"><button class="principal__costado__productos__tienda__boton__1" onclick="quitarProducto('${id}') "><img height="20" src="./complementos/logos/borrar.webp" alt="borrar"></button></div>`)
            carroLateral.appendChild(productoEnCarro);
        });
    }


function vaciarCarrito(){
    const botonVaciar=document.getElementsByClassName("botonescarrito__vaciarlo")[0]
    botonVaciar.addEventListener ("click",()=>{
        carrito.productos=[];
        localStorage.setItem('carrito',JSON.stringify(carrito))
        mostrarEnCarro();
        contadorProducto();
    })}

    function retirarCarritoStorage(){
        let carrito=JSON.parse(localStorage.getItem("carrito"))
        let contador=JSON.parse(localStorage.getItem("contador"))
        if(carrito!==[]&&carrito!==null){
            recargarCarro(carrito)
            comprarCarro();
            let cont=document.getElementsByClassName("contadorCarrito")[0]
            cont.innerHTML=`${contador}`
        }
    }
        function recargarCarro(carrito){
            const carro = document.getElementsByClassName("offcanvas-body")[0];
            carro.innerHTML="";
            carrito.productos.forEach(producto=>{
                const {id,img,nombre,precio}=producto
                const productoEnCarro = document.createElement("div")
                productoEnCarro.setAttribute("class","principal__costado__productos__tienda producto__en__carro"+id)
                productoEnCarro.innerHTML=(`<img class="principal__costado__productos__tienda__imagen" height="80" src="${img}" alt="${nombre}">
                                                        <div class="principal__costado__productos__tienda__parrafos"><p class="principal__costado__productos__tienda__parrafos__1">${nombre}</p>
                                                        <p class="principal__costado__productos__tienda__parrafos__2">${precio}</p></div>
                                                        <div class="principal__costado__productos__tienda__boton"><button class="principal__costado__productos__tienda__boton__1" onclick="quitarProducto('${id}') "><img height="20" src="./complementos/logos/borrar.webp" alt="borrar"></button></div>`)
                carro.appendChild(productoEnCarro);
                
        })
    }

function comprarCarro(){
    const botonCompra=document.getElementsByClassName("botonescarrito__comprar")[0]
    botonCompra.addEventListener ("click",()=>{
        alertaCompra();}
    )}


function contadorProducto(){
    let productosLs
    let contador=0
    productosLs=retirarCarritoStorage()
    carrito.productos.forEach(producto=>{
        contador++;
    })
    let cont=document.getElementsByClassName("contadorCarrito")[0]
    cont.innerHTML=`${contador}`
    localStorage.setItem('contador',JSON.stringify(contador))
}







