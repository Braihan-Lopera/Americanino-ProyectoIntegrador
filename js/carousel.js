

/**
 * Controla el carrusel de la página de inicio.
 */
export function setupCarousel() {
    const carousel = document.querySelector('.carrusel');
    // Si no hay carrusel en esta página, no hace nada.
    if (!carousel) return;
    
    const btnAdelante = document.getElementById("adelante");
    const btnAtras = document.getElementById("atras");
    const carasContainer = carousel.querySelector(".caras");
    const caras = carousel.querySelectorAll(".cara");
    let index = 0;

    // Autoplay del video inicial
    const videoPrincipal = caras[0]?.querySelector("video");
    if (videoPrincipal) {
        videoPrincipal.loop = true;
        videoPrincipal.play();
    }

    function mostrarCara(i) {
        carasContainer.style.transform = `translateX(-${i * 100}%)`;
        // Pausa todos los videos
        caras.forEach(cara => {
            const video = cara.querySelector("video");
            if (video) video.pause();
        });
        // Reproduce el video de la cara activa
        const videoActivo = caras[i]?.querySelector("video");
        if (videoActivo) {
            videoActivo.currentTime = 0;
            videoActivo.play();
        }
    }

    btnAtras.addEventListener("click", () => {
        index = (index === 0) ? caras.length - 1 : index - 1;
        mostrarCara(index);
    });

    btnAdelante.addEventListener("click", () => {
        index = (index === caras.length - 1) ? 0 : index + 1;
        mostrarCara(index);
    });
}