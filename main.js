console.log("js loaded");

// MODEL



// VIEW
const gridEls = Array.from(document.querySelectorAll('.grid > div > div'));
const playerBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
const cpuBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

console.log(gridEls, playerBoard, cpuBoard);

gridEls.forEach((square)=> {
    square.addEventListener('click', (evt) => squareHandle(evt))
});

function squareHandle (evt) {
    console.log(evt.target)
    
}

// CONTROLLER

random(10);

function random (amount) {
    while (amount > 0) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        console.log(x, y);
        console.log(playerBoard[x][y]);
        if (playerBoard[x][y] === 0) {
            playerBoard[x][y] = 1;
            amount--;
        } else {
            console.log("Square already placed!")
        }
        console.log(playerBoard)
    }
}



render();

function render () {
    playerBoard.forEach((row, idx) => {
        console.log(playerBoard[idx]);
        playerBoard[idx].forEach((col, idy) => {
            if (playerBoard[idx][idy] === 1) {
                let index = `${(idx*10) + idy}`;
                console.log(index)
                console.log(gridEls[index])
                gridEls[index].style.backgroundColor = "#737373";
            }
        });
    });
}