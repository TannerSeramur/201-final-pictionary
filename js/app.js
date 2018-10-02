// popup modal
console.log('getting here');
var login = document.getElementById('popup');

var myFunc = function(type){
  console.log('open');
  login.classList.add('isvisable');
};

var closePop = function(){
  if(event.currentTarget === event.target){

    login.classList.remove('isvisable');
  }

};
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


function startGame() {
  // This gets kicked off when the play button on index.html gets clicked

}


// turn start here
function startTurn() {

}



// role switch here
