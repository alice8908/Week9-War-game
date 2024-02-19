// Coding Steps:
// For the final project you will be creating an automated version of the classic card game WAR! There are many versions of the game WAR. In this version there are only 2 players.
// You do not need to do anything special when there is a tie in a round.
// Think about how you would build this project and write your plan down. Consider classes such as: Card, Deck, Player, as well as what properties and methods they may include.
// You do not need to accept any user input, when you run your code, the entire game should play out instantly without any user input inside of your browser's console.

// The completed project should, when executed, do the following:
// Deal 26 Cards to each Player from a Deck of 52 cards.
// Iterate through the turns where each Player plays a Card.
// The Player who played the higher card is awarded a point.
// Ties result in zero points for both Players.
// After all cards have been played, display the score and declare the winner.

//---------------------------------------------------------------------

// Creating a class named Card
class Card{
    constructor(name, suit, value){
        this.name = name;
        this.suit = suit;
        this.value = value;
    }
}

// Creating a class named Deck
// this.values will get the value for cards such as 'J', 'Q', 'K', 'A'
// that does not have numeric value.
class Deck{
    constructor() {
        this.cards = [];
        this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        this.names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.values = [2, 3, 4, 5, 6, 7, 8, 9 , 10, 11, 12, 13, 14];
    }

    // Creating a Deck contains 52 cards. 
    // Deck will have 4 different suits, 13 different valued cards.
    createDeck(){
        for (let i = 0; i < this.suits.length; i++) {
            for (let n = 0; n < this.names.length; n++){
                this.cards.push(new Card(this.suits[i], this.names[n], this.values[n]))
            }
        }
    }

    // Chaning an order of card to random order.
    shuffleDeck(){
        const shuffledDeck = [];
        for (let i = 0; i <52; i++){
            let randomCards = Math.floor((this.cards.length - i)* Math.random());
            let randomPick = this.cards.splice(randomCards, 1);
            shuffledDeck.push(randomPick);
        }
        return shuffledDeck;
    }

    // Spliting a deck into two for two players.
    splitDeck(players, shuffleDeck) {
        let splitCards1 = shuffleDeck.splice(0,26);
        for (let i = 0 ; i < splitCards1.length; i++){
            players[0].hands.push(splitCards1[i]);
        }

        let splitCards2 = shuffleDeck.splice(0, 26);
        for (let i = 0 ; i < splitCards2.length; i++){
            players[1].hands.push(splitCards2[i]);
        }
    }

}

class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.hands = [];
    }
}

class Game{
    constructor(){
        this.players = [];
    }

    // Before the actual game starts, creating 2 players, set a new deck.
    readyForGame(){
        this.players.push(new Player('Player 1'));
        this.players.push(new Player('Player 2'));
        
        let newDeck = new Deck();
        newDeck.createDeck();
        let shuffledDeck = newDeck.shuffleDeck();   
        newDeck.splitDeck(this.players, shuffledDeck);

        this.gameStart();
        this.gameEnd();
    }

    gameStart(){
       let player1 = this.players[0];
       let player2 = this.players[1];

       let roundWinner = '';
       let turn = 0;

       while (player1.hands.length !== 0 && player2.hands.length !==0){
        
            let player1Card = player1.hands.pop()[0];
            let player2Card = player2.hands.pop()[0];

            // Comparing two player's cards and check the winner.
            // Winner gets 1 point, and continue to next round
            // untill they use all the cards they have (26 rounds)
            if(player1Card.value > player2Card.value) {
                // When player 1 wins
                roundWinner = player1.name;
                player1.points += 1;
                console.log(
                    'Turn : ', (turn+=1), 
                    '\nPlayer1 Card : ', player1Card.suit, 
                    'of', player1Card.name, 
                    '\nPlayer2 Card : ', player2Card.suit, 
                    'of', player2Card.name,
                    '\nRound Winner is : ', roundWinner)
            } else if (player2Card.value > player1Card.value){
                // When player 2 wins
                roundWinner = player2.name;
                player2.points += 1;
                console.log(
                    'Turn : ', (turn+=1), 
                    '\nPlayer1 Card : ', player1Card.suit, 
                    'of', player1Card.name, 
                    '\nPlayer2 Card : ', player2Card.suit, 
                    'of', player2Card.name,
                    '\nRound Winner is : ', roundWinner)
            } else {
                console.log(
                    // When they got same value cards.
                    // This rounds is a tie game, no scores for anyone.
                    '\nTurn : ', (turn+=1), 
                    '\nPlayer1 Card : ', player1Card.suit, 
                    'of', player1Card.name, 
                    '\nPlayer2 Card : ', player2Card.suit, 
                    'of', player2Card.name,
                    '\nThere is no winner')
            }
        }
    }

    gameEnd(){
        let gameWinner = "";
        let player1 = this.players[0];
        let player2 = this.players[1];
        let winnerPoints = 0;

        if(player1.points > player2.points) {
            // When player 1 wins
            gameWinner = player1.name;
            winnerPoints = player1.points;
            console.log(
                'Game winner is ', '<', gameWinner, '>',
                'Final Score : ', winnerPoints, 
                '\nFinal Score of Player 2 :', player2.points);
        } else if (player2.points > player1.points) {
            //when player 2 wins
            gameWinner = player2.name;
            winnerPoints = player2.points;
            console.log(
                'Game winner is ', '<', gameWinner, '>',
                'Final Score: ', winnerPoints, 
                '\nFinal Score of Player 1 :', player1.points);
        } else {
            // In case they ended up with same score.
            console.log('The scores are even. Tie game!');
        }
    }

}


let game = new Game();
game.readyForGame();
