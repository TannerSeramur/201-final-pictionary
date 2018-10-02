
// popup modal
console.log('getting here');
    var pop1 = document.getElementById("popup-1");
    var pop2 = document.getElementById("popup-2");
    var pop3 = document.getElementById("popup-2");
        
    var myFunc = function(type){
        console.log(type);
        // type.classList.add("isvisable");
        // console.log(type);
        document.getElementById(type).classList.add("isvisable");
        // console.log(classList);
        
    }
    
    var closePop = function(type){
        // if(event.currentTarget === event.target){
        document.getElementById(type).classList.remove("isvisable");
            // pop1.classList.remove("isvisable");
        // }
    
    }


// Global variables
var maxRounds = 3;
Game.teams = [];
var game = new Game();

// game constructor function
function Game() {
  this.maxRounds = maxRounds;
  this.currentRound = 1;
}

//team constructor function
function Team(teamName) {
  this.teamName = teamName;
  this.score = 0;
  this.gamesPlayed = 0;
  Game.teams.push(this);
}


// remove team
function removeTeam(teamName) {
  for (let i = 0; i < Game.teams.length; i++) {
    if (teamName === Game.teams[i].teamName) {
      Game.teams.splice(i, 1);
    }
  }
}

// when instructions button on index.html gets clicked
function showInstructions() {
  // TODO: implement show instructions modal
}

// called in playGame
function chooseTeams() {
  // Display the modal for choosing teams
  showTeamSelect();
}

// called in chooseTeams
function showTeamSelect() {
  // TODO: Display the modal for team selection
  // Render the teams list into the team select modal
  renderTeams();
}

// called in showTeamSelect
function renderTeams() {
  // TODO: make Games.teams show up in the team select modal
}

// When the play button on index.html gets clicked
function playGame() {
  // Do all the choose team things before we can start
  chooseTeams();
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
// role switch here
