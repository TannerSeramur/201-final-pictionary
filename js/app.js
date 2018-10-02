// popup modal
var pop1 = document.getElementById('pop1');
var pop2 = document.getElementById('pop2');
var pop3 = document.getElementById('pop3');
var pop4 = document.getElementById('pop4');

var myFunc = function(type){
  console.log(type);
  document.getElementById(type).classList.add('isvisable');
};
var closePop = function(type){
  if(event.currentTarget === event.target){
    document.getElementById(type).classList.remove('isvisable');
  }
};

function hideScreen(type){
  if(event.currentTarget === event.target){
    document.getElementById(type).classList.add('invisable');
  }
}


function hideScreen(type){
  if(event.currentTarget === event.target){
    document.getElementById(type).classList.add('invisable');
  }
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
    var newLi = document.createElement('li');
    var newP = document.createElement('p');
    newP.textContent = Game.teams[i].teamName;
    // newLi.textContent = Game.teams[i].teamName;
    newLi.appendChild(newP);
    var newI = document.createElement('i');
    newI.setAttribute('class', 'fas fa-times-circle');
    newLi.appendChild(newI);
    teamsList.appendChild(newLi);
  }
}

// When the start button on index.html gets clicked
function startGame() {
  // At least for now, let's clear local storage before we begin
  localStorage.clear();
  console.log('Let\'s play!');
  // Do all the choose team things before we can start
  // chooseTeams();
  showTeamSelect();
}

function loadGamePage() {
  gameStateToLocalStorage();
  window.location.href = 'game.html';
}

function createEventListeners() {
  var addTeamButton = document.getElementById('add-team-button');
  addTeamButton.addEventListener('click', addTeam);
  var removeTeamButtons = document.getElementsByClassName('fas fa-times-circle');
  console.log('arrayOfButtons', removeTeamButtons);
  for (var b of removeTeamButtons) {
    b.addEventListener('click', removeTeam);
  }
  var playButton = document.getElementById('play-button');
  playButton.addEventListener('click', loadGamePage);
}

function gameStateToLocalStorage() {
  localStorage.setItem('teams', JSON.stringify(Game.teams));
}

createEventListeners();
