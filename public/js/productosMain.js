

// CARGAR PRODUCTOS EN EL MAIN
function cargarProducto(productos)
{   
    const seccion=document.getElementsByClassName("principal__seccion")[0]
    productos.forEach(producto => {
    const {id,url,name,price,category,platform}=producto
    const unProducto = document.createElement("div");
    unProducto.setAttribute("class", "principal__productos");
    unProducto.innerHTML= ` <img class="principal__productos__imagen" height="200" src="${url}" alt="${name}">
                            <p class="principal__productos__parrafos1">${name}</p>
                            <p class="principal__productos__parrafos2">$${price}</p>
                            <div class="principal__productos__parrafos3"><p class="principal__productos__parrafos3__a">${category}</p>
                                <p class="principal__productos__parrafos3__b">${platform}</p></div>
                            <div class="principal__productos__btn"><button class="principal__productos__btn__btncom onclick='quickOrder()'">Comprar</button>
                            <button class="principal__productos__btn__btncar" onclick="agregarProducto('${id}')">+Carrito</button></div>`;
    seccion.appendChild(unProducto);
    // COMPRAR DIRECTAMENTE
    botonCompra();
    // ENVIAR AL CARRITO
    botonCarro();
})};

// BOTON COMPRAR EN EL MAIN
function botonCompra(){
    const botonCompra = document.getElementsByClassName ("principal__productos__btn__btncom");
    for (const btncom of botonCompra){
    btncom.addEventListener("click",()=>{
        alertaCompra();
    })}}

                function alertaCompra(){
            Swal.fire({
                title: 'Desea realizar la compra?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                color:'#FFE400',
                background:'#066163',
                iconColor: '#FFE400',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText:'Cancelar',
                confirmButtonText: 'Efectuar Compra!'
                }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        color:'#FFE400',
                        background:'#066163',
                        iconColor: '#FFE400',
                        title:'Su Compra fue Exitosa!',
                        text:'Muchas gracias por elegirnos',
                        icon:'success',
                        confirmButtonColor: '#3085d6',})
                    }})
                }

// BOTON SUBIR AL CARRITO EN EL MAIN

function botonCarro(){
    const botonCarro = document.getElementsByClassName ("principal__productos__btn__btncar");
        for (const btncar of botonCarro){
        btncar.addEventListener("click",()=>{
        alertaCarro()
        })}}

        function alertaCarro(){
            Swal.fire({
                color:'#FFE400',
                background:'#066163',
                iconColor: '#FFE400',
                position: 'top-end',
                icon: 'success',
                title: `Agregaste el prodructo al carro`,
                showConfirmButton: false,
                timer: 1500
                })
        }
        


