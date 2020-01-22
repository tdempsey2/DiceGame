// Set Global variables
let round = 0,
    currentPlayer,
    currentPlayerIterator,
    winnerMsg = '';
const users = new Array();
const dice = new Array();

class Player {
    constructor(name, player) {
        this.userId = '';
        this.name = name;
        this.player = player;
        this.total = 0;
    }

    getId = () => {
        const createId = 'p-' + this.player;
        return this.userId = createId;
    }
}

class Die {
    constructor(dieValue, held, dieId) {
        this.dieId = dieId;
        this.dieValue = dieValue;
        this.held = held;
        this.imgPath = '';
    }

    getDieId = () => {
        const createDieId = 'dice-' + this.dieId;
        return this.dieId = createDieId;
    }

    getImgPath = () => {
        this.dieValue === 0 ? this.dieValue = 4 : this.dieValue;
        return this.imgPath = setImgPath(this.dieValue);
    }

    setValue = (dieValue) => {
        dieValue === 4 ? this.dieValue = 0 : this.dieValue;
    }

    getValue = () => {
        return this.dieValue;
    }
}

let createPlayer = (name, player) => {
    const newPlayer = new Player(name, player);
    newPlayer.name = name;
    newPlayer.userId = player;
    newPlayer.total = 0;
    newPlayer.diceToRoll;
    let id = newPlayer.getId();

    // Add players and totals to cards
    let addUserName = document.getElementById(id);
    addUserName.innerHTML = newPlayer.name;

    let addUserTotal = document.getElementById(id + '-total');
    addUserTotal.innerHTML = newPlayer.total;
    users.push({ id: id, player: newPlayer.player, name: newPlayer.name, total: newPlayer.total });
}

let createDie = (dieValue, held, dieId) => {
    const newDie = new Die(dieValue, held, dieId);
    newDie.setValue(dieValue);
    newDie.held = held;
    dice.push({ id: newDie.getDieId(), value: newDie.getValue(), held: newDie.held, path: newDie.getImgPath() })
}

const playGame = () => {

    clearDom();

    // Create 4 players. Normally they would come from input fields
    createPlayer('Chris', 0);
    createPlayer('Terry', 1);
    createPlayer('Jamie', 2);
    createPlayer('Drew', 3);

    loadDice();

    getRandomPlayer();

    startSimulation();

    getWinner();
}

const loadDice = () => {
    // Create and Load Dice to dom and array
    for (i = 0; i < 5; i++) {
        let die = randomDie();
        createDie(die, false, i);

        let tempDie = dice[i];
        let tempPath = tempDie.path;
        let tempId = 'dice-' + i;
        let tempValue = tempDie.value;

        // Display dice
        let diceDom = document.getElementById(tempId);
        diceDom.src = tempPath;

        // Add value to button
        let cta = diceDom.nextElementSibling;
        cta.addEventListener('click', addChoice);
        cta.value = tempValue;
    }
}

const getRandomPlayer = () => {
    // Get random Player
    let randUser = Math.floor(Math.random() * 4);
    currentPlayer = users[randUser];
    currentPlayerIterator = currentPlayer.player;
}

const startSimulation = () => {
    let i = 0;
    let totalTurns = users.length * 4;
    for (i; i < totalTurns; i++) {
        // setTimeout(() => {
        //     simulateRounds();
        // }, 1000);
        simulateRounds();

        if (i % 4 === 0) {
            displayRound();
        }
    }
}

const getWinner = () => {
    const tempArray = users;

    // Check users array for lowest score(s)
    tempArray.sort(function(a, b) { return a.total - b.total });
    const winningTotal = tempArray[0].total;

    //Determine winners name(s)
    const winners = tempArray.filter(w => w.total === winningTotal);
    let length = winners.length;
    let lastWinner = length - 1;
    winnerMsg = winners[0].name;
    let i = 1;

    if (length > 1) {
        for (i; i < length; i++) {
            if (i === lastWinner) {
                winnerMsg += ` and ${winners[i].name}`;
            } else {
                winnerMsg += `, ${winners[i].name}`;
            }
        }
        if (length === 2) {
            winnerMsg += ' both';
        } else {
            winnerMsg += ' all';
        }
    }

    winnerMsg += ` won with ${winningTotal} points!`

    // Display winners
    const displayWinner = document.getElementById('headText');
    displayWinner.textContent = winnerMsg;
}

// CTA's
const roll = () => {
    const tempArr = dice.filter(s => !s.held)
    let arrLength = tempArr.length;
    let i = 0;
    for (i; i < arrLength; i++) {

        // Find the id of the yet to be held
        let tempId = tempArr[i].id;

        // Generate new value
        let die = randomDie();

        // Set new value in original array and update
        let newDie = dice.find(tid => tid.id === tempId);
        newDie.value = die;
        newDie.path = setImgPath(die);

        // Display dice
        let diceDom = document.getElementById(tempId);
        diceDom.src = newDie.path;
    }
}

const done = () => {
    // Empty the dice array
    dice.length = 0;

    // Get all the add buttons and set the tex to default.
    // Not for simulation
    let addBtn = document.querySelectorAll('.dice-btn-wrap button');
    btnLength = addBtn.length;
    let i = 0;
    for (i; i < btnLength; i++) {
        addBtn[i].innerHTML = 'Hold'
    }
    // Increment player
    setCurrentPlayer();

    // Reload the buttons
    loadDice();
}

// Simulated choice actual choice code is below
const addChoice = () => {

    let tempChoice = randomDie();

    // Add value to Player total
    let player = currentPlayer;
    player.total += parseInt(tempChoice);

    //Update score and count
    let playerTotal = document.getElementById(player.id + '-total');
    playerTotal.innerHTML = player.total;

    const displayCurrentPlayer = document.getElementById('currentPlayer');
    displayCurrentPlayer.textContent = `Player: ${player.name}    Total:  ${player.total}`;

}

const randomDie = () => {
    let die = Math.floor(Math.random() * 6) + 1;
    // Set to test for tie
    //die = 1;
    return die;
}

const simulateRounds = () => {
    let roller = currentPlayerIterator;
    switch (roller) {
        case 4:
            return chooseFour();
            break;
        case 3:
            return chooseThreeOne();
            break;
        case 2:
            return chooseTwo();
            break
        case 1:
            return chooseOne();
            break
        default:
            return chooseFour();
    }
}

const chooseFour = () => {
    roll();
    let i = 0;
    for (i; i < 4; i++) {
        addChoice();
    }
    done();
}

const chooseThreeOne = () => {
    let i = 0;
    roll();
    for (i; i < 3; i++) {
        addChoice();
    }
    roll();
    addChoice();
    done();
}

const chooseTwo = () => {
    let i = 0;
    for (i; i < 2; i++) {
        roll();
        addChoice();
        addChoice();
    }
    done();
}

const chooseOne = () => {
    let i = 0;
    for (i; i < 4; i++) {
        roll();
        addChoice();
    }
    done();
}

const displayRound = () => {
    round += 1;
    let displayRound = document.getElementById('roundOutput');
    displayRound.innerHTML = round;
}

const setCurrentPlayer = () => {
    let index = currentPlayerIterator;
    index === 3 ? index = 0 : index += 1;
    currentPlayerIterator = index;
    currentPlayer = users[index];
}

const clearDom = () => {
    users.length = 0;
    dice.length = 0;
    round = 0;
    winnerMsg = 'Roll to Win!';
}

setImgPath = (value) => {
    return imgPath = 'img/dice-' + value + '.png';
}