// popup modal
var pop1 = document.getElementById('pop1');
var pop2 = document.getElementById('pop2');
var pop3 = document.getElementById('pop3');
var pop4 = document.getElementById('pop4');
var pop5 = document.getElementById('pop5');
var winPop = document.getElementById('winPop');

var myFunc = function(type){
  console.log(type);
  document.getElementById(type).classList.add('isvisable');
};
var closePop = function(type){
  if(event.currentTarget === event.target){
    document.getElementById(type).classList.remove('isvisable');
  }
};

// function hideScreen(type){
//   if(event.currentTarget === event.target){
//     document.getElementById(type).classList.add('invisable');
//   }
// }

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

function addTeam() {
  var teamName = document.getElementById('add-team-input').value;
  new Team(teamName);
  // update the teams display area
  renderTeams();
}

// remove team
function removeTeam(event) {
  var liElement = event.currentTarget;
  var teamName = liElement.previousSibling.textContent;
  console.log('Tryna remove', teamName);
  for (let i = 0; i < Game.teams.length; i++) {
    if (teamName === Game.teams[i].teamName) {
      Game.teams.splice(i, 1);
    }
  }
  // update the teams display area
  renderTeams();
}

// when instructions button on index.html gets clicked
function showInstructions() {
  console.log('Look! Instructions!');
  // TODO: implement show instructions modal
  var instructionsModal = document.getElementById('pop2');
  instructionsModal.classList.add()
}

function showHighScores() {
  console.log('Look! High scores!');
  // TODO: show high scores modal
}


// called in startGame
function showTeamSelect() {
  // TODO: Display the modal for team selection
  // Render the teams list into the team select modal
  renderTeams();
}

// called in showTeamSelect
function renderTeams() {

  // TODO: make Games.teams show up in the team select modal
  var teamsList = document.getElementById('teams');
  teamsList.innerHTML = '';
  for (let i = 0; i < Game.teams.length; i++) {
    // Make a new li
    var newLi = document.createElement('li');
    // Make a new div to wrap p and btn
    var liContainer = document.createElement('div');
    liContainer.classList.add('team-list-item');
    // Make a new p
    var newP = document.createElement('p');
    // Set text in new p
    newP.textContent = Game.teams[i].teamName;
    // Stick newP in container
    liContainer.appendChild(newP);
    // Stick container in the li
    newLi.appendChild(liContainer);
    // Make a remove button and stick to the liContainer
    var removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'fas fa-times-circle');
    removeButton.addEventListener('click', removeTeam);
    liContainer.appendChild(removeButton);
    teamsList.appendChild(newLi);
  }
}

// When the start button on index.html gets clicked
function startGame() {
  console.log('Is this even happening?');
  // At least for now, let's clear local storage before we begin
  localStorage.clear();
  // Put in some dummy score data
  var scores = JSON.stringify([{teamName: 'Awesome', score: '3'}, {teamName: 'Rad', score: '1'}]);
  console.log(scores);
  localStorage.setItem('scores', JSON.stringify(scores));
  console.log('Let\'s play!');
  // Do all the choose team things before we can start
  showTeamSelect();
}

function loadGamePage() {
  gameStateToLocalStorage();
  window.location.href = 'game.html';
}

function createEventListeners() {
  var startButton = document.getElementById('start-button');
  startButton.addEventListener('click', startGame);
  var addTeamButton = document.getElementById('add-team-button');
  addTeamButton.addEventListener('click', addTeam);
  var playButton = document.getElementById('play-button');
  playButton.addEventListener('click', loadGamePage);
}

function gameStateToLocalStorage() {
  localStorage.setItem('game', JSON.stringify(game));
  localStorage.setItem('teams', JSON.stringify(Game.teams));
}

function getScoresFromLocalStorage() {
  // TODO - get the storage
}

createEventListeners();
