function addElement(element, content, parent) {
    var newElement = document.createElement(element);
    var newContent = document.createTextNode(content);
    newElement.appendChild(newContent);
    parent.appendChild(newElement);
    return newElement;
  }


// modal
function hideScreen(type){
  if(event.currentTarget === event.target){
    document.getElementById(type).classList.add('invisable');
  }
}
function ready(){
  document.getElementById('pop4').classList.add('invisable');
}

var showWordBtn = document.getElementById('showWord');
showWordBtn.addEventListener('click', showWord);

function showWord(){
  var secretWord = document.getElementById('secretWord');
  addElement('p','Your word is: ', secretWord);
  showWordBtn.removeEventListener('click', showWord);
  var readyBtn = addElement('button', 'Ready',secretWord);
  readyBtn.addEventListener('click', ready);


  

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
