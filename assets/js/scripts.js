function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');

    // Función para alternar entre los videos
    function switchVideo() {
        if (video1.style.display === 'block') {
            video1.style.display = 'none';
            video2.style.display = 'block';
            video2.play();
        } else {
            video2.style.display = 'none';
            video1.style.display = 'block';
            video1.play();
        }
    }

    // Inicialmente, mostrar el primer video y ocultar el segundo
    video1.style.display = 'block';
    video2.style.display = 'none';

    // Cuando el primer video termina, empieza el segundo
    video1.addEventListener('ended', switchVideo);

    // Cuando el segundo video termina, vuelve a reproducir el primero
    video2.addEventListener('ended', switchVideo);
});

// Cargar datos desde el archivo JSON y crear cards
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado y analizado');
    
    fetch('./assets/data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Red error: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos cargados:', data);
            
            const container = document.querySelector('.institutos'); // Selecciona la sección "institutos"
            if (!container) {
                console.error('No se encontró el contenedor de institutos');
                return;
            }

            data.forEach(instituto => {
                // Crear la card
                const card = document.createElement('div');
                card.classList.add('card');

                // Crear el contenido de la card
                card.innerHTML = `
                    <h3>${instituto.Instituto}</h3>
                    <p><strong>Especialidad:</strong> ${instituto.Especialidad}</p>
                    <p><strong>Dirección:</strong> ${instituto.Dirección}</p>
                    <h4>Oferta Académica:</h4>
                    <ul>
                        ${instituto["Oferta Academica"].map(oferta => `<li>${oferta}</li>`).join('')}
                    </ul>
                `;

                // Añadir la card al contenedor
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
