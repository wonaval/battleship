console.log("js loaded");

// MODEL

class Ship {
    constructor (length) {
        this.length = length;
        
    }
};



// VIEW
const gridEls = Array.from(document.querySelectorAll('.grid > div > div'));
const playerBoard = new Array(100).fill(0);
const cpuBoard =  new Array(100).fill(0);

gridEls.forEach((square)=> {
    square.addEventListener('click', (evt) => squareHandle(evt))
});

function squareHandle (evt) {
    console.log(evt.target)
    
}

random(10);
// CONTROLLER
function random (amount) {
    while (amount > 0) {
    let random = Math.floor(Math.random() * 100);
    console.log(random);
    if (playerBoard[random] === 0) {
        playerBoard[random] = 1
        amount--;
    }
    }
}



// console.log(gridEls, playerBoard, cpuBoard);

render();

function render () {
    playerBoard.forEach((square, idx) => {
        // console.log(square, idx)
        if (square === 1) {
            // console.log(gridEls[idx])
            gridEls[idx].style.background = "#737373"
        }
    })
}