'use strict'

//przypisanie buttonów
var btnRock = document.getElementById('rock');
var btnPaper = document.getElementById('paper');
var btnScissors = document.getElementById('scissors');
var output = document.getElementById('output');
var result = document.getElementById('result');
var btnNewGame = document.getElementById('newgame');
var roundsNumber = document.getElementById('round-number');
var text = document.getElementById('alert');

//zmienne w obiekcie
var params = {
  roundNumber: 0,
  playerScore: 0,
  userMove: '',
  compScore: 0,
  compChoice: '',
  roundsToWin: 0,
  progress: []
};

//zmienne
/*var playerScore = 0;
var compScore = 0;
var roundsToWin = 0;*/

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

//funkcja otwierająca modal
function showModal(){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.add('show');
  var modals = document.querySelectorAll('.modal');
  for (var i = 0; i < modals.length; i++) {
    modals[i].classList.remove('show');
    modals[i].classList.add('show');
  }
  if (params.playerScore >= params.roundsToWin){
    text.innerHTML = 'YOU WON !!!';
  }
  else if (params.compScore >= params.roundsToWin){
    text.innerHTML = 'YOU LOST !!!';
  }
}
  

//funkcja zamykająca modal po kliknięciu na elemencie z klasą close
var hideModal = function (event) {
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
}

var closeButtons = document.querySelectorAll('.modal .close');
for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', hideModal);
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
      params.playerScore++;
      return 'YOU WON';
} else {
    params.compScore++;
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
var btnAll = document.querySelectorAll('.player-move');

for(var i = 0; i < btnAll.length; i++){
  var dataMove = btnAll[i].getAttribute('data-move');
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
  result.innerHTML = 'PLAYER ' + params.playerScore + ' COMPUTER ' + params.compScore;
}

//nowa gra 
btnNewGame.addEventListener('click', function(){
  resetGame()
  params.roundsToWin = window.prompt('How many round would you like to play?')
  if(params.roundsToWin.length < 1 || NaN) {
    roundsNumber.innerHTML = 'Write a number';
  }
  else {
    roundsNumber.innerHTML = 'Play till ' + params.roundsToWin + ' won rounds';
    buttonEnabled();
  }
});

//funkcja resetująca grę
var resetGame = function(){
  params.roundNumber = 0;
  params.playerScore = 0;
  params.compScore = 0;
  result.innerHTML = '';
  output.innerHTML = '';
}

//koniec gry
function endOfGame() {
  if (params.playerScore >= params.roundsToWin){
    output.innerHTML = 'YOU WON !!! <br> click new game to start';
    buttonDisabled();
    showModal();
  }
  else if (params.compScore >= params.roundsToWin){
    output.innerHTML = 'YOU LOST !!! <br> click new game to start';
    buttonDisabled();
    showModal();
  }
}

//funkcja playerMove
var playerMove = function(userMove){
  var compChoice = computerMove();
  params.userMove = userMove;
  params.roundNumber++;
  var compareResult = compare(userMove, compChoice);
  var playerText = userMove;
  var compText = compChoice;
  outputResult(compareResult, playerText, compText);
  scoresResult();
  //dodawanie obiektów do tabeli
  params.progress.push({
    roundNumber: params.roundNumber,
    compScore: params.compScore,
    compChoice: params.compChoice,
    playerScore: params.playerScore,
    userMove: params.userMove}
  );
  //dodawanie tabeli
  var myTable = document.getElementById('table');
  var tbody = myTable.querySelector('tbody');

  for (var i = 0; i < params.progress.length; i++){
    var row = document.createElement('tr');

    var roundNumber = document.createElement('td')
    roundNumber.innerText = params.progress[i].roundNumber;

    var computerChoice = document.createElement('td')
    computerChoice.innerText = params.progress[i].compChoice;

    var userChoice = document.createElement('td')
    userChoice.innerText = params.progress[i].userMove;

    var roundPoints = document.createElement('td')
    roundPoints.innerText = params.progress[i].compScore + ':' + params.progress[i].playerScore;

  }
  row.append(roundNumber, compChoice, userChoice, roundPoints);
  tbody.append(row);
  endOfGame();
};
