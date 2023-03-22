/* 
    * 2C = Two of Clubs (tréboles)
    * 2D = Two od Diamonds
    * 2H = Two of Hearts
    * 2S = Two of Spades
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];



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
    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
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
    console.log(deck);
    console.log(carta);
    return carta;
}

// pedirCarta();

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

    console.log(puntos);
    
}

const valor = valorCarta(pedirCarta());

console.log(valor);

