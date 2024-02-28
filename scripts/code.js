const classes = ['.js-one-one', '.js-two-one', '.js-three-one', '.js-one-two', '.js-two-two', '.js-three-two', '.js-one-three', '.js-two-three', '.js-three-three'];

classes.forEach((value, index) => {
  document.querySelector(value).addEventListener('click', () => {
    displaySquares(value, 'x');
  })
})

// above is the square event listeners....^^^

squareCoverRemove();


squareCoverAdd();



let timerId;
const determinedChoice = Math.random();
function computerMove() {
  questionContainerDelete();
  let space;
  let choice;
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

function displaySquares(output, choice) {
  document.querySelector(output).innerHTML = choice;
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
  playerText.className = 'player-text';
  document.querySelector('.js-player-text-container').append(playerText);
}


function squareCoverRemove() {
  document.querySelector('.cover-two').classList.remove('cover');
}

function squareCoverAdd() {
  document.querySelector('.cover-two').classList.add('cover');
}
