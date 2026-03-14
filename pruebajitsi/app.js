// app.js

// Obtenemos los elementos del HTML
const botonIniciar = document.getElementById('btn-iniciar');
const contenedorLlamada = document.getElementById('contenedor-llamada');

// Guardaremos la instancia de la llamada aquí
let apiUnida = null;

botonIniciar.addEventListener('click', () => {
    // 1. Mostramos el cuadro negro en la web
    contenedorLlamada.style.display = 'block';
    
    // 2. Ocultamos el botón para que no entren dos veces
    botonIniciar.style.display = 'none';

    // 3. Configuramos la llamada de Jitsi
    const dominio = 'meet.jit.si';
    const opciones = {
        // IMPORTANTE: Este es el nombre de la sala. 
        // Si dos usuarios de Learning Swap tienen este mismo nombre, entrarán a la misma llamada.
        roomName: 'LearningSwap_Sala_Matematicas_123', 
        width: '100%',
        height: '100%',
        parentNode: contenedorLlamada,
        lang: 'es', // Forzamos el idioma a español
        configOverwrite: { 
            startWithAudioMuted: false, // Entrar con micro abierto
            startWithVideoMuted: false  // Entrar con cámara abierta
        },
        interfaceConfigOverwrite: {
            // Opcional: puedes ocultar botones que no te sirvan, como invitar u opciones complejas
            TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                'fodeviceselection', 'hangup', 'profile', 'chat', 'settings', 'videoquality'
            ],
            SHOW_JITSI_WATERMARK: false // Quitar la marca de agua si es posible
        }
    };

    // 4. ¡Iniciamos la llamada!
    apiUnida = new JitsiMeetExternalAPI(dominio, opciones);

    // 5. Escuchar eventos (Ejemplo: cuando el usuario cuelga)
    apiUnida.addListener('videoConferenceLeft', () => {
        console.log("El usuario salió de la llamada");
        contenedorLlamada.style.display = 'none';
        botonIniciar.style.display = 'block';
        botonIniciar.innerText = "Volver a entrar";
        apiUnida.dispose(); // Limpiamos la llamada
    });
});
