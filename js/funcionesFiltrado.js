
export const pasarPagina = () =>{
    
    const params = new URLSearchParams(window.location.search);
    
    mostrarProductos(params.get("categoria"), params.getAll("filtros"))
}

const mostrarProductos = (categoria, filtros) =>{

    const contenedor = document.getElementById("contenedorProductos")
    fetch("../data/muestraProductos.json").then(response => response.json()).then(data => {
    
        let posiblesEtiquetas = {caracteristicas:[],color:[],talla:[]}
        let contadorProductos = 0
        for (let index = 0; index < data.length; index++) {

            if (data[index].categoria === categoria){
                const producto = data[index]
                    
                    if (filtros.length > 0) {
                        const coincide = filtros.includes(producto.caracteristicas);
                        
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

                if (producto.caracteristicas != "" && !posiblesEtiquetas.caracteristicas.includes(producto.caracteristicas)) {
                    posiblesEtiquetas.caracteristicas.push(producto.caracteristicas)
                }

                if (producto.tonalidad != "" && !posiblesEtiquetas.color.includes(producto.tonalidad)) {
                    posiblesEtiquetas.color.push(producto.tonalidad)
                }
            }
            
            
        }
        
    document.getElementById("cantidadProductos").textContent = contadorProductos + " productos"
        return posiblesEtiquetas
    })        
}



export function mostrarFiltros(filtros){

    const btnFiltro = document.getElementById("filtros")
    const divProductos = document.getElementById("contenedorProductos")
    const divFiltros = document.getElementById("divFiltros")
    btnFiltro.addEventListener("click",()=>{

        if (divProductos.style.width == "100%"){
            divProductos.style.width = "70%"


            for (let index = 0; index < Object.keys(filtros).length; index++) {
                
                const divFiltro = document.createElement("div")
                divFiltro.className = Object.keys(filtros)[index] + " filtro"

                divFiltro.addEventListener("click", ()=>{
                    if (divCaracteristicas.style.height == "0px") {
                        divCaracteristicas.style.height = divCaracteristicas.scrollHeight + "px" 
                        icon.src = "../imagenes/flechaArriba.png"

                    }else{
                        divCaracteristicas.style.height = "0px"
                        icon.src = "../imagenes/flechaAbajo.png"
                    }
                    
                })

                const divCaracteristicas = document.createElement("div")
                divCaracteristicas.className = "divCaracteristicas"

                let texto = document.createElement("h2")
                texto.textContent = Object.keys(filtros)[index]

                let icon = document.createElement("img")
                icon.src = "../imagenes/flechaAbajo.png"

                divFiltro.appendChild(texto)
                divFiltro.appendChild(icon)
                
                divFiltros.appendChild(divFiltro)
                divFiltros.appendChild(divCaracteristicas)

                let botonesFiltrado = ["una cosa","dos cosas"]

                for (let cantidad = 0; cantidad < botonesFiltrado.length; cantidad++) {
                    
                    let boton = document.createElement("div") 
                    boton.className = "caracteristicaFiltrar"

                    let textoBoton = document.createElement("label")
                    textoBoton.textContent = botonesFiltrado[cantidad]

                    boton.appendChild(textoBoton)
                    divCaracteristicas.appendChild(boton)
                    
                }

            }

        }else{
            divProductos.style.width = "100%"

            divFiltros.innerHTML = ""
        }
    })
}

