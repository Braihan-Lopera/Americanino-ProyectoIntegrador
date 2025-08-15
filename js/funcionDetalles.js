import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

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

                const rutaPortada = "../imagenes/fotosProductos/" + producto.elementos[0].fotosProducto[0].replace(/^\.\.\/imagenes\//, "")

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
                precio.className = "precioProducto"

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


                    talla.addEventListener("click", () => {

                        let tallas = document.querySelectorAll(".talla")
                        tallas.forEach(t => {
                            t.style.backgroundColor = ""
                            t.style.color = "black";
                        })
                        seleccionTalla = Object.keys(producto.cantidades)[index]
                        talla.style.backgroundColor = "rgba(26, 26, 122, 1)"
                        talla.style.color = "rgba(255, 255, 255, 1)"

                    })

                }

                //Boton de compra
                const botonCompra = document.createElement("button")
                botonCompra.id = "botonCompra"
                botonCompra.className = "boton-Compra"
                botonCompra.textContent = "agregar al carrito"
                const descripcion = document.createElement("p")
                descripcion.id = "descripcionProducto"
                descripcion.className = "descripcionProducto"
                descripcion.textContent = producto.descripcion
                const paisFabricacion = document.createElement("P")
                paisFabricacion.className = "paisFabricacion"
                paisFabricacion.textContent = producto.paisFabricacion
                const empresaFabricacion = document.createElement("p")
                empresaFabricacion.className = "empresaFabricacion"
                empresaFabricacion.textContent = producto.fabricante


                botonCompra.addEventListener("click", async () => {
                    if (!seleccionTalla) {
                        return Swal.fire({text:"Por favor selecciona una talla antes de agregar al carrito."});
                    }

                    // Cargar datos desde JSON
                    const respuesta = await fetch('../data/muestraProductos.json');
                    const data = await respuesta.json();
                    const producto = data.find(item => item.id == id);

                    if (!producto) {
                        return Swal.fire({
                            title: "Producto no encontrado.",
                            icon: "question"
                        });
                    }

                    // Stock disponible para la talla seleccionada
                    const stockDisponible = producto.cantidades[seleccionTalla] || 0;

                    let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
                    const indexExistente = productosGuardados.findIndex(
                        p => p.id === id && p.talla === seleccionTalla
                    );

                    let cantidadEnCarrito = indexExistente !== -1 ? productosGuardados[indexExistente].cantidad : 0;

                    // Validar contra stock
                    if (cantidadEnCarrito + 1 > stockDisponible) {
                        return Swal.fire({text:`No puedes agregar más de ${stockDisponible} unidades para la talla ${seleccionTalla}.`});

                    }

                    // Agregar o actualizar cantidad
                    if (indexExistente !== -1) {
                        productosGuardados[indexExistente].cantidad += 1;
                    } else {
                        productosGuardados.push({ id: id, talla: seleccionTalla, cantidad: 1 });
                    }

                    localStorage.setItem("productos", JSON.stringify(productosGuardados));

                    // Avisar al carrito
                    window.dispatchEvent(new CustomEvent("productoAgregado"));
                });





                infoProducto.appendChild(nombre)
                infoProducto.appendChild(precio)
                infoProducto.appendChild(divTallas)
                infoProducto.appendChild(botonCompra)
                infoProducto.appendChild(descripcion)
                infoProducto.appendChild(paisFabricacion)
                infoProducto.appendChild(empresaFabricacion)
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