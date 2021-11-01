const columnString = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
const gridElsTop = Array.from(document.querySelectorAll(".grid > div > div"));
const gridElsBot = Array.from(document.querySelectorAll(".grid_bottom > div > div"));
const intro = document.querySelector("header");
const main_top = document.querySelector(".one");
const main_bottom = document.querySelector(".two");
const statusText = document.querySelector("#status_text");
const statusBottom = document.querySelector("#status_text_bottom");
const north = document.querySelector("#up");
const south = document.querySelector("#down");
const east = document.querySelector("#right");
const west = document.querySelector("#left");


let direction = [];
let placeTurn = 0;
let length;
let ship;
let x;
let y;


let playerPlaced;

initialize();

function initialize () {
    intro.style.display = "none";
    // main_top.style.display = "none";
    main_bottom.style.display = "none";
    win_box.style.display = "none";

    north.style.visibility = "hidden";
    south.style.visibility = "hidden";
    east.style.visibility = "hidden";
    west.style.visibility = "hidden";

    gridElsTop.forEach((square) => {
        square.addEventListener('click', (evt) => squareHandle(evt))
    });

    playerPlaced = false;
    placePlayer();
}

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

// Player
function placePlayer () {
    // Carrier, Battleship, Submarine, Destroyer
    
    statusText.innerText = "Select start location for your CARRIER (5) on the OCEAN GRID."
}

function squareHandle (evt) {
    console.log('click')
    if (placeTurn >= 0) {
    let eventID = evt.target.getAttribute("id");
    console.log(eventID, typeof(eventID));
    console.log("ship >>", ship, "length >> ", length)
    let element = parseInt(eventID.slice(1, 3));
    y = parseInt(eventID.charAt(1));
    x = parseInt(eventID.charAt(2));
    console.log("length >>", length, "X >>", x, "Y >>", y, element)
    switch (placeTurn) {
        case 0:
            console.log("place carrier")
            length = 5;
            ship = "carrier";
            break;
        case 1:
            console.log("place battle")
            length = 4;
            ship = "battleship";
            break;
        case 2:
            console.log("place sub")
            length = 3;
            ship = "submarine";
            break;
        case 3:
            console.log("place destroy")
            length = 2;
            ship = "destroyer";
            break;
        default:
            console.log("TEST");
            break;
    }
        
    verifyStart();
    }
}

const inputListener = (event, length) => {squareHandle(event, length)};

function colToString (y) {
    return columnString[y];
}

function verifyStart () {
    if (checkBoard[x][y] === 0) {
        checkBoard[x][y] = ship;
        console.log(checkBoard);

        if (playerPlaced === false) {
            statusText.innerText = `${colToString(y)} ${x+1} selected. Please select from available directions below.`;
            gridElsTop.forEach((square) => {
            square.removeEventListener('click', inputListener);
            render();
            placeTurn = -1;
        })};
        verifyDirection();

    } else {
        if (playerPlaced === false) {statusText.innerText = "Square occupied. Please select another square."}
    }
}

function verifyDirection () {
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
        northObs = checkNorth();
    }

    if (y === 9) {
        southObs = 0;
    } else {
        southObs = checkSouth();
    }
    
    if (x === 9) {
        eastObs = 0;
    } else {
        eastObs = checkEast();
    }
    
    if (x === 0) {
        westObs = 0;
    } else {
        westObs = checkWest();
    }

    console.log("Length", length, "N", northObs, "S", southObs, "E", eastObs, "W", westObs)

    if (northObs >= length) {
        console.log("North available")
        north = 1;
    } else {
        north = 0;
    }

    if (southObs >= length) {
        console.log("South available")
        south = 1;
    } else {
        south = 0;
    }

    if (eastObs >= length) {
        console.log("East available")
        east = 1;
    } else {
        east = 0;
    }
    
    if (westObs >= length) {
        console.log("West available")
        west = 1;
    } else {
        west = 0;
    }

    direction = [north, south, east, west];

    if (playerPlaced === false) {
        renderDirections();
    } else {
        randomDirection();
    }

}

function renderDirections() {
    console.log(direction)
    if (direction[0] === 1) {
        north.style.visibility = "visible";
        north.addEventListener("click", placeShipNorth);
    }    
    if (direction[1] === 1) {
        south.style.visibility = "visible";
        south.addEventListener("click", placeShipSouth);
    }
    if (direction[2] === 1) {
        east.style.visibility = "visible";
        east.addEventListener("click", placeShipEast);
    }
    if (direction[3] === 1) {
        west.style.visibility = "visible";
        west.addEventListener("click", placeShipWest);
    }
}

function randomDirection () {
    console.log(direction);
    let notPlaced = 0;
    while (notPlaced === 0) {
        let index = Math.floor(Math.random() * 4);
        if (direction[index] === 1) {
            switch (index) {
                case 0:
                    console.log("Comp picked North")
                    placeShipNorth();
                    break;
                case 1:
                    placeShipSouth();
                    console.log("Comp picked South")
                    break;
                case 2:
                    placeShipEast();
                    console.log("Comp picked East")
                    break;
                case 3:
                    placeShipWest();
                    console.log("Comp picked West")
                    break;
                default:
                    break;
            }
            notPlaced++;
        } else {
            console.log("Not available.")
        }
    }
}

