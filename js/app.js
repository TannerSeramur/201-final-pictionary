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

// game constructor function
function Game() {
  this.maxRounds = maxRounds;
  this.teams = [];
  this.currentRound = 1;
}

//team constructor function
function Team(teamName) {
  this.teamName = teamName;
  this.score = 0;
  this.gamesPlayed = 0;
  Game.teams.push(this);
}




// modals for index page here




// add new game



// add new team




// remove team
function removeTeam(teamName) {
  for (let i = 0; i < Game.teams.length; i++) {
    if (teamName === Game.teams[i].teamName) {
      Game.teams.splice(i, 1);
    }
  }
}



// turn start here




// role switch here
