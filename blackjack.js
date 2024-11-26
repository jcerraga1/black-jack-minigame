let player = {
    name: "",
    chips: 0
};
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let playerEl = document.getElementById("player-el");
let messageEl = document.getElementById("message-el");
let cardsEl = document.getElementById("cards-el");
let sumEl = document.getElementById("sum-el");

function getInput(){
    document.getElementById("first-page").style.display = 'none';
    document.getElementById("game").style.display = 'block';
    player.name = document.getElementById("username").value;
    player.chips = document.getElementById("charge").value;
    playerEl.textContent = player.name + ": $" + player.chips;
}

function getRandomCard() {
    let randomNumber = Math.floor( Math.random() * 13 ) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber == 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

function startGame() {
    if (player.chips >= 20){
        isAlive = true;
        player.chips -= 20;
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        cards = [firstCard, secondCard];
        sum = firstCard + secondCard;
        playerEl.textContent = player.name + ": $" + player.chips;
        renderGame();
    }else {
        messageEl.textContent = "Not enough money to start a new game :("
        cardsEl.textContent = "Cards: ";
        sumEl.textContent = "Sum: ";
    }
}

function renderGame(){

    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
        isAlive = true
    } else if (sum === 21) {
        message = "You've got BlackJack!"
        isAlive = false
        player.chips += 60;
        playerEl.textContent = player.name + ": $" + player.chips;
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}

