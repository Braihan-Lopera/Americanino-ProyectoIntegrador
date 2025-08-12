export const pasarPagina = async () =>{
    
    const params = new URLSearchParams(window.location.search);
    
    const filtros = {};

    for (const key of params.keys()) {
        if (key === "categoria") continue;
        filtros[key] = params.getAll(key);
    }

    let etiquetas = await mostrarProductos(params.get("categoria"),filtros)
    return etiquetas
}

const mostrarProductos = async (categoria, filtros) =>{

    const contenedor = document.getElementById("contenedorProductos")
    contenedor.innerHTML = ""
    const response = await fetch("../data/muestraProductos.json");
    const data = await response.json();
    

        let posiblesEtiquetas = {caracteristicas:[],tonalidad:[],tallas:[]}
        let contadorProductos = 0
        for (let index = 0; index < data.length; index++) {

            if (data[index].categoria === categoria){
                const producto = data[index]
                    
                let pasaFiltros = true;
                for (const claveFiltro in filtros) {
                    const valoresFiltro = filtros[claveFiltro];

                    let valorProducto = producto[claveFiltro];

                    if (claveFiltro === "tallas") {
                        valorProducto = Object.keys(producto.cantidades || {});
                    }

                    if (Array.isArray(valorProducto)) {
                        
                        if (!valoresFiltro.some(vf => valorProducto.includes(vf))) {
                            pasaFiltros = false;
                            break;
                        }
                    } else {
                        
                        if (!valoresFiltro.includes(valorProducto)) {
                            pasaFiltros = false;
                            break;
                        }
                    }
                }
    
                if (!pasaFiltros) continue;
    
                const divProducto = document.createElement("div");
                divProducto.className = "divProducto";
    
                const link = document.createElement("a");
                link.href = `../html/detallesProducto.html?categoria=${categoria}&id=${producto.id}`
    
                const portada = document.createElement("img");
                const urlImagen = "../imagenes/fotosProductos/";
                portada.src = urlImagen + producto.fotoPortada;
    
                const nombreProducto = document.createElement("p");
                nombreProducto.textContent = producto.nombre;
    
                const precioProducto = document.createElement("h4");
                precioProducto.textContent = "$" + producto.precio;
    
                divProducto.appendChild(link);
                link.appendChild(portada);
                link.appendChild(nombreProducto);
                link.appendChild(precioProducto);
                contenedor.appendChild(divProducto);
    
                contadorProductos++;
    
                if (producto.caracteristicas && !posiblesEtiquetas.caracteristicas.includes(producto.caracteristicas)) {
                    posiblesEtiquetas.caracteristicas.push(producto.caracteristicas);
                }
    
                if (producto.tonalidad && !posiblesEtiquetas.tonalidad.includes(producto.tonalidad)) {
                    posiblesEtiquetas.tonalidad.push(producto.tonalidad);
                }
    
                if (producto.cantidades && Object.keys(producto.cantidades).length > 0) {
                    Object.keys(producto.cantidades).forEach(talla => {
                        if (!posiblesEtiquetas.tallas.includes(talla)) {
                            posiblesEtiquetas.tallas.push(talla);
                        }
                    });
                }
            }
        }
    
        document.getElementById("cantidadProductos").textContent = contadorProductos + " productos";
        return posiblesEtiquetas;
    };

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
                if (Object.keys(filtros)[index] == "tonalidad") {
                    texto.textContent = "color"
                }else texto.textContent = Object.keys(filtros)[index]
                

                let icon = document.createElement("img")
                icon.src = "../imagenes/flechaAbajo.png"

                divFiltro.appendChild(texto)
                divFiltro.appendChild(icon)
                
                divFiltros.appendChild(divFiltro)
                divFiltros.appendChild(divCaracteristicas)

                let botonesFiltrado = []
                filtros[Object.keys(filtros)[index]].forEach(elementos => {
                    botonesFiltrado.push(elementos)
                });
                

                for (let cantidad = 0; cantidad < botonesFiltrado.length; cantidad++) {
                    
                    let boton = document.createElement("div") 
                    boton.className = "caracteristicaFiltrar"

                    let textoBoton = document.createElement("label")
                    textoBoton.textContent = botonesFiltrado[cantidad]

                    boton.appendChild(textoBoton)
                    divCaracteristicas.appendChild(boton)
                    
                }

            }
                let botones = document.querySelectorAll(".caracteristicaFiltrar")
                botones.forEach(boton => {
                    boton.addEventListener("click", () => {
                        const divCaracteristicas = boton.parentElement;
                        const divFiltro = divCaracteristicas.previousElementSibling;
                        let filtroNombre
                        if (divFiltro.querySelector("h2").textContent.trim() == "color") {
                            filtroNombre = "tonalidad"
                        }else filtroNombre = divFiltro.querySelector("h2").textContent.trim()
                        
                        const textoBtn = boton.querySelector("label").textContent.trim();
                
                        let params = new URLSearchParams(window.location.search);
                
                        let valoresActuales = params.getAll(filtroNombre);
                
                        if (valoresActuales.includes(textoBtn)) {
                            valoresActuales = valoresActuales.filter(v => v !== textoBtn);
                            params.delete(filtroNombre);
                            valoresActuales.forEach(v => params.append(filtroNombre, v));
                            boton.style.backgroundColor = "white"
                        } else {
                            params.append(filtroNombre, textoBtn);
                            boton.style.backgroundColor = "rgb(160, 166, 184)"
                        }
                
                        history.replaceState(null, "", window.location.pathname + "?" + params.toString());
                
                        pasarPagina().then(etiquetas => {
                            mostrarFiltros(etiquetas);
                        });
                    });
                });

        }else{
            divProductos.style.width = "100%"

            divFiltros.innerHTML = ""
        }
    })
}
