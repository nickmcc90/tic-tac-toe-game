const classes = ['.js-one-one', '.js-two-one', '.js-three-one', '.js-one-two', '.js-two-two', '.js-three-two', '.js-one-three', '.js-two-three', '.js-three-three'];

const answerSlots = ['.js-one', '.js-two', '.js-three', '.js-four', '.js-five', '.js-six', '.js-seven', '.js-eight', '.js-nine'];

classes.forEach((value, index) => {
  document.querySelector(value).addEventListener('click', () => {
    if(displaySquares(answerSlots[index], 'X')) {     // displaySquares will return a true or false value. It will return false if the human chooses an already picked square.
      squareCoverAdd();
      playerSelectTextRemove();
      didWeWin();     // we check to see if we won AFTER we put our choice of square into displaySquares().
      computerMove();
    } else {
      squareAlreadyFull();    // displays a message to user that you can't pick an already chosen square
    }
  })
})

// above is the square event listeners....^^^



let timerId;
const determinedChoice = Math.random();
function computerMove() {
  questionContainerDelete();
  let space;
  const random = Math.random();
  if(random < 0.1) {
    space = '.js-one';
  } else if (random > 0.1 && random < 0.2) {
    space = '.js-two';
  } else if (random > 0.2 && random < 0.3) {
    space = '.js-three';
  } else if (random > 0.3 && random < 0.4) {
    space = '.js-four';
  } else if (random > 0.4 && random < 0.5) {
    space = '.js-five'; 
  } else if (random > 0.5 && random < 0.6) {
    space = '.js-six';
  } else if (random > 0.6 && random < 0.7) {
    space = '.js-seven';
  } else if (random > 0.7 && random < 0.8) {
    space = '.js-eight';
  } else if (random > 0.8 && random < 0.9) {
    space = '.js-nine';
  } else {
    space = '.js-five';
  };

  if(!winnerVariable) {     // the computer won't think of another move or make a move if someone has already won or the tiles are full.
    computerThinking();


    timerId = setTimeout(() => {
      displaySquares(space, 'O');
      didWeWin();    // We check to see if the computer won AFTER it placed it's move.
    }, 4000);
  }




}

let i = 0;    // variable for if the output chosen by the computer has been chosen before
let catcher = {};
function displaySquares(output, choice) {
  if(output === 'none') {       // this is a one-off condition if we hit the 'Me' button at the beginning
    console.log('Begin!')
    return true;      // need to return true here from this avenue.
  } else {
    if(catcher[output] === true && choice === 'X') {    // this is for the human, if they click a square thats already taken. Humans only choose x.
        return false;       // the function will return false if the human chooses a picked square.
    } else {    // this is for the computer
      while(output in catcher) {          // if the computer chooses a slot already, we make a different one. In operator only works with objects.
        output = answerSlots[i];
        i++;
        console.log(output);
      }
      i = 0;
      catcher[output] = true;     // storing the output into array. putting the output in AFTER we check to see if it's already in there.
      console.log(catcher);     // debugging
      document.querySelector(output).innerHTML = choice;
      }
      squareCoverRemove();                    // once this function is done, the cover gets removed.
      return true;           // this function will return true if something hasn't been chosen twice, or the computer is making a move.
    }
  }


function computerThinking() {
  const thinkingElement = document.querySelector('.js-computer-thinking');
  thinkingElement.innerHTML = 'Computer thinking....'
  let value = 3;
  let intId;
  intId = setInterval(() => {
    document.querySelector('.js-timer').innerHTML = value;
    value--;
  },1000);
  setTimeout(() => {
    clearInterval(intId)
    thinkingElement.innerHTML = '';
    document.querySelector('.js-timer').innerHTML = '';
    if(!winnerVariable){            // only runs if there hasn't been declared a winner.
      playerSelectText();     
    }
  },4000);
}

function playerSelectText() {     // trying a new format of adding html with js
  const playerText = document.createElement("div");
  playerText.textContent = "Choose a square..... try to beat the computer!";
  playerText.className = 'player-text js-player-text';
  document.querySelector('.js-player-text-container').append(playerText);
}

function playerSelectTextRemove() {
  document.querySelector('.js-player-text').remove();

}


function squareCoverRemove() {
  document.querySelector('.cover-two').classList.remove('cover');
}

function squareCoverAdd() {
  document.querySelector('.cover-two').classList.add('cover');
}


