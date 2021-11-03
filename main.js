// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l’utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

const selbtn = document.querySelector('.btn-play');
const contGrid = document.querySelector('.cont-grid');
const difficulty = document.querySelector('#difficulty')

//griglia
selbtn.addEventListener('click', () => {
    contGrid.innerHTML = ''; 

    const gridDifficulty = difficulty.value;
    console.log(gridDifficulty);
    let squareNumber;
    let squareForSide;

    switch (gridDifficulty) {
        case '1':
            squareNumber = 100;
            squareForSide = 10
            break;
        case '2':
            squareNumber = 81;
            squareForSide = 9
            break;
        case '3':
            squareNumber = 49;
            squareForSide = 7;
            break;
    }
    console.log(squareNumber);
    console.log(squareForSide);

    //generazione numeri random(bombe)
    const bombNumber = genBombs(squareNumber, 16)
    console.log('bombe', bombNumber);


    //numero tentativi
    const totAttempts = [];
    const maxAttempts = squareNumber - bombNumber.length;
    console.log('tentativi', maxAttempts);

    //generazione della griglia
    const grid = document.createElement('div');
    grid.classList.add('grid');
    

    for(let i = 0; i < squareNumber; i++){ 
        
        const square = genGridSquareForSide(i + 1, squareForSide)
        grid.append(square)

        square.addEventListener('click', function(){
            // square.classList.add('click-bg');
            gesClickSquare(square, bombNumber, totAttempts, maxAttempts,)
            
        });
    }
    contGrid.append(grid);
    // genera numeri
});

//click su square
function gesClickSquare(square, bombNumber, totAttempts, maxAttempts,){
    const number = parseInt(square.innerText);
    console.log(number);

    if(bombNumber.includes(number)){
        endGame(bombNumber, totAttempts, maxAttempts)
    } else if (!totAttempts.includes(number)){
        //sfondo
        square.classList.add('neutral')
        //numero tentativi
        totAttempts.push(number)
        console.log('tentativi', totAttempts);
        //tentativi massimi
        if(totAttempts.length === maxAttempts){
            endGame(bombNumber, totAttempts, maxAttempts)
        }
    }
}

//fine del gioco
function endGame(bombNumber, totAttempts, maxAttempts){
    //ottenere tutte le square
    const allSquare = document.querySelectorAll('.square');
    console.log(allSquare);
    //far apparire tutte le bombe
    for(let i = 0; i < allSquare.length; i++){
         const squareCells = allSquare[i];
         const squareValue = parseInt(squareCells.innerText);

         if(bombNumber.includes(squareValue)){
             squareCells.classList.add('bomb');
         }
    }
    //testo
    let message = `Hai vinto!!! Hai realizzato ${maxAttempts} tentativi`;

    //perdita
    if(totAttempts.length < maxAttempts){
        message = `Hai perso :( Hai realizzato ${totAttempts.length} tentativi`;
    }

    const messageDom = document.createElement('div');
    messageDom.classList.add('message');
    messageDom.append(message);
    document.querySelector('.cont-grid').append(messageDom);

    document.querySelector('.grid').classList.add('end')
}


// generazione bombe
function genBombs(totSquare, totBombs){
    const bombs = [];

    while(bombs.length < totBombs){
        const bomb = getRandNumber(1, totSquare);

        if(!bombs.includes(bomb)){
            bombs.push(bomb);
        }
    }
    return bombs;
}

function getRandNumber(min, max){
    return  Math.floor( Math.random()* (max - min + 1) + min);
}

// function genNumberSquare(min, max);

function genGridSquareForSide(num, square){
    const node = document.createElement('div');
    node.classList.add('square');
    node.style.width = `calc(100% / ${square})`;
    node.style.height = `calc(100% / ${square})`;

    const span = document.createElement('span');
    span.append(num);

    node.append(span);

    return node;
}