//class Player

class Player {
  constructor(name, symbol, color, stage) {
    this.name = name;
    this.score = 0;
    this.symbol = symbol;
    this.collect = [];
    this.stage = [];
    this.color = color;
  }
}

// initialize variables
var scale;
var arena;
var platform;
var canStartGame = false;
var player1, player2;
var turn;
var getNext = false;
var countTurn = 0;
var isMinimize = false;
const rulesOfWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


//when url loaded
window.addEventListener('load', function () {
  //if data has session before
  if (sessionStorage.player1 !== undefined) {
    document.getElementById('player1').value = sessionStorage.player1;
  }
  if (sessionStorage.player2 !== undefined) {
    document.getElementById('player2').value = sessionStorage.player2;
  }
  platform = document.getElementById('platform');
  !platform.classList.contains('hide')
    ? platform.classList.add('hide')
    : console.log('initialize');
});

//function for equals array
function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

//function for minimize or maximize configuration
function minMaxConfig() {
  if (isMinimize === true) {
    isMinimize = false;
    document.getElementById('config').classList.remove('hide');
    document.getElementById('config').classList.add('show');
    document.getElementById('btn-config').innerHTML = 'Hide Configuration';
  } else {
    isMinimize = true;
    document.getElementById('config').classList.add('hide');
    document.getElementById('config').classList.remove('show');
    document.getElementById('btn-config').innerHTML = 'Show Configuration';
  }
}

//function for handle click the tic tac toe game
function createEvent() {
  document.querySelectorAll('.small-cell').forEach((elm) => {
    elm.addEventListener('click', function () {
      if (canStartGame === true) {
        if (this.innerHTML === '' || this.innerHTML === null) {
          this.innerHTML = turn.symbol;
          this.style.backgroundColor = turn.color;
          turn.collect.push(parseInt(this.getAttribute('data-val')));
          if (turn.stage.length < 1) {
            turn.stage.push({
              arena:
                this.parentElement.parentElement.getAttribute('data-arena'),
              score: [parseInt(this.getAttribute('data-val'))],
            });
          } else {
            var found = false;
            for (let index = 0; index < turn.stage.length; index++) {
              if (
                turn.stage[index].arena ===
                this.parentElement.parentElement.getAttribute('data-arena')
              ) {
                turn.stage[index].score.push(
                  parseInt(this.getAttribute('data-val'))
                );
                found = true;
              }
            }
            if (found === false) {
              turn.stage.push({
                arena:
                  this.parentElement.parentElement.getAttribute('data-arena'),
                score: [parseInt(this.getAttribute('data-val'))],
              });
            }
          }

          countTurn = countTurn - 1;
          document.getElementById('countTurn').innerHTML = countTurn;
          this.disabled = true;
          validateWin1(turn);
          if (turn.symbol === player2.symbol) {
            turn = player1;
          } else {
            turn = player2;
          }
          document.getElementById(
            'turn'
          ).innerHTML = `${turn.name}(${turn.symbol})`;
        }
      }
    });
  });
}

//function for validate if player win or draw
function validateWin1(theTurns) {
  var turns = theTurns.stage;
  var findWinner = false;
  if (countTurn === 0) {
    alert('DRAW');
    let cont = document.getElementById('button-continue');
    cont.classList.remove('hide');
    cont.classList.add('show');
  }
  //looping arena
  for (let index = 0; index < turns.length; index++) {
    if (turns[index].score.length > 2) {
      for (let index1 = 0; index1 < rulesOfWin.length; index1++) {
        const result = rulesOfWin[index1].every((item) =>
          turns[index].score.includes(item)
        );
        if (result === true) {
          findWinner = true;
        }
      }
      if (findWinner === true) {
        getWinner1(theTurns);
      }
    }
  }
}

// function to get winner
function getWinner1(x) {
  x.score = x.score + 1;
  if (x === player1) {
    document.getElementById('scoreP1').innerHTML = x.score;
  } else {
    document.getElementById('scoreP2').innerHTML = x.score;
  }
  alert(`${x.name} win the game`);
  player1.collect = [];
  player2.collect = [];
  player1.stage = [];
  player2.stage = [];
  let cont = document.getElementById('button-continue');
  cont.classList.remove('hide');
  cont.classList.add('show');
}


