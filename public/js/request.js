

let url =`http://localhost:8080`

const getProducts = async ()=>{
    try {
        const response = await axios.get(`${url}/productos/front`)
        const productos = response.data
        buscador(productos)
        filtarCategorias1(productos);
        filtarCategorias2(productos);
        cargarProducto(productos)
    } catch (error) {
        console.log(error)
    }
}
getProducts()

const postUser = async ()=>{
    let nom=document.getElementsByClassName("encabezado__logear__campoN")[0].value
    let clav=document.getElementsByClassName("encabezado__logear__campoC")[0].value
    try {
        const response =await axios.post(`${url}/usuarios/login`,{
            username:nom,
            password:clav
        })
        cambiarLog(response.data.username)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("usuario",JSON.stringify(response.data.username))
        
    } catch (error) {
        console.log(error)
    }
}

const deslogeo = async ()=>{
    try {
        const response = await axios.get(`${url}/usuarios/logout`)
        let log=document.getElementsByClassName("encabezado__logear")[0]
        log.innerHTML=""
        log.innerHTML=`<h2 class="encabezado__logear__usuario"> ${response.data}</h2>`
    } catch (error) {
        console.log(error)
    }
}

const sistemInfo = async ()=>{
    try {
        const response = await axios.get(`${url}/usuarios/sistemInfo`,
        {headers:
            {Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiZmVkZSIsInBhc3N3b3JkIjoiZmVkZSJ9LCJpYXQiOjE2NzkzNTAzNzUsImV4cCI6MTY3OTQzNjc3NX0.XJE8YtExDLU5f-EmL7yzETyOPbgZ0hq_goYeck-vTAc'}})
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}
sistemInfo()