


funcionesMain()
function funcionesMain(){
    // LOGEO DEL USUARIO
    // darBienvenida ();
    titulo();
}
funcionesCarro()
function funcionesCarro(){
    // VACIA TODO EL CARRO
    vaciarCarrito();
    // RETIRA DEL STORAGE EL CARRO GUARDADO POR EL USUARIO
    retirarCarritoStorage();

}

function titulo(){
    const titulo=document.getElementsByClassName("encabezado__titulo")[0];
    titulo.addEventListener("click",()=>{
        location.reload();
    })
}