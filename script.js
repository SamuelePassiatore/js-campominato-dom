console.log('JS OK');

/*
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. 
Attenzione: nella stessa cella può essere posizionata al massimo una bomba, 
perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - 
abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. 
Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o 
quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

#BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/

// ! FUNCTIONS ------------------------------------------------
// Funzione per creare una cella
const createCell = (number) => {
    const cell = document.createElement('div');
    cell.append(number);
    cell.classList.add('cell');
    return cell;
}

// Funzione per generare un numero random
const generateBombs = (maxNumber, totalNumbers) => {
  const bombs = [];
  
  while (bombs.length < totalNumbers) {
    let random;
    do {
      randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    } while (bombs.includes(randomNumber)) {
      bombs.push(randomNumber);
    }
  } 
  return bombs;
}

let isGameOver = false;
// Funzione per terminare la partita 
const gameOver = (score, hasHitBomb) => {
  const message = hasHitBomb ? `Hai perso! Punti totalizzati: ${score}` : `Hai vinto! Hai raggiunto gli ${score} punti!`;
  alert(message);
  isGameOver = true;
}


  
// ! OPERAZIONI PRELIMINARI -----------------------------------
// Prendo gli elementi dal DOM
const grid = document.getElementById('grid');
const button = document.getElementById('button');
const difficultyLevel = document.getElementById('difficulty-level');
const displayScore = document.getElementById('display-score');

// ! OPERAZIONI D'AVVIO ---------------------------------------

// Aggancio l'event listener al button
button.addEventListener('click', () => {
  isGameOver = false;
  // Cambio il testo del bottone ricomincia
  button.innerText = 'Ricomincia';
  // Svuoto la griglia
  grid.innerHTML = '';

  // Prendo il livello dell'utente
  level = difficultyLevel.value;

  // Aggiunta classe alla griglia
  grid.classList.add(level);

  // Calcolo righe e colonne
  let cols;
  let rows;
  
  switch (level) {
    case 'medium':
      cols = rows = 9;
      break;
    case 'easy':
      cols = rows = 10;
      break;
    case 'hard':
      cols = rows = 7;
  }

  // Calcolo il totale delle celle
  const totalCells = cols * rows;

  // Preparo la variabile del punteggio
  let score = 0;

  // Preparo il numero di bombe
  const totalBombs = 16;

  // Punteggio massimo
  const maxPoints = totalCells - totalBombs;

  // Genero le bombe
  const bombs = generateBombs(totalCells, totalBombs);
  console.log(bombs);

// ! SVOLGIMENTO ---------------------------------------
    // Renderizzo le celle
    for (let i = 0; i < totalCells; i++){
      // Creo una cella 
      const cell = createCell(i + 1);

       // Aggiungo un event listener sulla singola cella
      cell.addEventListener('click', () => {
        // Controllo se era stata già cliccata
        if(isGameOver || cell.classList.contains('clicked')) {
          return;
        }
        // Aggiungo la classe clicked
        cell.classList.add('clicked');

        // Controllo se ho preso una bomba 
        const cellNumber = parseInt(cell.innerText);
        const hasHitBomb = bombs.includes(cellNumber);
        if (hasHitBomb) {
          cell.classList.add('bomb');
          gameOver(score, hasHitBomb);
        } else {
        // Aumento il punteggio al click
        displayScore.innerText = ++score;
        console.log(score);

          // Verifico se l'utente ha vinto
          if (score === maxPoints){
            gameOver(score, hasHitBomb);
          }
        }

      });

    
      // Appendo in pagina
      grid.appendChild(cell);
    }

});
