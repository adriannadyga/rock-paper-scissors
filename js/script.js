'use strict'

//przypisanie buttonów
var btnRock = document.getElementById('rock');
var btnPaper = document.getElementById('paper');
var btnScissors = document.getElementById('scissors');
var output = document.getElementById('output');
var result = document.getElementById('result');
var btnNewGame = document.getElementById('newgame');
var roundsNumber = document.getElementById('round-number');

//zmienne
var playerScore = 0;
var compScore = 0;
var roundsToWin = 0;

//nieaktywne buttony
function buttonDisabled() {
  btnPaper.disabled = true;
  btnRock.disabled = true;
  btnScissors.disabled = true;
};

//aktywne buttony
function buttonEnabled() {
  btnPaper.disabled = false;
  btnRock.disabled = false;
  btnScissors.disabled = false;
}


//funkcja generująca ruch komputera na podstawie wylosowanej liczby
var computerMove = function() {
  var randomNumber = Math.floor((Math.random()*3) + 1);
  if(randomNumber == 1){
    return 'paper';
  } else if(randomNumber == 2){
    return 'rock';
  } else if(randomNumber == 3) {
    return 'scissors';
  }
};

//prównywanie ruchu gracza z wylosowaną liczbą
var compare = function(userMove, compChoice){
  if (userMove === compChoice) {
    return 'DRAW';
} else if ((userMove == 'paper') && (compChoice == 'rock') ||
    (userMove == 'rock') && (compChoice == 'scissors') ||
    (userMove == 'scissors') && (compChoice == 'paper')) {
      playerScore++;
      return 'YOU WON';
} else {
    compScore++;
    return 'YOU LOST';
    }
};

//wywołanie zdarzenia po kliknięciu w button
/*btnPaper.addEventListener('click', function(){
  playerMove('paper');
});
btnRock.addEventListener('click', function(){
  playerMove('rock');
});
btnScissors.addEventListener('click', function(){
  playerMove('scissors');
});*/

//pętla przchodząca przez wszytskie buttony
var btnAll = document.querySelectorAll('player-move');

for(var i = 0; i < btnAll.length; i++){
  var dataMove = btnAll[i].getAtribute('data-move');
  btnAll[i].addEventListener('click', function(){
    playerMove(dataMove);
  })
};

//funkcja wyświetlająca wynik dla rundy
function outputResult(compareResult, playerText, compText){
  output.innerHTML = compareResult + '<br> you choose: ' + playerText + ' computer choose ' + compText + '<br>';
}

//funkcja wyświetlająca wynik rozgrywki (sumuje poszczególne rundy)
var scoresResult = function(){
  result.innerHTML = 'PLAYER ' + playerScore + ' COMPUTER ' + compScore;
}

//nowa gra 
btnNewGame.addEventListener('click', function(){
  resetGame()
  roundsToWin = window.prompt('How many round would you like to play?')
  if(roundsToWin.length < 1 || NaN) {
    roundsNumber.innerHTML = 'Write a number';
  }
  else {
    roundsNumber.innerHTML = 'Play till ' + roundsToWin + ' won rounds';
    buttonEnabled();
  }
});

//funkcja resetująca grę
var resetGame = function(){
  playerScore = 0;
  compScore = 0;
  result.innerHTML = ''
  output.innerHTML = ''
}

//koniec gry
function endOfGame() {
  if (playerScore >= roundsToWin){
    output.innerHTML = 'YOU WON !!! <br> click new game to start';
    buttonDisabled();
  }
  else if (compScore >= roundsToWin){
    output.innerHTML = 'YOU LOST !!! <br> click new game to start';
    buttonDisabled();
  }
}

//funkcja playerMove
var playerMove = function(userMove){
  var compChoice = computerMove();
  var compareResult = compare(userMove, compChoice);
  var playerText = userMove;
  var compText = compChoice;
  outputResult(compareResult, playerText, compText);
  scoresResult();
  endOfGame();
};