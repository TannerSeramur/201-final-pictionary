'use strict';
// import {startPlayback} from "./canvas.js";

// globals
var game = getGameFromLocalStorage();
getTeamsFromLocalStorage();
var totalTime = 30000;
var roundWord = getRandomWord();
var timerFinished = false;
var roundTimer;
var wordGuessed = false;

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

var id;
function timer() {
  var elem = document.getElementById('myBar');
  var width = 0;
  id = setInterval(frame, 300);
  function frame() {
	  if (width === 100) {
      clearInterval(id);
	  }
	  else {
      width++;
      elem.style.width = width + '%';
    }
  }
}

// turns canvas back
function blankCanvas(){
  var canvas = document.getElementById('canvas1');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0, canvas.width, canvas.height);
}

// drawing timer
function startDrawTimer(){
  // Start the progresss bar timer
  timer();
  // start the round timer and call endDrawPhase when time is up
  roundTimer = setTimeout(endDrawPhase, totalTime);
}

function endDrawPhase(){
  blankCanvas();
  // Click the record button to toggle recording
  document.getElementById('recordBtn').click();
  console.log('Clicked canvas record button to stop recording');
  // Click the clear button to clear the canvas
  document.getElementById('clearBtn').click();
  console.log('Clicked clear button to clear canvas');
  // Switch roles
  roleSwitch();
}

// timer for guessing the drawing
function startGuessTimer(){
  timer();
  roundTimer = setTimeout(endGuessPhase, totalTime);
}

function endGuessPhase(){
  if(wordGuessed){
    showWin()
    hideBar();
    Game.teams[0].score++;
  }
  else{
    showLose();
    hideBar();
  }
}

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
  console.log('Clicked canvas record button');
}

var showWordBtn = document.getElementById('showWord');
showWordBtn.addEventListener('click', showWord);

function showWord(){
  var secretWord = document.getElementById('secretWord');
  addElement('p','Your word is: ' + roundWord, secretWord);
  showWordBtn.removeEventListener('click', showWord);

  var startDrawBtn = addElement('button', 'Start Drawing!', secretWord);
  startDrawBtn.id = 'drawBtn';

  startDrawBtn.addEventListener('click', doDrawPhase);

}

function roleSwitch(){
  // Show the guesser get ready modal and prepare the start guessing button
  document.getElementById('pop5').classList.add('isvisable');
  var startGuessBtn = document.getElementById('readyGuessBtn');
  startGuessBtn.addEventListener('click', startGuess);
}

function startGuess(event){
  // add guess list
  addIncorrectGuesses();
  // Hide the ready to guess modal
  document.getElementById('pop5').classList.remove('isvisable');
  // Start the guess timer
  startGuessTimer();
  timer();
  // Start canvas playback
  var canvasPlayBtn = document.getElementById('playBtn');
  canvasPlayBtn.click();
  console.log('Clicked canvas play button');
  // Set up the guess input field form to allow guesses
  var guessForm = document.getElementById('guessInput');
  var guessInput = addElement('input', '', guessForm);
  guessInput.id = 'userGuess';
  guessInput.name = 'userGuess';
  guessInput.autocomplete = 'off';
  guessInput.placeholder = 'Enter your guess here';
  guessInput.autofocus = 'autofocus';
  guessForm.addEventListener('submit', submitGuess);
}

function submitGuess(event){
  // We get here on submit from guess text field
  event.preventDefault();
  // Compare the guessed word to roundWord
  var userGuess = event.target.userGuess.value;
  if(userGuess.toLowerCase() === roundWord ){
    wordGuessed = true;
    // alert('right');
    clearTimeout(roundTimer);
    endGuessPhase();
  }else if(userGuess.toLowerCase() !== roundWord){
    var list = document.getElementById('guessList');
    var listItem = addElement('li',userGuess,list);
  }
  // Clear the input box
  event.target.userGuess.value = '';
  // console.log(timerFinished);
}

function getTeamsFromLocalStorage() {
  var jsonTeams = JSON.parse(localStorage.getItem('teams'));
  for (var jsonTeam of jsonTeams) {
    console.log('jsonTeam=', jsonTeam);
    new Team(jsonTeam['teamName']);
  }
}
function addIncorrectGuesses(){
  var incorrectGuess = document.getElementById('guessList');
  var listHead = addElement('h3','Incorrect Guesses: ', incorrectGuess);
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

function showWin(){
  document.getElementById('winPop').classList.add('isvisable');
}
function showLose(){
  document.getElementById('losePop').classList.add('isvisable');
}
function hideBar(){
  document.getElementById('myProgress').classList.add('invisable');
  document.getElementById('myBar').classList.add('invisable');
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
