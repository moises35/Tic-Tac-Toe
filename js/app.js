// Variables globales
const contenedor = document.getElementById("contenedor");
const nombreJugadores = ["1: ❌", "2: 🟢"];
const jugadorTurno = document.getElementById("jugador");
const botonReiniciar = document.getElementById("game_restart");
const condicionesGanadoras = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];
let jugadorActual = "❌";
let juegoTerminado = false;

// Evento que detecta los clicks para colocar los jugadores
contenedor.addEventListener("click", (evento)=> {
    if(!juegoTerminado) {
        // Verificamos que sea una cuadricula del juego
        if(evento.target.classList[0] === 'cell') {
            let contenidoActual = evento.target.innerHTML;
    
            // Se verifica que la casilla esté vacia
            if(contenidoActual === '') {
                evento.target.textContent = jugadorActual;
    
                // Verificamos si hay algún ganador
                juegoTerminado = gameOver(jugadorActual);
                if(juegoTerminado) {

                    console.log(`El jugador ${jugadorActual} gano el juego`);
                } else {
                    // Si es que el juego continua entonces seguimos
                    jugadorTurno.textContent = jugadorActual === "❌"? nombreJugadores[1]: nombreJugadores[0];
                    jugadorActual = jugadorActual === "❌"? "🟢": "❌";
                }
    
            } 
        }
    } else {

    }
});


function gameOver(gamer) {
    for(let i = 0; i < condicionesGanadoras.length; i++) {
        for(let k = 0; k < 3; k++) {
            let indiceAux = condicionesGanadoras[i][k];
            let cajitaAnalizar = document.querySelector(`div[data-cell-index="${indiceAux}"]`);
            if(cajitaAnalizar.innerHTML !== gamer) {
                break;
            } else if(k == 2) {
                return true;
            }  
        }
    }
    return false;
}

// Evento que detecta el boton reiniciar
botonReiniciar.addEventListener("click", reiniciarJuego);

// Función para reiniciar
function reiniciarJuego() {
    let longitud = contenedor.children.length;
    for(let i = 0; i < longitud; i++) {
        contenedor.children[i].textContent = "";
    }
    jugadorTurno.textContent = nombreJugadores[0];
    jugadorActual = "❌"
    console.log("Juego reiniciado");
}