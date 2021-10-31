const gridEls = Array.from(document.querySelectorAll('.grid > div > div'));
const statusText = document.querySelector("#status_text");
const columnString = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
const north = document.querySelector("#up");
const south = document.querySelector("#down");


let compBoard = [
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
let playerBoard = [
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

let checkBoard = [
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



placePlayer();

// Player
function placePlayer () {
    // Carrier, Battleship, Submarine, Destroyer
    
    placeCarrier();
    // placeBattleship();
    // placeSubmarine();
    // placeDestroyer();
}

function placeCarrier () {
    let length = 5;

    statusText.innerText = "Select start location for your carrier on the grid..."

    gridEls.forEach((square) => {
        square.addEventListener('click', (evt) => squareHandle(evt, length))
    });
}



function squareHandle (evt, length) {
    let eventID = evt.target.getAttribute("id");
    console.log(length)
    console.log(eventID, typeof(eventID));
    let element = parseInt(eventID.slice(1, 3));
    let y = parseInt(eventID.charAt(1));
    let x = parseInt(eventID.charAt(2));
    let squareValue = checkBoard[x][y];
    console.log("length >>", length, "X >>", x, "Y >>", y, squareValue, element)

    verifyStart(x, y, length);

}

function colToString (y) {
    return columnString[y];
}

function verifyStart (x, y, length) {
    if (checkBoard[x][y] === 0) {
        checkBoard[x][y] = 1;
        console.log(checkBoard);

        console.log(colToString(x), y+1, "square selected")
        verifyDirection(x, y, length)
    } else {
        statusText.innerText = "Square occupied. Please select another square."
    }
}

// placeComp(5);
// render();


// Computer
function placeComp(length) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    console.log(checkBoard);
    pickSquare(length);
    let pick = verifyDirection();
    console.log(pick);
}

function pickSquare(length) {
    let placed = 0;
    while (placed === 0) {
        if (checkBoard[x][y] === 0) {
            checkBoard[x][y] = 1;
            verifyDirection(x, y, length);
            placed--;
        } else {
            console.log("Square already placed!")
        }
    }
}

function verifyDirection (y, x, length) {
    console.log("X >>", x, "| Y >>", y)
    let north = 0;
    let south = 0;
    let east = 0;
    let west = 0;
    let northObs = 1;
    let southObs = 1;
    let eastObs = 1;
    let westObs = 1;

    if (y === 0) {
        northObs = 0;
    } else {
        northObs = checkNorth(x, y);
    }

    if (y === 9) {
        southObs = 0;
    } else {
        southObs = checkSouth(x, y);
    }
    
    if (x === 9) {
        eastObs = 0;
    } else {
        eastObs = checkEast(x, y);
    }
    
    if (x === 0) {
        westObs = 0;
    } else {
        westObs = checkWest(x, y);
    }

    console.log("Length", length, "N", northObs, "S", southObs, "E", eastObs, "W", westObs)

    if (northObs >= length) {
        console.log("North available")
        north = 1;
    }

    if (southObs >= length) {
        console.log("South available")
        south = 1;
    }

    if (eastObs >= length) {
        console.log("East available")
        east = 1;
    }
    
    if (westObs >= length) {
        console.log("West available")
        west = 1;
    }

    let direction = [north, south, east, west];
    return direction;
}

function checkNorth (x, y) {
    console.log("North")
    let current;
    let northCount = 1;

    for (i = 1; i < 5; i++) {
        if (y-i >= 0) {
            current = checkBoard[x][y-1];
            if (current === 0) {
                northCount++;
                console.log(northCount);
            } else {
                console.log(northCount);
                return northCount;
            }
        } else {
            console.log(northCount);
            return northCount;
        }
    }
    return northCount;
}

function checkSouth (x, y) {
    console.log("South")
    let current;
    let southCount = 1;

    for (j = 1; j < 5; j++) {
        if (y+j <= 9) {
            current = checkBoard[x][y+j];
            if (current === 0) {
                southCount++;
                console.log(southCount);
            } else {
                console.log(southCount);
                return southCount;
            }
        } else {
            console.log(southCount);
            return southCount;
        }
    }
    return southCount;
}

function checkEast (x, y) {
    console.log("East")
    let current;
    let eastCount = 1;
    for (i = 1; i < 5; i++) {
        if (x+i <= 9) {
            current = checkBoard[x+i][y];
            if (current === 0) {
                eastCount++;
                console.log(eastCount);
            } else {
                console.log(eastCount);
                return eastCount;
            }
        } else {
            console.log(eastCount);
            return eastCount;
        }
    }
    return eastCount;
}

function checkWest (x, y) {
    console.log("West")
    let current;
    let westCount = 1;

    for (i = 1; i < 5; i++) {
        if (x-i >= 0) {
            current = checkBoard[x-i][y];
            if (current === 0) {
                westCount++;
                console.log(westCount);
            } else {
                console.log(westCount);
                return westCount;
            }
        } else {
            console.log(westCount);
            return westCount;
        }
    }
    return westCount;
}

function pickDirection (n, s, e, w) {
    let direction = [n, s, e, w];
    let picked = 0;
    console.log(direction);
    while (picked === 0) {
        let randDir = Math.floor(Math.random() * 4);
        console.log(direction[randDir])
        if (direction[randDir] === 1) {
            picked++;
            console.log(randDir)
        } else {
            console.log("Not available");
        }
    }
    
}

function checkHit () {
    if (squareValue <= 1) {
        if (squareValue === 1) {
            gridEls[element].style.backgroundColor = "red";
            gridEls[element].innerText = "X";
            compBoard[y][x] += 2;
        } else {
            gridEls[element].style.backgroundColor = "white";
            gridEls[element].innerText = "O";
            compBoard[y][x] += 2;
        }
    } else {
        console.log(`Square ${eventID} already selected!`)
    }
}

function render () {
    let test = 0;
    compBoard = checkBoard;
    compBoard.forEach((row, idx) => {
        // console.log(compBoard[idx]);
        compBoard[idx].forEach((col, idy) => {
            if (compBoard[idx][idy] === 1) {
                let index = `${(idy*10) + idx}`;
                console.log(index);
                console.log(gridEls[index]);
                gridEls[index].style.backgroundColor = "#737373";
                gridEls[index].innerText = test;
                test++;
            }
        });
    });
}