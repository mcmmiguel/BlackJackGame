/* 
    * 2C = Two of Clubs (tréboles)
    * 2D = Two od Diamonds
    * 2H = Two of Hearts
    * 2S = Two of Spades
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosComputadora = 0;


//Referencias del HTML
const btnPedir = document.querySelector('#btn-pedir');
const btnDetener = document.querySelector('#btn-detener');
const puntajeHTML = document.querySelectorAll('small');
const cartasJugador = document.querySelector('#jugador-cartas')
const cartasComputadora = document.querySelector('#computadora-cartas')

//Esta funcion crea un nuevo deck aleatorio. Es decir, genera las cartas de toda la baraja
const crearDeck = () => {
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
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();



console.warn('SACAR CARTA');
//Esta función es para tomar una carta
const pedirCarta = () => {
    if(deck.length === 0) {
        throw 'No hay cartas en la baraja';
    }
    const carta = deck.pop();
    return carta;
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
};



const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? 
           ((valor === 'A') ? 11 : 10 ) 
           : valor * 1; //Mi manera resumida de hacerlo
    // console.log(valor);
    // let puntos = 0;

    // if(isNaN(valor)) {
    //     puntos = (valor === 'A' ) ? 11 : 10;
    // } else {
    //     puntos = puntos + (valor * 1);
    // }
    
}

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
        console.log('Perdiste pa');
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


