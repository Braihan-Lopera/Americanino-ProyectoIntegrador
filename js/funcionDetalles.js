//funcion para mostrar detalles:

export function mostrarDetalleProducto(id) {
    console.log("mostrando detalles del producto con id:", id);

    fetch("../data/muestraProductos.json")
        .then(response => response.json())
        .then(data => {
            const producto = data.find(item => item.id == id)
            if (producto) {
                console.log("producto encontrado: ", producto)
                const main = document.getElementById("contenedorDetalle")
                const divDetalle = document.createElement("div")
                divDetalle.className = "detalleProducto"

                const galeria = document.createElement("div")
                galeria.className = "galeriaProducto"

                const miniaturas = document.createElement("div")
                miniaturas.id = "miniaturas"

                
                const contenedorImgPrincipal = document.createElement("div")
                contenedorImgPrincipal.className = "contenedorImgPrincipal"

                const imgPrincipal = document.createElement("img")

                const rutaPortada = "../imagenes/fotosProductos/" + producto.fotoPortada.replace(/^\.\.\/imagenes\//, "")

                console.log("Ruta imagen principal:", rutaPortada)
                imgPrincipal.src = rutaPortada
                imgPrincipal.alt = producto.nombre
                imgPrincipal.className = "imagen-principal"

                contenedorImgPrincipal.appendChild(imgPrincipal)

                
                if (producto.elementos && producto.elementos.length > 0) {
                    const fotos = producto.elementos[0].fotosProducto
                    console.log("Miniaturas encontradas:", fotos)
                    fotos.forEach((foto, index) => {

                       

                        const rutaMiniatura = foto.startsWith("../imagenes/fotosProductos/") ? foto : "../imagenes/fotosProductos/" + foto

                        console.log(`Ruta miniatura ${index + 1}:`, rutaMiniatura)
                        const imgMini = document.createElement("img")
                        imgMini.src = rutaMiniatura
                        imgMini.classList.add("miniatura")
                        imgMini.addEventListener("click", () => {
                            console.log(`Miniatura ${index + 1} clickeada:`, rutaMiniatura)
                            imgPrincipal.src = rutaMiniatura
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

                const divTallas = document.createElement("div")
                divTallas.className = "divTallas"

                const tituloTallas = document.createElement("h3")
                tituloTallas.textContent = "Tallas:"

                divTallas.appendChild(tituloTallas)

                let seleccionTalla

                for (let index = 0; index < Object.keys(producto.cantidades).length; index++) {
                    
                    const talla = document.createElement("p")
                    talla.className = "talla"
                    talla.textContent = Object.keys(producto.cantidades)[index]
                    divTallas.appendChild(talla)
                    

                    talla.addEventListener("click",()=>{

                        let tallas = document.querySelectorAll(".talla")
                        tallas.forEach(t => {
                            t.style.backgroundColor = ""
                        })
                        seleccionTalla = Object.keys(producto.cantidades)[index]
                        talla.style.backgroundColor = "rgb(160, 166, 184)"                       
                        
                    })

                }

                //Boton de compra
                const botonCompra = document.createElement("button")
                botonCompra.id = "botonCompra"
                botonCompra.className = "boton-Compra"
                botonCompra.textContent = "agregar al carrito"

                
                botonCompra.addEventListener("click",()=>{

                    let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
                    productosGuardados.push({ id:id, talla:seleccionTalla });
                    localStorage.setItem("productos", JSON.stringify(productosGuardados));

                })

                infoProducto.appendChild(nombre)
                infoProducto.appendChild(precio)
                infoProducto.appendChild(divTallas)
                infoProducto.appendChild(botonCompra)

                divDetalle.appendChild(galeria)
                divDetalle.appendChild(infoProducto)
                main.appendChild(divDetalle)

            } else {
                console.log("producto no encontrado")
            }
        })
        .catch(error => {
            console.error("Error al cargar el json", error)
        })
}