//function to create scale of game tictactoe
function setScale1(x) {
  let countArena = x / 3;
  let smallCell = [];
  let appendToPlatform = document.getElementById('platform');
  //initiate field
  let field;
  //looping vertical
  for (let a = 0; a < x; a++) {
    let appendTo = document.createElement('div');
    appendTo.className = 'arena';
    appendTo.setAttribute('id', `arena${a}`);
    //looping horizontal
    for (let b = 0; b < x; b++) {
      let bigcell = document.createElement('div');
      bigcell.setAttribute('data-arena', `a${a}${b}`);
      bigcell.className = 'big-cell';
      //looping to create square
      for (let j = 0; j < 9; j++) {
        if (j == 0 || j == 3 || j == 6) {
          field = document.createElement('div');
          field.className = 'field';
        }
        smallCell[j] = document.createElement('div');
        switch (j) {
          case 0:
            smallCell[j].className = 'small-cell top left';
            smallCell[j].setAttribute('data-val', j);
            field.appendChild(smallCell[j]);
            break;
          case 1:
            smallCell[j].className = 'small-cell top mid';
            smallCell[j].setAttribute('data-val', j);
            field.appendChild(smallCell[j]);
            break;
          case 2:
            smallCell[j].className = 'small-cell top right';
            smallCell[j].setAttribute('data-val', j);
            field.appendChild(smallCell[j]);
            break;
          case 3:
            smallCell[j].className = 'small-cell middle left';
            smallCell[j].setAttribute('data-val', j);
            field.appendChild(smallCell[j]);
            break;
          case 4:
            smallCell[j].className = 'small-cell middle mid';
            smallCell[j].setAttribute('data-val', j);
            field.appendChild(smallCell[j]);
            break;
          case 5:
            smallCell[j].className = 'small-cell middle right';
            smallCell[j].setAttribute('data-val', j);
            field.appendChild(smallCell[j]);
            break;
          case 6:
            smallCell[j].className = 'small-cell bottom left';
            smallCell[j].setAttribute('data-val', j);
            field.appendChild(smallCell[j]);
            break;
          case 7:
            smallCell[j].className = 'small-cell bottom mid';
            smallCell[j].setAttribute('data-val', j);
            field.appendChild(smallCell[j]);
            break;
          case 8:
            smallCell[j].className = 'small-cell bottom right';
            smallCell[j].setAttribute('data-val', j);
            field.appendChild(smallCell[j]);
            break;
          default:
            break;
        }
        bigcell.appendChild(field);
      }
      //every done create bigcell add to arena
      appendTo.appendChild(bigcell);
    }
    appendToPlatform.appendChild(appendTo);
  }
}


//function for restart the game and score reset
function restart() {
  document.getElementById('platform').innerHTML = '';
  canStartGame = false;
  turn = null;
  getNext = false;
  document.getElementById('scoreP1').innerHTML = 0;
  document.getElementById('scoreP2').innerHTML = 0;
  startGame();
}

//function for continue the game and score not reset
function nextGame() {
  document.getElementById('platform').innerHTML = '';
  canStartGame = false;
  getNext = true;
  player2.stage = [];
  player1.stage = [];
  let cont = document.getElementById('button-continue');
  cont.classList.remove('show');
  cont.classList.add('hide');
  startGame();
}

//function for start game
function startGame() {
  let cont = document.getElementById('button-continue');
  cont.classList.remove('show');
  cont.classList.add('hide');
  console.log('masuk');
  document.getElementById('platform').innerHTML = '';
  if (getNext !== true) {
    if (
      document.getElementById('scale').value === null ||
      document.getElementById('scale').value == ''
    ) {
      alert('Scale cannot be null!');
      return false;
    }
    if (
      document.getElementById('player1').value === null ||
      document.getElementById('player1').value == ''
    ) {
      alert('Name Player1 cannot be null!');
      return false;
    } else {
      sessionStorage.setItem(
        'player1',
        document.getElementById('player1').value
      );
    }
    if (
      document.getElementById('player2').value === null ||
      document.getElementById('player2').value == ''
    ) {
      alert('Name Player2 cannot be null!');
      return false;
    } else {
      sessionStorage.setItem(
        'player2',
        document.getElementById('player2').value
      );
    }
    player1 = new Player(
      document.getElementById('player1').value,
      document.getElementById('player1Symbol').innerHTML,
      '#46d7ff',
      2
    );
    player2 = new Player(
      document.getElementById('player2').value,
      document.getElementById('player2Symbol').innerHTML,
      '#7263FF',
      2
    );

    document.getElementById('scoreP1').innerHTML = player1.score;
    document.getElementById('scoreP2').innerHTML = player2.score;
    scale = parseInt(document.getElementById('scale').value);
  }
  setScale1(scale);
  countTurn = scale * scale * 9;
  document.getElementById('countTurn').innerHTML = countTurn;

  canStartGame = true;
  platform.classList.remove('hide');
  platform.classList.add('show');
  createEvent();
  if (Math.floor(Math.random() * 2) === 0) {
    turn = player1;
  } else {
    turn = player2;
  }
  document.getElementById('turn').innerHTML = `${turn.name}(${turn.symbol})`;
}
