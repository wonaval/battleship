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

gridEls.forEach((square) => {
    square.addEventListener('click', (evt) => squareHandle(evt))
});

function squareHandle (evt) {
    let eventID = evt.target.getAttribute("id");
    console.log(eventID, typeof(eventID));
    let element = parseInt(eventID.slice(1, 3));
    let x = eventID.charAt(1);
    let y = eventID.charAt(2);
    let squareValue = playerBoard[y][x]
    console.log(x, y, squareValue, element)

    if (squareValue <= 1) {
        if (squareValue === 1) {
            gridEls[element].style.backgroundColor = "red";
            gridEls[element].innerText = "X";
            playerBoard[y][x] += 2;
        } else {
            gridEls[element].style.backgroundColor = "white";
            gridEls[element].innerText = "O";
            playerBoard[y][x] += 2;
        }
    } else {
        console.log(`Square ${eventID} already selected!`)
    }
    console.log(playerBoard);
}

// CONTROLLER

random(10);

function random (amount) {
    while (amount > 0) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        // console.log(x, y);
        // console.log(playerBoard[x][y]);
        if (playerBoard[x][y] === 0) {
            playerBoard[x][y] = 1;
            amount--;
        } else {
            console.log("Square already placed!")
        }
    }
    console.log(playerBoard)
}



render();

function render () {
    let test = 0;
    playerBoard.forEach((row, idx) => {
        // console.log(playerBoard[idx]);
        playerBoard[idx].forEach((col, idy) => {
            if (playerBoard[idx][idy] === 1) {
                let index = `${(idy*10) + idx}`;
                // console.log(index);
                // console.log(gridEls[index]);
                // gridEls[index].style.backgroundColor = "#737373";
                // gridEls[index].innerText = test;
                test++;
            }
        });
    });
}