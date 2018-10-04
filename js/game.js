'use strict';
// import {startPlayback} from "./canvas.js";

// globals
var game = getGameFromLocalStorage();
getTeamsFromLocalStorage();
var totalTime = 30000;

function getGameFromLocalStorage() {
  var gameJSON = localStorage.getItem('game');
  return new Game(gameJSON['maxRounds']);
}
function addElement(element, content, parent) {
  var newElement = document.createElement(element);
  var newContent = document.createTextNode(content);
  newElement.appendChild(newContent);
  parent.appendChild(newElement);
  return newElement;
}



// && document.getElementById('myBar').style.width != '100%'
// document.getElementById('myBar').style.width;
var id;
function timer() {
  var elem = document.getElementById('myBar');
  var width = 0;
  id = setInterval(frame, 300);
  function frame() {
	  if (width == 100) {
      clearInterval(id);
	  }
	  else {
      width++;
      elem.style.width = width + '%';
    }

  }
}

var doneBtn = document.getElementById('clearBtn');
doneBtn.addEventListener('click', checkBlank);

// turns canvas back
function blankCanvas(){
  var canvas = document.getElementById('canvas1');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0, canvas.width, canvas.height);
}
var blank = false;
function checkBlank(){
  blank = true;
}



var timerFinished = false;
var roundTimer;

// drawing timer
function startDrawTimer(){
  // start the round timer and call endDrawPhase when time is up
  roundTimer = setTimeout(endDrawPhase, totalTime);
}

function endDrawPhase(){
  blankCanvas();
  var doneBtn = document.getElementById('clearBtn');
  doneBtn.addEventListener('click', roleSwitch);
  doneBtn.click();
}

// function endDrawPhase();
// {
//   if(wordGuessed){
//     alert('you won');
//     Game.teams[0].score++
//   }
//   else{
//     alert('you lose');
//   }
// }

// timer for guessing the drawing
function startGuessTimer(){
  roundTimer = setTimeout(endGuessPhase, totalTime);
}

function endGuessPhase(){
  if(wordGuessed){
    alert('you won');
    Game.teams[0].score++;
  }
  else{
    alert('you lose');
  }
}

// var width = document.getElementById('myBar').width;
// console.log('here'+ document.getElementById('myBar').width);

// modal
function hideScreen(type){
  if(event.currentTarget === event.target){
    document.getElementById(type).classList.add('invisable');
  }
}

function doDrawPhase(){
  // Hide the draw prompt modal
  document.getElementById('pop4').classList.add('invisable');
  // Start the draw timer
  startDrawTimer();
  // Get the recordBtn and click it to allow drawing
  var recordBtn = document.getElementById('recordBtn');
  recordBtn.click();
}

var showWordBtn = document.getElementById('showWord');
showWordBtn.addEventListener('click', showWord);

var roundWord = getRandomWord();

function showWord(){
  var secretWord = document.getElementById('secretWord');
  addElement('p','Your word is: ' + roundWord, secretWord);
  showWordBtn.removeEventListener('click', showWord);
  var startDrawBtn = addElement('button', 'Draw!', secretWord);
  startDrawBtn.addEventListener('click', doDrawPhase);

}

function roleSwitch(){
  document.getElementById('pop5').classList.add('isvisable');
  var readyGuessBtn = document.getElementById('readyGuessBtn');
  readyGuessBtn.addEventListener('click', readyGuess);
}

function readyGuess(event){
  event.preventDefault();
  // Hide the ready to guess modal
  document.getElementById('pop5').classList.remove('isvisable');
  // Start the guess timer
  startGuessTimer();
  // Start canvas playback
  var playBtn = document.getElementById('playBtn');
  playBtn.click();
  // Set up the guess input field form
  var guessForm = document.getElementById('guessInput');
  var guessInput = addElement('input', '', guessForm);
  guessInput.id = 'userGuess';
  guessInput.name = 'userGuess';
  guessInput.placeholder = 'Enter your guess here';
  guessForm.addEventListener('submit',setGuess);
}

var wordGuessed = false;

function setGuess(event){
  // We get here on submit from guess text field
  event.preventDefault();
  // Compare the guessed word to roundWord
  var userGuess = event.target.userGuess.value;
  if(userGuess.toLowerCase() === roundWord ){
    wordGuessed = true;
    alert('right');
    clearTimeout(roundTimer);
    endGuessPhase();
  }else if(userGuess.toLowerCase() !== roundWord){
    var list = document.getElementById('guessList');
    var listItem = addElement('li',userGuess,list);
  }






  // if(userGuess.toLowerCase() === roundWord ){
  //   alert('Right!');
  // }else if(userGuess.toLowerCase() != roundWord){
  //   var list = document.getElementById('guessList');
  //   var listItem = addElement('li',userGuess,list);
  // }
  console.log(timerFinished);

}

function getTeamsFromLocalStorage() {
  var jsonTeams = JSON.parse(localStorage.getItem('teams'));
  for (var jsonTeam of jsonTeams) {
    console.log('jsonTeam=', jsonTeam);
    new Team(jsonTeam['teamName']);
  }
}

function playGame() {
  // loop over the number of rounds in our game
  for (let round = 1; round <= game.maxRounds; round++) {
    // Do start round things here
    startRound();
    // each round, loop over the number of teams in our game
    for (let currentTeam = 0; currentTeam < Game.teams.length; currentTeam++) {
      // Do start turn things here
      doTurn(Game.teams[currentTeam]);
    }
  }
  // Game is done. Show results.
  showEndOfGameResults();
}

function startRound() {

}

// turn start here
function doTurn(currentTeam) {
  // Accepts a team object as parameter
  promptDrawer();
  startDraw();
  promptGuesser();
  startGuessing();
  showTurnResults();
}

function promptDrawer() {
  // TODO: do the prompt
}

function startDraw() {
  // TODO: run drawing code
}

function promptGuesser() {
  // TODO: show the prompt
}

function startGuessing() {
  console.log('hi');
}

function showTurnResults() {
  // TODO: display end of turn results
}

function showEndOfGameResults() {
  // TODO: display end of game results
}

function getRandomWord() {
  var randomWord = '';
  do {
    var randIndex = Math.floor(Math.random() * words.length);
    randomWord = words[randIndex];
    console.log(randomWord);
  } while(usedWords.includes(randomWord));
  usedWords.push(randomWord);
  return randomWord;
}

// function blankCanvas(){
//   var canvas = document.getElementById('canvas1');
//   var ctx = canvas.getContext('2d');
//   ctx.fillStyle = 'black';
//   ctx.fillRect(0,0, canvas.width, canvas.height);
// }
