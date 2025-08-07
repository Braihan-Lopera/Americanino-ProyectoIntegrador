// js/components.js

/**
 * Carga un componente HTML (navbar, footer) y lo inyecta en un elemento.
 */
export function loadComponent(path, elementId) {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        fetch(path)
            .then(response => response.ok ? response.text() : Promise.reject('Error'))
            .then(html => {
                targetElement.innerHTML = html;
            })
            .catch(error => console.error(`Error al cargar ${elementId}:`, error));
    }
}

/**
 * Crea paneles de imágenes dinámicamente en un contenedor.
 */
export function crearPanel(imagenes, links, contenedorId, nombre) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    // Asigna una clase CSS según el número de imágenes
    const classMap = ["", "panel1x1", "panel2x1", "panel3x1", "panel4x1"];
    contenedor.className = classMap[imagenes.length] || "";

    for (let i = 0; i < imagenes.length; i++) {
        const link = document.createElement("a");
        link.href = links[i];
        
        const imagen = document.createElement("img");
        imagen.src = imagenes[i];
        imagen.alt = nombre ? `Imagen de ${nombre[i]}` : `Panel ${i + 1}`;

        link.appendChild(imagen);

        if (imagenes.length === 4 && nombre) {
            const texto = document.createElement("h3");
            texto.textContent = nombre[i];
            link.appendChild(texto);

            const textoFuerte = document.createElement("p");
            textoFuerte.textContent = `Ver ${nombre[i].split(" ")[0]}`;
            link.appendChild(textoFuerte);
        }
        contenedor.appendChild(link);
    }
}