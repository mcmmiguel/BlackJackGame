

// Definiendo PATRÓN MODULO
(() => {
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

    const cartasJugador = document.querySelector('#jugador-cartas'),
          cartasComputadora = document.querySelector('#computadora-cartas');

    //Esta función inicaliza el juego
    const iniciarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        console.log({puntosJugadores});
        
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

    const acumularPuntos = () => {

    }

    // TURNO DE LA COMPUTADORA 
    const turnoComputadora = (puntosMinimos) => {

        do {
            const carta = pedirCarta();

            puntosComputadora =puntosComputadora + valorCarta(carta);
            puntajeHTML[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            cartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        if (puntosMinimos > 21 ) {
            alert('Ganó la computadora')
        } else if(puntosMinimos === puntosComputadora) {
            alert('Nadie Gano');
        } else if((puntosComputadora > 21) ) {
            alert('Ganaste');
        } else {
            alert('Computadora Gana');
        }
    };




    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        puntajeHTML[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        cartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            // console.log('Perdiste pa');
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
        turnoComputadora(puntosJugador);
    });

    btnNuevoJuego.addEventListener('click', () => {
        iniciarJuego();
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        puntosComputadora = 0;
        puntosJugador = 0;
        puntajeHTML[0].innerText = puntosJugador;
        puntajeHTML[1].innerText = puntosComputadora;
        cartasComputadora.innerHTML = '';
        cartasJugador.innerHTML = '';
        
        
        
        // cartasComputadora.removeChild(cartasJugador.length);
        console.log(deck);
        

    });

    

}) ();





