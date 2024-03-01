const classes = ['.js-one-one', '.js-two-one', '.js-three-one', '.js-one-two', '.js-two-two', '.js-three-two', '.js-one-three', '.js-two-three', '.js-three-three'];

const answerSlots = ['.js-one', '.js-two', '.js-three', '.js-four', '.js-five', '.js-six', '.js-seven', '.js-eight', '.js-nine'];

classes.forEach((value, index) => {
  document.querySelector(value).addEventListener('click', () => {
    displaySquares(answerSlots[index], 'X');
    squareCoverAdd();
    playerSelectTextRemove();
    computerMove();
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

  computerThinking();

  timerId = setTimeout(() => {
    displaySquares(space, 'O');
  }, 4000);
}

let i = 0;    // variable for if the output chosen by the computer has been chosen before
let catcher = {};
function displaySquares(output, choice) {
  if(output === 'none') {       // this is a one-off condition if we hit the 'Me' button at the beginning
    console.log('Begin!')
  } else {
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
    playerSelectText(); 
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
