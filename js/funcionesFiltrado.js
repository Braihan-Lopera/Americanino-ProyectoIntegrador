
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
                link.href = `./paginaProductos.html?categoria=${categoria}&id=${producto.id}`;
                

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

//funcion para mostrar detalles:

export function mostrarDetalleProducto(id) {
    console.log("mostrando detalles del producto con id:", id);

    fetch("../data/muestraProductos.json")
        .then(response => response.json())
        .then(data => {
            const producto = data.find(item => item.id == id)
            if (producto) {
                console.log("producto encontrado: ", producto)
                const contenedor = document.getElementById("contenedorProductos")
                contenedor.innerHTML = ""

            
                const divDetalle = document.createElement("div")
                divDetalle.className = "detalleProducto"

                
                const galeria = document.createElement("div")
                galeria.className = "galeriaProducto"

                
                const miniaturas = document.createElement("div")
                miniaturas.id = "miniaturas"

                
                const contenedorImgPrincipal = document.createElement("div")
                contenedorImgPrincipal.className = "contenedorImgPrincipal"

                const imgPrincipal = document.createElement("img")
                imgPrincipal.src = "../imagenes/" + producto.fotoPortada
                imgPrincipal.alt = producto.nombre
                imgPrincipal.className = "imagen-principal"

                contenedorImgPrincipal.appendChild(imgPrincipal)

                
                if (producto.elementos && producto.elementos.length > 0) {
                    const fotos = producto.elementos[0].fotosProducto
                    console.log("Miniaturas encontradas:", fotos)
                    fotos.forEach((foto, index) => {
                        const imgMini = document.createElement("img")
                        imgMini.src = foto
                        imgMini.classList.add("miniatura")
                        imgMini.addEventListener("click", () => {
                            console.log(`Miniatura ${index + 1} clickeada:`, foto)
                            imgPrincipal.src = foto
                        });
                        miniaturas.appendChild(imgMini)
                    });
                }

                galeria.appendChild(miniaturas)
                galeria.appendChild(contenedorImgPrincipal)

                
                const infoProducto = document.createElement("div")
                infoProducto.className = "infoProducto"

                const nombre = document.createElement("h2")
                nombre.textContent = producto.nombre

                const precio = document.createElement("p")
                precio.textContent = "$" + producto.precio

                const descripcion = document.createElement("p")
                descripcion.textContent = producto.descripcion

                infoProducto.appendChild(nombre)
                infoProducto.appendChild(precio)
                infoProducto.appendChild(descripcion)

                divDetalle.appendChild(galeria)
                divDetalle.appendChild(infoProducto)
                contenedor.appendChild(divDetalle)

            } else {
                console.log("producto no encontrado")
            }
        })
        .catch(error => {
            console.error("Error al cargar el json", error)
        });
}
export function mostrarFiltros(){

}
