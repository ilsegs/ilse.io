'use strict';

//Selecting elements. These are DOm elements, not values
const score0El = document.querySelector('#score--0'); //this is an id
const score1El = document.getElementById('score--1'); // this is an id
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice'); // this is a class, so we use a dot
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//MODAL WINDOW TO OPEN AND CLOSE RULES
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClosemodal = document.querySelector('.close-modal');
const btnRules = document.querySelector('.btn--rules');

// ADD POSSIBLITY TO CHANGE NAMES
const btnName = document.querySelector('.btn--name');
const btnChangeName = document.querySelector('.change--name');
const playerName0 = document.querySelector('#name--0');
const playerName1 = document.querySelector('#name--1');
const player_0NewName = document.querySelector('.player--0--new--name');
const player_1NewName = document.querySelector('.player--1--new--name');

//MODAL WINDOW TO OPEN AND CLOSE CHANGE NAME
const modalname = document.querySelector('.modalname');
const overlayname = document.querySelector('.overlayname');
const btnCloseName = document.querySelector('.close-name');

//declaring variables without assigning them a value yet
let scores,
  currentScore,
  activePlayer,
  playing,
  nameChanged = false;

const changeNameFunction = function () {
  // Change Name and checker
  if (player_0NewName.value !== '') {
    // change to the new name
    playerName0.textContent = player_0NewName.value;
  } else {
    // if no change then set the default name
    playerName0.textContent = 'Player 1';
  }

  if (player_1NewName.value !== '') {
    playerName1.textContent = player_1NewName.value;
  } else {
    playerName1.textContent = 'Player 2';
  }
};

const init = function () {
  // Starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  diceEl.classList.add('hidden');
  document.querySelector('#name--0').textContent = 'Player 1';
  document.querySelector('#name--1').textContent = 'Player 2';
  if (nameChanged) {
    changeNameFunction();
  }
};
init(); //call the funtion to let it work the first time

//MODAL RULES FUNCTIONS
const openmodal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closemodal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// ADD RULES
btnRules.addEventListener('click', openmodal);
btnClosemodal.addEventListener('click', closemodal);
overlay.addEventListener('click', closemodal);

//LET ESC KEY CLOSE THE MODAL WINDOW (OPTIONAL)
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      closemodal();
    }
  }
});

//MODAL NAME FUNCTIONS
const openmodalname = function () {
  modalname.classList.remove('hidden');
  overlayname.classList.remove('hidden');
};
const closemodalname = function () {
  modalname.classList.add('hidden');
  overlayname.classList.add('hidden');
};

// Change name
btnName.addEventListener('click', openmodalname);
btnCloseName.addEventListener('click', closemodalname);
overlayname.addEventListener('click', closemodalname);
btnChangeName.addEventListener('click', function () {
  changeNameFunction();
  closemodalname();
  nameChanged = true;
});

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; //truncate it, so we move the decimal part
    // 2. Display Dice
    diceEl.classList.remove('hidden'); //first remove the hidden part
    diceEl.src = `dice-${dice}.png`; //retrieves the corresponding image
    // 3 Check for rolled 1. If true, switch to next player.
    if (dice != 1) {
      // Add dice to current score
      currentScore += dice; // same as currentScore = currentScore + dice
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //switch to next player
      switchPlayer(activePlayer);
    }
  }
});

//Hold
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore; //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if players score is already >=100
    if (scores[activePlayer] >= 10) {
      //finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`) //querySelector always selects a class which needs a '.' in front
        .classList.add('player--winner');
      // Display 'Winner' instead of player name
      document.querySelector(`.player--${activePlayer}`).textContent = 'Winner';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //or switch to next player
    } else {
      switchPlayer();
    }
  }
});

//Reset game
btnNew.addEventListener('click', init);
