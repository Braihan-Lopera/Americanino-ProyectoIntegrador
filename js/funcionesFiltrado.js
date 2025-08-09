
export const pasarPagina = () =>{
    
    let filtros = []
    const params = new URLSearchParams(window.location.search);
    
    mostrarProductos(params.get("categoria"), filtros)
}

const mostrarProductos = (categoria, filtros) =>{

    const contenedor = document.getElementById("contenedorProductos")
    fetch("../data/muestraProductos.json").then(response => response.json()).then(data => {
    
        let contadorProductos = 0
        for (let index = 0; index < data.length; index++) {

            if (data[index].categoria === categoria){
                const producto = data[index]
                    
                    if (filtros.length > 0) {
                        const coincide = producto.caracteristicas.some(caracteristica => filtros.includes(caracteristica)
                        )
                        if (!coincide) continue
                    }

               const divProducto = document.createElement("div")
                divProducto.className = "divProducto"

                const link = document.createElement("a")
                link.href = "about:blank"

                const portada = document.createElement("img")
                const urlImagen = "../imagenes/"
                portada.src = urlImagen + producto.fotoPortada
                
                const nombreProducto = document.createElement("p")
                nombreProducto.textContent = producto.nombre

                const precioProducto = document.createElement("h4")
                precioProducto.textContent = "$"+ producto.precio

                divProducto.appendChild(link)
                link.appendChild(portada)
                link.appendChild(nombreProducto)
                link.appendChild(precioProducto) 
                contenedor.appendChild(divProducto)  

                contadorProductos++
            }
        }

    document.getElementById("cantidadProductos").textContent = contadorProductos + " productos"

    })        
}



export function mostrarFiltros(){

    const btnFiltro = document.getElementById("filtros")
    const divProductos = document.getElementById("contenedorProductos")
    const divFiltros = document.getElementById("divFiltros")
    let filtros = ["categorias", "sub-categorias", "color","talla"]
    btnFiltro.addEventListener("click",()=>{

        if (divProductos.style.width == "100%"){
            divProductos.style.width = "70%"


            for (let index = 0; index < filtros.length; index++) {
                
                const divFiltro = document.createElement("div")
                divFiltro.className = filtros[index] + " filtro"

                divFiltro.addEventListener("click", ()=>{
                    if (divCaracteristicas.style.height == "0px") {
                        divCaracteristicas.style.height = "200px"
                        icon.src = "../imagenes/flechaArriba.png"

                    }else{
                        divCaracteristicas.style.height = "0px"
                        icon.src = "../imagenes/flechaAbajo.png"
                    }
                    
                })

                const divCaracteristicas = document.createElement("div")
                divCaracteristicas.className = "divCaracteristicas"

                let texto = document.createElement("h2")
                texto.textContent = filtros[index]

                let icon = document.createElement("img")
                icon.src = "../imagenes/flechaAbajo.png"

                

                divFiltro.appendChild(texto)
                divFiltro.appendChild(icon)
                
                divFiltros.appendChild(divFiltro)
                divFiltros.appendChild(divCaracteristicas)
            }

            

        }else{
            divProductos.style.width = "100%"

            divFiltros.innerHTML = ""
        }



    })

}

