const columnString = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
const gridElsTop = Array.from(document.querySelectorAll(".grid > div > div"));
const gridElsBot = Array.from(document.querySelectorAll(".grid_bottom > div > div"));
const intro = document.querySelector(".introPage");
const main_top = document.querySelector(".one");
const main_bottom = document.querySelector(".two");
const statusText = document.querySelector("#status_text");
const statusBottom = document.querySelector("#status_text_bottom");
const north = document.querySelector("#up");
const south = document.querySelector("#down");
const east = document.querySelector("#right");
const west = document.querySelector("#left");
const win_box = document.querySelector(".win");
const winMsg = document.querySelector("#win_box")
const enterName = document.querySelector("#enterName");
const reset = document.querySelector("#reset")

let playerShips = {};
let compShips = {};
let direction = [];
let playerBoard = [];
let compBoard = [];
let checkBoard = [];
let placeTurn = 0;
let length;
let ship;
let x;
let y;
let playerName;
let playerPlaced;

initialize();

function initialize () {
    playerBoard = [
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
    
    compBoard = [
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
    
    checkBoard = [
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

    showIntro();

    enterName.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = e.target.elements;
        playerName = formData.name.value;

        console.log(playerName)

        showMain();
    })

    north.style.visibility = "hidden";
    south.style.visibility = "hidden";
    east.style.visibility = "hidden";
    west.style.visibility = "hidden";

    playerPlaced = false;
}

function showIntro () {
    intro.style.display = "flex";
    main_top.style.display = "none";
    main_bottom.style.display = "none"
    win_box.style.visibility = "hidden";
}

function showMain() {
    intro.style.display = "none";
    main_top.style.display = "flex";
    main_bottom.style.display = "flex"

    placePlayer();
    gridElsTop.forEach((square) => {
        square.addEventListener('click', (evt) => squareHandle(evt))
    });

}



// Player
function placePlayer () {
    statusText.innerText = `Hello ${playerName}! Select start location for your CARRIER (5) on the OCEAN GRID.`
}

function squareHandle (evt) {
    if (placeTurn >= 0) {
    let eventID = evt.target.getAttribute("id");
    y = parseInt(eventID.charAt(1));
    x = parseInt(eventID.charAt(2));
    console.log("length >>", length, "X >>", x, "Y >>", y)
    switch (placeTurn) {
        case 0:
            console.log("Player place carrier")
            length = 5;
            ship = "carrier";
            break;
        case 1:
            console.log("Player place battle")
            length = 4;
            ship = "battleship";
            break;
        case 2:
            console.log("Player place sub")
            length = 3;
            ship = "submarine";
            break;
        case 3:
            console.log("Player place destroy")
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

const inputListener = (event, length) => { squareHandle(event, length) };

function colToString (y) {
    return columnString[y];
}

function verifyStart () {
    if (checkBoard[x][y] === 0) {
        checkBoard[x][y] = ship;

        if (playerPlaced === false) {
            statusText.innerText = `${colToString(y)} ${x+1} selected. Please select from available directions below.`;
            gridElsTop.forEach((square) => {
            square.removeEventListener('click', inputListener);
            render();
            placeTurn = -1;
        })};
        verifyDirection();

    } else {
        let notPlaced = true;
        if (playerPlaced === false) {
            statusText.innerText = "Square occupied. Please select another square."
        } else {
            while (notPlaced) {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                if (checkBoard[x][y] === 0) {
                    checkBoard[x][y] = ship;
                    notPlaced = false;
                }
            }
            verifyDirection();
        }
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

    if (x === 0) {
        northObs = 0;
    } else {
        northObs = checkNorth();
    }

    if (x === 9) {
        southObs = 0;
    } else {
        southObs = checkSouth();
    }
    
    if (y === 9) {
        eastObs = 0;
    } else {
        eastObs = checkEast();
    }
    
    if (y === 0) {
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
    let notPlaced = true;
    while (notPlaced === true) {
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
            notPlaced = false;
        } else {
            console.log(direction);
            console.log("Not available.");
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
            setPlayerBoard();
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

    console.log("CHECK >>", checkBoard);
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

    console.log("CHECK >>", checkBoard);
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

    console.log("CHECK >>", checkBoard);
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

    console.log("CHECK >>", checkBoard);
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

    while (placeTurn !== 8) {
        console.log(placeTurn)
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);

        setCompPlace();
        verifyStart();
    }

    console.log(checkBoard);
    console.log(placeTurn)
    setCompPlace();
    console.log("PLAYER >>", playerBoard);
    console.log("COMP >>", compBoard);

    startGame();
}

function setCompPlace () {
    switch (placeTurn) {
        case 4:
            console.log("Comp placing carrier...")
            ship = "carrier";
            length = 5;
            placeTurn = 5;
            break;
        case 5:
            console.log("Comp placing battleship...")
            ship = "battleship";
            length = 4;
            placeTurn = 6;
            break;
        case 6:
            console.log("Comp placing submarine...")
            ship = "submarine";
            length = 3;
            placeTurn = 7;
            break;
        case 7:
            console.log("Comp placing destroyer...")
            ship = "destroyer";
            length = 2;
            placeTurn = 8;
            break;
        case 8:
            statusText.innerText = "Computer placement complete!"
            placeTurn = -1;
            statusBottom.innerText = "Please select your first guess on TARGET GRID!"
            setCompBoard();
            break;
        default:
            console.log("ERROR");
            break;
    }
    console.log(ship)
}

function setCompBoard () {
    for (i = 0; i < checkBoard.length; i++) {
        for (j = 0; j < checkBoard[i].length; j++) {
            compBoard[i][j] = checkBoard[i][j]
        }
    }
}

function setPlayerBoard () {
    for (i = 0; i < checkBoard.length; i++) {
        for (j = 0; j < checkBoard[i].length; j++) {
            playerBoard[i][j] = checkBoard[i][j]
        }
    }
}

function startGame () {
    playerShips = {
        carrier: 5,
        battleship: 4,
        submarine: 3,
        destroyer: 2
    }

    compShips = {
        carrier: 5,
        battleship: 4,
        submarine: 3,
        destroyer: 2
    }

    gridElsBot.forEach((square) => {
        square.addEventListener('click', (event) => bottomListener(event))
    });
}

const bottomListener = (event) => {handleBottom(event)};

function handleBottom (event) {
    let getID = event.target.getAttribute("id");
    y = parseInt(getID.charAt(2));
    x = parseInt(getID.charAt(1));
    console.log("X", x, "Y", y)
    compareHit();
}

function compareHit () {
    let hitString= "";
    console.log(compBoard[x][y])
    if (compBoard[x][y] === 0) {
        compBoard[x][y] = "miss"
        hitString = `${colToString(y)} ${x+1} selected. Miss!`
    } else if (compBoard[x][y] === "hit" | compBoard[x][y] === "miss") {
        hitString = `${colToString(y)} ${x+1} selected. Square selected previously. Please select another square.`
    } else {
        hitString = `${colToString(y)} ${x+1} selected. ${compBoard[x][y].charAt(0).toUpperCase() + compBoard[x][y].slice(1)} hit!`
        removeShip(compBoard[x][y])
        compBoard[x][y] = "hit"
    }
    renderBottom(hitString);
}

function removeShip (remove) {
    compShips[remove]--;
}

function renderBottom (hitString) {
    let cheat = true;
    console.log("COMP >>", compBoard)
        compBoard.forEach((row, idx) => {
            compBoard[idx].forEach((col, idy) => {
                if (compBoard[idx][idy] === "hit") {
                    let index = `${(idx*10) + idy}`;
                    gridElsBot[index].style.background= "red";
                }
                if (compBoard[idx][idy] === "miss") {
                    let index = `${(idx*10) + idy}`;
                    gridElsBot[index].style.background= "white";
                }
                if (cheat) {
                    if (compBoard[idx][idy] === "carrier" || compBoard[idx][idy] === "battleship" || compBoard[idx][idy] === "destroyer" || compBoard[idx][idy] === "submarine" ) {
                        let index = `${(idx*10) + idy}`;
                        gridElsBot[index].innerText = ".";
                    }
                }
            });
        });
    renderBotMsg(hitString)

    computerSelect();
}

function computerSelect () {
    let playString;
    let compPlaced = true;

    while (compPlaced) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        if (playerBoard[x][y] === "hit" | playerBoard[x][y] === "miss") {
            console.log("Prev selected", playerBoard[x][y])
        } else {
            compPlaced = false;
        } 
    }
    console.log("X >>", x, "Y >>", y, "Value >>",playerBoard[x][y])
    if (playerBoard[x][y] === 0) {
        playString = `Computer selected ${colToString(y)} ${x+1}. Miss!`
        playerBoard[x][y] = "miss";
    } else {
        playString = `Computer selected ${colToString(y)} ${x+1}. Hit!`
        removePlayerShip(playerBoard[x][y]);
        console.log("HIT", playerBoard[x][y])
        playerBoard[x][y] = "hit";
    }
    renderTop(playString);
}

function removePlayerShip (remove) {
    playerShips[remove]--;
}

function renderTop (hitString) {
    let test = 0;
    console.log("PLAYER >> ", playerBoard)
    playerBoard.forEach((row, idx) => {
        playerBoard[idx].forEach((col, idy) => {
            if (playerBoard[idx][idy] === "hit") {
                let index = `${(idy*10) + idx}`;
                gridElsTop[index].style.color = "red";
                gridElsTop[index].innerText = "X";
            } 
            if (playerBoard[idx][idy] === "miss") {
                let index = `${(idy*10) + idx}`;
                gridElsTop[index].style.color = "white";
                gridElsTop[index].innerText = "O";
            }
        });
    });

    renderTopMsg(hitString);
}

function renderTopMsg(hitString) {
    for (let item in playerShips) {
        if (playerShips[item] === 0) {
            playerShips[item] = "Sunk!"
        }
    }

    let playerCarrier = `Carrier: ${playerShips.carrier}`
    let playerBattleship = `Battleship: ${playerShips.battleship}`
    let playerSubmarine = `Submarine: ${playerShips.submarine}`
    let playerDestroyer = `Destroyer: ${playerShips.destroyer}`

    console.log("PLAYER |", playerCarrier, playerBattleship, playerSubmarine, playerDestroyer)

    playerFinalString = hitString + "\n" + "\n" + "Player ships left:" + "\n" + playerCarrier + "\n" + playerBattleship + "\n" + playerSubmarine + "\n" + playerDestroyer;
    statusText.innerText = playerFinalString;

    checkOutcome();
}

function renderBotMsg (hitString) {
    for (let item in compShips) {
        if (compShips[item] === 0) {
            compShips[item] = "Sunk!"
        }
    }

    let compCarrier = `Carrier: ${compShips.carrier}`;
    let compBattleship = `Battleship: ${compShips.battleship}`;
    let compSubmarine = `Submarine: ${compShips.submarine}`;
    let compDestroyer = `Destroyer: ${compShips.destroyer}`;
    console.log("COMP |", compCarrier, compBattleship, compSubmarine, compDestroyer)
    finalString = hitString + "\n" + "\n" + "Computer ships left:" + "\n" + compCarrier + "\n" + compBattleship + "\n" + compSubmarine + "\n" + compDestroyer;
    statusBottom.innerText = finalString;

    checkOutcome();
}

function checkOutcome () {
    let winString;
    console.log("Outcome checked!")
    let playerTotal = playerShips.carrier + playerShips.battleship + playerShips.submarine + playerShips.destroyer;
    let compTotal = compShips.carrier + compShips.battleship + compShips.submarine + compShips.destroyer;

    console.log("PLAYER LEFT >>", playerTotal, "COMP LEFT >>", compTotal);

    if (playerTotal === "Sunk!Sunk!Sunk!Sunk!") {
        winString = "The Computer wins!"
    } else if (compTotal === "Sunk!Sunk!Sunk!Sunk!") {
        winString = `${playerName} wins!`
        showOutcome(winString);
    }
}

function showOutcome (winString) {
    main_top.style.display = "none";
    main_bottom.style.display = "none";
    win_box.style.visibility = "visible";
    reset.style.visibility = "visible";
    winMsg.innerText = winString;

    reset.addEventListener("click", (e) => {
        location.reload();
    });
}