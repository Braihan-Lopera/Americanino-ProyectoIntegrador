
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

        if(document.getElementById("cantidadProductos"))document.getElementById("cantidadProductos").textContent = contadorProductos + " productos"

    })        
}



export function mostrarFiltros(){

}