function squareAlreadyFull() {
  const sqaureFullElement = document.querySelector('.js-square-full');
  sqaureFullElement.innerHTML = "Please choose a square that has not been filled.";
  setTimeout(() => {
    sqaureFullElement.innerHTML = '';
  }, 2000);
}

const boxValue = {};
let winnerVariable = false;
function didWeWin () {
  answerSlots.forEach((value, index) => {
    index++;
    boxValue[index] = document.querySelector(value).innerHTML;
  })
  console.log(boxValue);
  
  // There are 16 possible win combinations.... I gotta list them all out here, so forgive the code for being extra long.
  let size = Object.keys(catcher).length;   

  // first checking the vertical possibilities...
  if(boxValue[1] === "X" && boxValue[2] === "X" && boxValue[3] === "X") {
    reloader(1);    // signifies a win
  } else if(boxValue[4] === "X" && boxValue[5] === "X" && boxValue[6] === "X") {
      reloader(1);
  } else if(boxValue[7] === "X" && boxValue[8] === "X" && boxValue[9] === "X") {
      reloader(1);
  } else if(boxValue[1] === "O" && boxValue[2] === "O" && boxValue[3] === "O") {
      reloader(-1);   // signifies a loss
  } else if(boxValue[4] === "O" && boxValue[5] === "O" && boxValue[6] === "O") {
      reloader(-1);
  } else if(boxValue[7] === "O" && boxValue[8] === "O" && boxValue[9] === "O") {
      reloader(-1);
  }  // now checking the horizontal possibilities....
    else if(boxValue[1] === "X" && boxValue[4] === "X" && boxValue[7] === "X") {
      reloader(1);
  } else if(boxValue[2] === "X" && boxValue[5] === "X" && boxValue[8] === "X") {
      reloader(1);
  } else if(boxValue[3] === "X" && boxValue[6] === "X" && boxValue[9] === "X") {
      reloader(1);
  } else if(boxValue[1] === "O" && boxValue[4] === "O" && boxValue[7] === "O") {
      reloader(-1);
  } else if(boxValue[2] === "O" && boxValue[5] === "O" && boxValue[8] === "O") {
      reloader(-1);
  } else if(boxValue[3] === "O" && boxValue[6] === "O" && boxValue[9] === "O") {
      reloader(-1);
  } // finally, checking the diagonal possibilities....
    else if(boxValue[1] === "X" && boxValue[5] === "X" && boxValue[9] === "X") {
      reloader(1);
  } else if(boxValue[3] === "X" && boxValue[5] === "X" && boxValue[7] === "X") {
      reloader(1);
  } else if(boxValue[1] === "O" && boxValue[5] === "O" && boxValue[9] === "O") {
      reloader(-1);
  } else if(boxValue[3] === "O" && boxValue[5] === "O" && boxValue[7] === "O") {
      reloader(-1);
  } 


  

  if((size === 9)) {      // if the catcher object has 9 values, that's means that the board is filled up. Tie! This has to run last.
    reloader(0)   // signifies a tie
    console.log("It's a tie!");
  } 

  console.log(size);   // this Object.keys(object).length allows us to see the size of an object.

  

}

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}

function reloader(result) {
  if(result === -1) {
    playerSelectTextRemove();   // when the computer wins, we have to remove this text.
  }

  if(result === 1) {
    score.wins++;
  } else if (result === 0) {
    score.ties++;
  } else {
    score.losses++;
  }

  winnerVariable = true;    // now that this is set to true (this was initialized above the didWeWin function) we can stop the computer from thinking and anything else from running.

  updateScoreElement();

  localStorage.setItem('score', JSON.stringify(score));

  const p = document.createElement("p");                                    // Adding a lil message to the score div used in updateScoreElement()
  p.textContent = "Get ready to play again in 5 seconds....."
  document.querySelector('.js-player-text-container').append(p);

  document.querySelector('.reset-grouping').remove();     // temporarily remove the reset button

  setTimeout(() => {
    location.reload();
  }, 5000);

}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `You've won ${score.wins} times, lost ${score.losses} times, and tied ${score.ties} times. `
}


/* reset code */

document.querySelector('.js-reset-score').addEventListener('click', () => {
  const resetElement = document.querySelector('.js-reset-text');
  resetElement.innerHTML = "Score has been reset dude!"

  localStorage.removeItem('score');
  
  setTimeout(() => {
    resetElement.innerHTML = ""
  }, 2000);
})