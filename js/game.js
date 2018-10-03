// globals
var game = getGameFromLocalStorage();
getTeamsFromLocalStorage();

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

// && document.getElementById('myBar').style.width != '100%'
// document.getElementById('myBar').style.width;
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
var timerFinished = false;
function startTimer(){
  setTimeout(endPhase, 5000);
}
function endPhase(){
  console.log('boom');
  timerFinished = true;
  return timerFinished;
}

var width = document.getElementById('myBar').width;
console.log('here'+ document.getElementById('myBar').width);


// modal
function hideScreen(type){
  if(event.currentTarget === event.target){
    document.getElementById(type).classList.add('invisable');
  }
}
function ready(){
  document.getElementById('pop4').classList.add('invisable');
  startTimer();


}

var showWordBtn = document.getElementById('showWord');
showWordBtn.addEventListener('click', showWord);

var roundWord = getRandomWord();

function showWord(){
  var secretWord = document.getElementById('secretWord');
  addElement('p','Your word is: ' + roundWord, secretWord);
  showWordBtn.removeEventListener('click', showWord);
  var readyBtn = addElement('button', 'Ready',secretWord);
  readyBtn.addEventListener('click', ready);
  
}
var doneBtn = document.getElementById('clearBtn');
doneBtn.addEventListener('click',roleSwitch);

function roleSwitch(){
  document.getElementById('pop5').classList.add('isvisable');
  var readyGuessBtn = document.getElementById('readyGuessBtn');
  readyGuessBtn.addEventListener('click', readyGuess);
}
function readyGuess(){
  event.preventDefault();
  console.log('readyGuess');
  document.getElementById('pop5').classList.remove('isvisable');
  var guessForm = document.getElementById('guessInput');
  var guessInput = addElement('input', '', guessForm);
  guessInput.id = 'userGuess';
  guessInput.name = 'userGuess';
  guessForm.addEventListener('submit',setGuess);
  timer();

}


function setGuess(event){
  event.preventDefault();
  var userGuess = event.target.userGuess.value;
  console.log(roundWord);
  console.log(userGuess);
  do{ 
  
    console.log(timerFinished);

    if(userGuess.toLowerCase() === roundWord ){
      alert('Right!');
    }else if(userGuess.toLowerCase() != roundWord){
      var list = document.getElementById('guessList');
      var listItem = addElement('li',userGuess,list);
    }
  }
  while(timerFinished == false);
  
  alert('timeout');


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
  // TODO: implement guessing code
}

function showTurnResults() {
  // TODO: display end of turn results
}

function showEndOfGameResults() {
  // TODO: display end of game results
}



function fillWordList(fileName) {
  // This code was suggested by answers to
  // https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file#14446538.
  var allText = '';
  var textFile = new XMLHttpRequest();
  textFile.open('GET', fileName, false);
  textFile.onreadystatechange = function ()
  {
    if(textFile.readyState === 4)
    {
      if(textFile.status === 200 || textFile.status === 0)
      {
        allText = textFile.responseText;
      }
    }
  };
  textFile.send(null);
  var words = allText.split('\n');
  for (var i in words) {
    words[i] = words[i].toLowerCase();
  }
  return words;
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
