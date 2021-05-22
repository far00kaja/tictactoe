//class Player

class Player {
  constructor(name, symbol, color) {
    this.name = name;
    this.score = 0;
    this.symbol = symbol;
    this.collect = [];
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

function docReady(fn) {
  console.log('test');
  // see if DOM is already available
  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    console.log('test1');
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    console.log('test2');
    document.addEventListener('DOMContentLoaded', fn);
  }
}

docReady(function () {
  console.log('hallo');
});

const arr1 = [1, 2, 3, 4];
const arr2 = [1, 2, 3, 4, 5, 6];
const result = arr1.every((item) => arr2.includes(item));
console.log(result);
console.log([1, 2, 3, 4].includes(1, 2, 3, 4, 5));
window.addEventListener('load', function () {
  platform = document.getElementById('platform');
  console.log(!platform.classList.contains('hide'));
  !platform.classList.contains('hide')
    ? platform.classList.add('hide')
    : console.log('initialize');
});
function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

function createEvent() {
  document.querySelectorAll('.small-cell').forEach((elm) => {
    console.log('amsuk');
    elm.addEventListener('click', function () {
      console.log('amsuk22');
      if (canStartGame === true) {
        console.log(this.innerHTML);
        if (this.innerHTML === '' || this.innerHTML === null) {
          console.log('create event masuk inner kosong');
          this.innerHTML = turn.symbol;
          this.style.backgroundColor = turn.color;
          turn.collect.push(parseInt(this.getAttribute('data-val')));
          console.log(rulesOfWin);
          //   console.log(this.getAttribute("data-val"));
          this.disabled = true;
          console.log(turn);
          validateWin(turn.collect);
          if (turn.symbol === player2.symbol) {
            turn = player1;
          } else {
            turn = player2;
          }
          document.getElementById(
            'turn'
          ).innerHTML = `${turn.name}(${turn.symbol})`;
        }
        // console.log(document.getElementsByClassName('small-cell'));
      }
    });
  });
}

function validateWin(theTurn) {
  console.log('masuk validate');
  console.log(theTurn.length);
  var ketemu;
  var iFound;
  // mengulang rules ke 1-akhir
  if (theTurn.length > 2) {
    for (let index = 0; index < rulesOfWin.length; index++) {
      ketemu = false;
      iFound = [];
      //mengulang rules ke index
      if (arrayEquals(theTurn.sort(), rulesOfWin[index])) {
        console.log('mantap');
        // console.log(turn);
        getWinner(turn);
        return;
      }
      console.log(rulesOfWin[index]);
      for (let index3 = 0; index3 < theTurn.length; index3++) {
        if (rulesOfWin[index].includes(theTurn[index3])) {
          console.log(
            'masuk ke ' + index3 + 'yaitu' + parseInt(theTurn[index3])
          );
          ketemu = true;
          iFound.push(theTurn[index3]);
        }
      }
      if (ketemu === false) {
        console.log(
          '=========gak ketemu sama sekali pada rules ' +
            rulesOfWin[index] +
            '=============='
        );
      }
      //   console.log('i found: '+iFound);
      //   console.log('rulesOfwin: '+rulesOfWin[index]);
      console.log(iFound);
      console.log(rulesOfWin[index]);
      console.log(iFound === rulesOfWin[index]);
      console.log(arrayEquals(iFound, rulesOfWin[index]));
      if (arrayEquals(iFound.sort(), rulesOfWin[index])) {
        getWinner(turn);
      }
      //   if (iFound===rulesOfWin[index]){
      //       console.log('mantap berhasil');
      //   }
    }
    // const element = array[index];
    // console.log(theTurn);
    // console.log(rulesOfWin[2]);
    // console.log(theTurn.includes(rulesOfWin[index]));
    // console.log(rulesOfWin[index].includes(theTurn));
    // }
  }
  //   console.log(theTurn);
}

function getWinner(x) {
  x.score = x.score+1;
  if (x === player1) {
    document.getElementById('scoreP1').innerHTML = x.score;
  } else {
    document.getElementById('scoreP2').innerHTML = x.score;
  }
  alert(`${x.name} win the game`);
  player1.collect = [];
  player2.collect = [];
}

function setScale(x) {
  let countArena = x / 3;
  let smallCell = [];
  console.log('arena' + countArena);

  //initiate field
  let field;

  for (let i = 0; i < x; i++) {
    let appendTo = document.getElementById('arena');
    //initiate big cell
    let bigcell = document.createElement('div');
    bigcell.setAttribute('data-arena', i + 1);
    bigcell.className = 'big-cell';
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
      //   if(j===2|| j==5 ||j==8){
      //       for (let k = j-3; k < j; k++) {
      //           bigcell.appendChild(fiel)
      //       }
      //   }
    }
    appendTo.appendChild(bigcell);
    console.log(appendTo);
  }

  // bigcell.setAttribute('class','big-cell');
  //   bigcell.className = 'big-cell';
  //   let smallcell
}

function restart() {
  document.getElementById('arena').innerHTML = '';
  canStartGame = false;
  turn = null;
  getNext = false;
  document.getElementById('scoreP1').innerHTML = 0;
  document.getElementById('scoreP2').innerHTML = 0;
  startGame();
}
function nextGame() {
  document.getElementById('arena').innerHTML = '';
  canStartGame = false;
  getNext = true;
  startGame();
}

function startGame() {
  if (getNext !== true) {
    if (
      document.getElementById('player1').value === null ||
      document.getElementById('player1').value == ''
    ) {
      alert('Name Player1 cannot be null!');
      return false;
    }
    if (
      document.getElementById('player2').value === null ||
      document.getElementById('player2').value == ''
    ) {
      alert('Name Player2 cannot be null!');
      return false;
    }
    player1 = new Player(
      document.getElementById('player1').value,
      document.getElementById('player1Symbol').innerHTML,
      '#46d7ff'
    );
    player2 = new Player(
      document.getElementById('player2').value,
      document.getElementById('player2Symbol').innerHTML,
      '#7263FF'
    );

    document.getElementById('scoreP1').innerHTML = player1.score;
    document.getElementById('scoreP2').innerHTML = player2.score;
    console.log(player1);
    console.log(player2);
    scale = 3;
  }
  setScale(1);
  console.log('masuk');

  canStartGame = true;
  platform.classList.remove('hide');
  platform.classList.add('show');
  createEvent();

  turn = player1;
  document.getElementById('turn').innerHTML = `${turn.name}(${turn.symbol})`;
}

function ruleOfGames() {}
