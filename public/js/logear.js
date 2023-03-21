



    function cambiarLog(usuario){
        if (usuario!==null){
        let log=document.getElementsByClassName("encabezado__logear")[0]
        log.innerHTML=""
        log.innerHTML=`<h2 class="encabezado__logear__usuario"><img width="60" src="./complementos/logos/usuario.webp" alt="usuario"></img>Sesion de ${usuario}</h2>
        <butom class="encabezado__logear__boton" onclick='deslogeo()'> deslogear </butom>`}
    }

    // function darBienvenida(){
        
    //     if (localStorage!==[]&&localStorage!==null){
    //         cambiarLog(usuario)
    //     }
    // }
