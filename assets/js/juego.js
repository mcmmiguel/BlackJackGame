

// Definiendo PATRÓN MODULO
const miModulo = (() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];


    //Referencias del HTML
    const btnPedir = document.querySelector('#btn-pedir'),
          btnDetener = document.querySelector('#btn-detener'),
          btnNuevoJuego = document.querySelector('#btn-nuevo');

    const puntajeHTML = document.querySelectorAll('small');

    const divCartasJugadores = document.querySelectorAll('.divCartas');
          

    //Esta función inicaliza el juego
    const iniciarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntajeHTML.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    };
    

    //Esta funcion crea un nuevo deck aleatorio. Es decir, genera las cartas de toda la baraja
    const crearDeck = () => {

        deck = [];
        for(let i = 2; i <=10; i++) {
            for(let tipo of tipos) {
                deck.push(`${i}${tipo}`)
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(`${especial}${tipo}`)
            }
        }

        return _.shuffle( deck );;
    }


    //Esta función es para tomar una carta
    const pedirCarta = () => {
        if(deck.length === 0) {
            throw 'No hay cartas en la baraja';
        }
          
        return deck.pop();;
    }

    
    //Función para asignarle un valor a las cartas que saca
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? 
            ((valor === 'A') ? 11 : 10 ) 
            : valor * 1; //Mi manera resumida de hacerlo
    }


    //Turno 0.Primer jugador, 1. Segundo Jugador... El último será la PC
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntajeHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    };

    const determinarGanador= () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if (puntosMinimos > 21 ) {
                alert('Ganó la computadora')
            } else if(puntosMinimos === puntosComputadora) {
                alert('Nadie Gano');
            } else if((puntosComputadora > 21) ) {
                alert('Ganaste');
            } else {
                alert('Computadora Gana');
            }
        }, 100);
    }

    // TURNO DE LA COMPUTADORA 
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1); // LE mandamos el último turno de la computadora
            crearCarta(carta, puntosJugadores.length - 1);


        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    };




    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta( carta, 0 )

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
            
        } else if (puntosJugador === 21) {
            console.warn('¡21. GENIAL!');
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevoJuego.addEventListener('click', () => {
        iniciarJuego();
    });

    return {
        nuevoJuego: iniciarJuego
    };

}) ();





