//SIMULADOR LISTA DE TWEETS

//Selección HTML
const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista-tweets');

//Arreglo Campos
let tweets = [];

//Eventos
cargarEventos();

function cargarEventos() {
    formulario.addEventListener('submit', e => agregarTweet(e));

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        //JavaScript permite utilizar el simbolo OR (||) para realizar asignaciones en caso de resultados NUll
        
        crearTweet();
    })
}

//Funciones
function agregarTweet(e) {
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;
    
    if(tweet === '') {
        mostrarError('Error: Mensaje Vacio');
        return;
    }

    const tweetObjt = {
        id: Date.now(),
        tweetContent: tweet
        /*
        Si dentro de un objeto un elemento llave-valor comparte el mismo nombre
        haciendo referencia a una asignación externa, se le puede abreviar solo con
        el nombre de la llave. En este caso quedaría solo 'tweet'.
        */
    }

    tweets = [...tweets, tweetObjt];
    crearTweet();

    formulario.reset();
}

//--//
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.classList.add('error');
    mensajeError.textContent = error;

    const principal = formulario.parentElement;
    principal.appendChild(mensajeError);

    const sumbit = formulario.querySelector('input[type="submit"]');
    sumbit.disabled = true;

    setTimeout(() => {
        mensajeError.remove();
        sumbit.disabled = false;
    },2000)
}

//--//
function crearTweet() {
    limpiarHTML(lista);

    tweets.forEach(tweet => {
        const btnEliminar = document.createElement('a');
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.textContent = 'X'
        btnEliminar.onclick = () => {
            borrarTweet(tweet.id);
        };
        /*
        La propiedad .onclick puede tener como asignación una función anonima,
        que no es más que una función lo cual no tiene establecido un nombre
        */

        const elemento = document.createElement('li');
        elemento.textContent = tweet.tweetContent;

        elemento.appendChild(btnEliminar);
        lista.appendChild(elemento);
    })

    sincronizarStorage();
}

//--//
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//--//
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearTweet();
}

//--//
function limpiarHTML(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}



