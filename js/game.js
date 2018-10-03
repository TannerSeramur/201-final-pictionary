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
