const contenedor = document.getElementById("contenedorProductos")

export const pasarPagina = (categoria) =>{
    window.location.href = "./html/paginaProductos.html"
    mostrarProductos(categoria)
}

export const mostrarProductos = (categoria) =>{
fetch("../data/muestraProductos.json").then(response => response.json()).then(data => {
    
        for (let index = 0; index < data.length; index++) {

            if (data[index].categoria === categoria){
               const divProducto = document.createElement("div")
                divProducto.className = "divProducto"

                const link = document.createElement("a")
                link.href = "about:blank"

                const portada = document.createElement("img")
                portada.src = data[index].fotoPortada

                const nombreProducto = document.createElement("p")
                nombreProducto.textContent = data[index].nombre

                const precioProducto = document.createElement("h4")
                precioProducto.textContent = "$"+data[index].precio

                divProducto.appendChild(link)
                link.appendChild(portada)
                link.appendChild(nombreProducto)
                link.appendChild(precioProducto) 
                contenedor.appendChild(divProducto)  
            }
                          
            
        }
        
    })        
}

if (contenedor) mostrarProductos()
