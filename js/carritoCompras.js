export async function  mostrarCarrito() {
    const btnCarrito = document.getElementById('btnCarrito');
    const response = await fetch("../data/muestraProductos.json");
    const data = await response.json();

    btnCarrito.addEventListener('click', () => {

        

        let divCarrito = document.querySelector('.divCarrito');

       
        if (!divCarrito) {
            divCarrito = document.createElement('div');
            divCarrito.className = 'divCarrito';
            divCarrito.id = 'cartDrawer';


            if (JSON.parse(localStorage.getItem("productos")).length == 0){
                divCarrito.innerHTML = `
                <button class="btn-cerrar" id="cerrarCarrito">×</button>
                <h2>Tu carrito de compras</h2>
                <div class="icono-carrito">🛒</div>
                <p>Tu carrito está vacía</p>
                <a href="#">Ver todo</a>
            `;
            }else{
                let productosGuardados = JSON.parse(localStorage.getItem("productos")) || []
                let divtexto = document.createElement("div")
                divtexto.innerHTML =  `<button class="btn-cerrar" id="cerrarCarrito">×</button>
                <h2>Tu carrito de compras</h2>`
                divCarrito.appendChild(divtexto)
                productosGuardados.forEach(productoGuardado => {
                    
                    for (let index = 0; index < data.length; index++) {
                        if (data[index].id == productoGuardado.id) {

                            let divProductoCarrito = document.createElement("div")
                            divProductoCarrito.className = "divProductoCarrito"
                            divProductoCarrito.innerHTML = `<div class = "contenedorCarrito1"><img src="../imagenes/fotosProductos/${data[index].fotoPortada}"></div>
                            <div class = "contenedorCarrito2"><p>${data[index].nombre}</p>
                            <p>$ ${data[index].precio}</p>
                            <p>${productoGuardado.talla}</p></div>`
                            
                            divCarrito.appendChild(divProductoCarrito)
                            
                        }
                    }

                });
            }
            

            document.body.appendChild(divCarrito);

            // Evento para cerrar
            document.getElementById('cerrarCarrito').addEventListener('click', () => {
                divCarrito.classList.remove('mostrar');
            });
        }

        // Mostrar carrito (deslizar desde la derecha)
        divCarrito.classList.add('mostrar');
    });
}

