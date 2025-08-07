

/**
 * Lee un parámetro específico de la URL actual.
 * @returns {string|null} El valor del parámetro 'categoria' o null si no existe.
 */
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('categoria');
}

/**
 * Muestra los productos en un contenedor, filtrados por la categoría de la URL
 * y opcionalmente por un array de características.
 * @param {string} containerId - El ID del div donde se mostrarán los productos.
 * @param {string} jsonPath - La ruta al archivo JSON de productos.
 * @param {string[]} filtros - (Opcional) Un array de características para sub-filtrar.
 */
export function mostrarProductos(containerId, jsonPath, filtros = []) {
    const contenedor = document.getElementById(containerId);
    if (!contenedor) return; // Si el contenedor no está en la página, no hace nada.

    const categoria = getCategoryFromURL();
    if (!categoria) {
        // Si no hay categoría en la URL, no mostramos nada.
        // O podrías mostrar un mensaje como: contenedor.innerHTML = "<p>Selecciona una categoría.</p>";
        return;
    }

    // Ruta base para las imágenes de los productos
    const urlImagenBase = "/imagenes/productos/";

    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            contenedor.innerHTML = ''; // Limpia el contenedor antes de añadir productos

            const productosFiltrados = data.filter(producto => {
                // Primero, filtra por la categoría principal
                if (producto.categoria !== categoria) {
                    return false;
                }
                // Luego, si hay sub-filtros, los aplica
                if (filtros.length > 0) {
                    const coincide = producto.caracteristicas.some(caracteristica => filtros.includes(caracteristica));
                    return coincide; // Devuelve true solo si coincide con los filtros
                }
                return true; // Si no hay filtros, pasa el filtro de categoría
            });

            if (productosFiltrados.length === 0) {
                contenedor.innerHTML = "<p>No se encontraron productos con estos filtros.</p>";
                return;
            }
            
            // Dibuja cada producto que pasó los filtros
            productosFiltrados.forEach(producto => {
                const divProducto = document.createElement("div");
                divProducto.className = "divProducto";
                // Usamos template literals para un código más limpio
                divProducto.innerHTML = `
                    <a href="#">
                        <img src="${urlImagenBase}${producto.fotoPortada}" alt="Foto de ${producto.nombre}">
                        <p>${producto.nombre}</p>
                        <h4>$${producto.precio.toLocaleString('es-CO')}</h4>
                    </a>
                `;
                contenedor.appendChild(divProducto);
            });
        })
        .catch(error => console.error('Error al cargar y filtrar productos:', error));
}