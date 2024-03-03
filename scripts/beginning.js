document.querySelector('.js-play-game').addEventListener('click', () => {
  askWhoIsFirst();
})

function askWhoIsFirst() {
  const gameSpace = document.querySelector('.js-play-game-container');
  gameSpace.innerHTML = ''; // button disappears

  const question = `
  <div class='question'>Who shall go first in this Tic Tac Toe game?</div>
  <div class="decision-space js-decision-space">
    <button class='js-human human-button'>Me</button>
    <button class='js-computer computer-button'>Computer</button>
  </div>
  `;

  document.querySelector('.js-question-container').innerHTML = question;    // gets replaced with questions and decisions

  document.querySelector('.js-human').addEventListener('click', () => {
    questionContainerDelete();
    displaySquares('none', 'none');
    squareCoverRemove();
    playerSelectText();
  })

  document.querySelector('.js-computer').addEventListener('click', () => {
    computerMove();
  })
}

function questionContainerDelete() {
  document.querySelector('.js-question-container').innerHTML = '';
}