let round = 1,
    rounds, roundDone;
const roundsDone = new Array();
const users = new Array();
const diceToRoll = new Array();
const diceRolled = new Array();

class User {
    constructor(name, player) {
        this.userId = '';
        this.name = name;
        this.player = player;
        this.total = 0;

    }

    getId = () => {
        const creatId = 'p-' + this.player;
        return this.userId = creatId;
    }

    setTotal = (total) => {
        this.total += total;
    }

    getTotal = () => {
        return this.total;
    }
};

let createUser = (name, player) => {
    const newPlayer = new User(name, player);
    newPlayer.name = name;
    newPlayer.userId = player;
    newPlayer.total = 0;
    newPlayer.diceToRoll;
    let id = newPlayer.getId();
    console.log('userId :', id, 'name :', name);

    let addUserName = document.getElementById(id);
    addUserName.innerHTML = newPlayer.name;

    let addUserTotal = document.getElementById(id + '-total');
    addUserTotal.innerHTML = newPlayer.total;
    users.push({ id: id, name: newPlayer.name, total: newPlayer.total });
}

const playGame = () => {
    clearDom();

    // Create 4 players. Normally they would come from input fields
    createUser('Chris', 1);
    createUser('Terry', 2);
    createUser('Jamie', 3);
    createUser('Drew', 4);
    // let showPanels = document.querySelectorAll('.players-panel');
    // console.log('showPanels :', showPanels);

    // Get random user
    let randUser = Math.floor(Math.random() * 4);
    let firstPlayer = users[randUser];
    roll(firstPlayer);
    while (round < 4 && !roundDone) {
        round += 1;
        trackRounds();
    }
    getWinner();
}


const roll = (user) => {
    console.log('user :', user);
    let numDice = diceToRoll.length;
    console.log('numDice :', numDice);
    let i = 0;
    // if (numDice = 0) {
    //     // Load Dice
    console.log('here :', "here2");
    for (i; i < 5; i++) {
        let dice = Math.floor(Math.random() * 6) + 1;
        diceToRoll.push(dice);
        console.log('user :', diceToRoll);
    }
    // }

}

const trackRounds = () => {

    let displayRound = document.getElementById('roundOutput');
    displayRound.innerHTML = round;
    console.log('displayRound :', displayRound);

}

const getWinner = () => {
    // Check users array for lowest score(s)

    // Determine winners name(s)

    // Display winners

}

const clearDom = () => {
    users.length = 0;
}