function removeDirection() {
    if (direction[0] === 1) {
        north.removeEventListener("click", placeShipNorth);
        north.style.visibility = "hidden";
        
    }    
    if (direction[1] === 1) {
        south.removeEventListener("click", placeShipSouth);
        south.style.visibility = "hidden";
    }
    if (direction[2] === 1) {
        east.removeEventListener("click", placeShipEast);
        east.style.visibility = "hidden";
    }
    if (direction[3] === 1) {
        west.removeEventListener("click", placeShipWest);
        west.style.visibility = "hidden";
    }

    switch (length) {
        case 5:
            placeTurn = 1;
            statusText.innerText = "Select start location for your BATTLESHIP (4) on the OCEAN GRID."
            break;
        case 4:
            placeTurn = 2;
            statusText.innerText = "Select start location for your SUBMARINE (3) on the OCEAN GRID."
            break;
        case 3:
            placeTurn = 3;
            statusText.innerText = "Select start location for your DESTROYER (2) on the OCEAN GRID."
            break;
        case 2:
            placeTurn = 4;
            playerPlaced = true;
            statusText.innerText = "Computer opponent is now placing ships..."
            playerBoard = checkBoard;
            placeComp();
            break;
        default:
            console.log("TEST");
            break;
    }
}

function placeShipNorth () {
    console.log("PLACE NORTH", x, y, length, ship)
    for (i = 1; i < length; i++) {
        checkBoard[x-i][y] = ship;
    }
    if (playerPlaced === false) {
    render();
    removeDirection();
    }
}

function placeShipSouth () {
    console.log("PLACE SOUTH", x, y, length, ship)
    for (i = 1; i < length; i++) {
        checkBoard[x+i][y] = ship;
    }
    if (playerPlaced === false) {
    render();
    removeDirection();
    }
}

function placeShipEast () {
    console.log("PLACE EAST", x, y, length, ship)
    for (i = 1; i < length; i++) {
        checkBoard[x][y+i] = ship;
    }
    if (playerPlaced === false) {
    render();
    removeDirection();
    }
}

function placeShipWest () {
    console.log("PLACE WEST", x, y, length, ship)
    for (i = 1; i < length; i++) {
        checkBoard[x][y-i] = ship;
    }
    if (playerPlaced === false) {
    render();
    removeDirection();
    }
}


function checkNorth () {
    console.log("North")
    let current;
    let northCount = 1;

    for (i = 1; i < 5; i++) {
        if (x-i >= 0) {
            current = checkBoard[x-i][y];
            if (current === 0) {
                northCount++;
                //console.log(northCount);
            } else {
                //console.log(northCount);
                return northCount;
            }
        } else {
            //console.log(northCount);
            return northCount;
        }
    }
    return northCount;
}

function checkSouth () {
    //console.log("South")
    let current;
    let southCount = 1;

    for (i = 1; i < 5; i++) {
        if (x+i <= 9) {
            current = checkBoard[x+i][y];
            if (current === 0) {
                southCount++;
                //console.log(southCount);
            } else {
                //console.log(southCount);
                return southCount;
            }
        } else {
            //console.log(southCount);
            return southCount;
        }
    }
    return southCount;
}

function checkEast () {
    //console.log("East")
    let current;
    let eastCount = 1;
    for (i = 1; i < 5; i++) {
        if (y+i <= 9) {
            current = checkBoard[x][y+i];
            if (current === 0) {
                eastCount++;
                //console.log(eastCount);
            } else {
                //console.log(eastCount);
                return eastCount;
            }
        } else {
            //console.log(eastCount);
            return eastCount;
        }
    }
    return eastCount;
}

function checkWest () {
    // console.log("West")
    let current;
    let westCount = 1;

    for (i = 1; i < 5; i++) {
        if (y-i >= 0) {
            current = checkBoard[x][y-i];
            if (current === 0) {
                westCount++;
                //console.log(westCount);
            } else {
                //console.log(westCount);
                return westCount;
            }
        } else {
            //console.log(westCount);
            return westCount;
        }
    }
    return westCount;
}


// RENDER MAP
function render () {
    let test = 0;
    checkBoard.forEach((row, idx) => {
        checkBoard[idx].forEach((col, idy) => {
            if (checkBoard[idx][idy] === "carrier") {
                let index = `${(idy*10) + idx}`;
                gridElsTop[index].style.background= "#EEC643";
            }
            if (checkBoard[idx][idy] === "battleship") {
                let index = `${(idy*10) + idx}`;
                gridElsTop[index].style.background= "#95D2EC";
            }
            if (checkBoard[idx][idy] === "submarine") {
                let index = `${(idy*10) + idx}`;
                gridElsTop[index].style.background= "#183C28";
            }
            if (checkBoard[idx][idy] === "destroyer") {
                let index = `${(idy*10) + idx}`;
                gridElsTop[index].style.background= "#FF4242";
            }
        });
    });
}

function placeComp() {
    for(rows in checkBoard) {
        checkBoard[rows].fill(0, 0, 10)
    }
    while (placeTurn <= 7) {
        console.log(placeTurn)
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);

        setCompPlace();
        verifyStart();

        placeTurn++;
    }

    console.log(checkBoard);
    console.log(placeTurn)
    setCompPlace();
    console.log("PLAYER >>", playerBoard);
    console.log("COMP >>", compBoard);
}

function setCompPlace () {
    switch (placeTurn) {
        case 4:
            console.log("Comp placing carrier...")
            ship = "carrier";
            length = 5;
            break;
        case 5:
            console.log("Comp placing battleship...")
            ship = "battleship";
            length = 4;
            break;
        case 6:
            console.log("Comp placing submarine...")
            ship = "submarine";
            length = 3;
            break;
        case 7:
            console.log("Comp placing destroyer...")
            ship = "destroyer";
            break;
        case 8:
            statusText.innerText = "Computer placement complete!"
            placeTurn = -1;
            main_bottom.style.display = "flex";
            statusBottom.innerText = "Please select your first guess on TARGET GRID!"
            compBoard = checkBoard;
            break;
        default:
            console.log("ERROR");
            break;
    }
    console.log(ship)
}