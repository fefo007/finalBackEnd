
// FILTRA LAS CATEGORIAS DEL ASIDE DEL LADO DERECHO DEL SITIO WEB

function filtarCategorias1(productos){
    const cat1=document.getElementsByClassName("dropdown-item")[0];
    const cat2=document.getElementsByClassName("dropdown-item")[1];
    const cat3=document.getElementsByClassName("dropdown-item")[2];
    const cat4=document.getElementsByClassName("dropdown-item")[3];
    const botones=document.getElementsByClassName("encabezado__pagina")[0];
    cat1.addEventListener("click",()=>{mostrarPlataforma("nintendo",productos);botones.innerHTML=""});
    cat2.addEventListener("click",()=>{mostrarPlataforma("pc",productos);botones.innerHTML=""});
    cat3.addEventListener("click",()=>{mostrarPlataforma("playstation",productos);botones.innerHTML=""});
    cat4.addEventListener("click",()=>{mostrarPlataforma("xbox",productos);botones.innerHTML=""});
    }

    function filtarCategorias2(productos){
        const cat5=document.getElementsByClassName("dropdown-item")[4];
        const cat6=document.getElementsByClassName("dropdown-item")[5];
        const cat7=document.getElementsByClassName("dropdown-item")[6];
        const cat8=document.getElementsByClassName("dropdown-item")[7];
        const botones=document.getElementsByClassName("encabezado__pagina")[0];
        cat5.addEventListener("click",()=>{mostrarCategoria("Accesorio",productos);botones.innerHTML=""});
        cat6.addEventListener("click",()=>{mostrarCategoria("Consola",productos);botones.innerHTML=""});
        cat7.addEventListener("click",()=>{mostrarCategoria("Gift Card",productos);botones.innerHTML=""});
        cat8.addEventListener("click",()=>{mostrarCategoria("Videojuego",productos);botones.innerHTML=""});
        }


        function mostrarPlataforma (nombrePlataforma,productos){
            const productosPlataforma=productos.filter((producto)=>producto.platform.toLowerCase()===nombrePlataforma.toLowerCase())
            const paginaPlataforma=document.getElementsByClassName("principal__seccion")[0]
            paginaPlataforma.innerHTML=""
            cargarProducto(productosPlataforma)
        };
    
        function mostrarCategoria (nombreCategoria,productos){
            const productoCategoria=productos.filter((producto)=>producto.category.toLowerCase()===nombreCategoria.toLowerCase())
            const paginaCategoria=document.getElementsByClassName("principal__seccion")[0]
            paginaCategoria.innerHTML=""
            cargarProducto(productoCategoria)
        };
    