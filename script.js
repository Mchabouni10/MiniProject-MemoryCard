const MyCards = [
  //my array to store the cards
  "images/1.png",
  "images/2.png",
  "images/3.png",
  "images/4.png",
  "images/5.png",
  "images/6.png",
  "images/7.png",
  "images/8.png",
  "images/1.png",
  "images/2.png",
  "images/3.png",
  "images/4.png",
  "images/5.png",
  "images/6.png",
  "images/7.png",
  "images/8.png",
];

const cardNumbers = MyCards.length;
const cardGrid = document.getElementById("cards");
const cardScore = document.getElementById("score");
const cardTimer = document.getElementById("secondTimer");
let selectedCards = []; //using an array for matched and flipped card
let twoMatchedCards = 0; //using variable to count the number matched card
let waitForMove = 0; //using variable for preventing more than two click
let startThegame = false; //set the start game to false
let timerInterval; // using for counting the time in second
let score = 0; // start the game from second zero
let errorCount = 0; // a variable for the number of errors
let seconds = 0; //
const players = {
  1: {
    score: 0,
    errors: 0,
    time: 0,
  },
  2: {
    score: 0,
    errors: 0,
    time: 0,
  },
};
let currentPlayer = 1; //set the player 1

shuffleAndCreateGrid(MyCards); // always shuffle the card in ramdmizw when game start
hideCards(); // hide cards when the game start
playerTurn();

//let create function that randomize my array of cards this way we
//can change the postion of the cards each time revealed.

// =======Function to shuffle an array============
function shuffleArray(array) {
  //name the function shuffle the Array
  for (let i = array.length - 1; i > 0; i--) {
    //using for loop to iterate my array
    const j = Math.floor(Math.random() * (i + 1)); //using math floor to generate a random integer j between 0 and i
    [array[i], array[j]] = [array[j], array[i]]; //swapping a value between two variables without a need of temporary variable
  }
}

// ============== Function to create and shuffle the game grid =============================
function shuffleAndCreateGrid(cards) {
  // function called shuffle and create my grid usining DOM
  cardGrid.innerHTML = ""; // clean my screen each time we start the game
  shuffleArray(cards); // call the function shuffle to shffule before to put the card in the grid

  cards.forEach((card, index) => {
    //using the index in my array to crate my grid
    const cardElement = document.createElement("div"); // create a div using createElement
    cardElement.classList.add("card"); // add the class card to the image
    cardElement.dataset.index = index; //using dataset from w3 school to get image imformation

    const cardFront = document.createElement("div"); // create a frond face for the card and is the image itself
    cardFront.classList.add("card-front"); // add a class card - front to the face up

    const cardBack = document.createElement("div"); //create a back for the image is just a background
    cardBack.classList.add("card-back"); // add a class for the back of the card

    const img = document.createElement("img"); // creat an image using create Element to the src
    img.src = card;
    cardFront.appendChild(img); // append the image to my screen

    cardElement.appendChild(cardFront); //append to screen the front face image
    cardElement.appendChild(cardBack); //append to screen the back card grey background

    cardElement.addEventListener("click", () => {
      // add an eventlistner click to the cards
      if (!startThegame) {
        //my logic start fro here statement if game not started yet
        startGameTimer(); // call the to start the game time
        startThegame = true; // change start the game to true from the first click
      }

      if (waitForMove < 2 && !cardElement.classList.contains("matched")) {
        //if my move hasn't two click yet or already matched
        cardElement.classList.toggle("turnOver"); //using toggle to change the card to turnOver
        reveal2chosenCard(cardElement); //call the function reveal 2 card with the logic I set up
      }
    });

    cardGrid.appendChild(cardElement); //append them to my screen
  });
}

// =========Function to hide the cards (turn them face down)==============
function hideCards() {
  //function that hide the cards in the begning of the game or when we click reset the game
  const allCards = document.querySelectorAll(".card"); //create const allcards to select all the cards in my array
  allCards.forEach((card) => {
    //using a loop for each element inside my array
    card.classList.remove("turnOver"); //remove the cards that been turned over
  });
}

// ================= Function to start the game timer =================
function startGameTimer() {
  //function to called startgameTimer to count the second from the start of the game through the end
  //set up second to zero to start from second zero
  timerInterval = setInterval(() => {
    //using w3 school to understand the pupose of this function
    seconds++; //increment the seconds by 1 second using setInterval
    cardTimer.textContent = seconds; //append the seconds in my screen
  }, 1000); // using 1000 millisecond or 1 second as counting unit
}

// // ============ Function to reset the cards to their initial state (face down) ============= I don't need it for now
// function resetTheCards() { // function that reset the card when I load or when I restart the game
//   const allCards1 = document.querySelectorAll(".card"); //create a const that iretarate my array
//   allCards1.forEach((card) => { //itterate all my array for each card using there id
//     card.classList.remove("turnOver", "matched"); //using ClassList remove to remove the turned and matched cards
//   });
// }








// ========== Function to reset the entire game ==========
function resetGame() {
  //reset all the game
  clearInterval(timerInterval);
  cardGrid.innerHTML = ""; // Clear the grid
  cardTimer.textContent = "0"; //set the timer on my screen to zero
  score = 0; //set the score to zero
  errorCount = 0; // set the error count to zero
  twoMatchedCards = 0; // set the matched card to zero
  startThegame = false; //set the start game to zero
  selectedCards = []; // set the array that memorize matched and turned card to zero
  waitForMove = 0;
  //   resetTheCards(); // Reset the cards
  shuffleAndCreateGrid(MyCards); // Create a new shuffled grid
  hideCards(); // invoke Hide the cards
  updateScoreDisplay(); //invoke scre update
  updateErrorCount(); //invoke errors update to update all this 3 to zero
  document.getElementById("exitScreen").style.display = "none";
}









// ==================== Function to reveal two chosen cards and handle the game logic ========
function reveal2chosenCard(card) {
  //the longest logic to work on it. the name of the function
  if (waitForMove === 0) {
    // statement if there is no move or 2 clicks
    selectedCards.push(card); // mean we can click and we push them to the empty array we created

    if (selectedCards.length === 2) {
      //if my array  have already 2 cards inside
      waitForMove = 2; // set the move to two fro not making any click
      playerTurn();
      const firstCard = selectedCards[0]; // set the first card revealed with index 0
      const secondCard = selectedCards[1]; // set the second card revealed with index 1

      if (firstCard.dataset.index === secondCard.dataset.index) {
        //statement if the first card index meet each other remove them from the list
        selectedCards.pop();
        waitForMove = 0;
        return;
      }

      if (
        //statement if the card matched hint = i did it by image source because I duplicate my list
        firstCard.querySelector("img").src ===
        secondCard.querySelector("img").src
      ) {
        firstCard.classList.add("matched"); // switch the class of the card to matched
        secondCard.classList.add("matched"); // switch the class of the card to matched
        cardGrid.removeChild(firstCard); //each time the card are match will be removed from the grid
        cardGrid.removeChild(secondCard); //remove the matched second card as well

        selectedCards = []; // once the card matched clear the array
        waitForMove = 0; // make move to zero to have another two clicks
        twoMatchedCards += 2; // set the matched card to 2
        score += 2; // Update player score
        updateScoreDisplay(); // Update the score display on the page

        if (twoMatchedCards === cardNumbers) {
          // statement if the card twomatched card equal to my card number mean my array lenght
          clearInterval(timerInterval); //mean we matched all the card and game is over
          showPromptScreen();

        }
      } else {
        errorCount += 1;
        updateErrorCount();
        setTimeout(() => {
          firstCard.classList.remove("turnOver");
          secondCard.classList.remove("turnOver");
          selectedCards = [];
          waitForMove = 0;
        }, 2000);
      }
    }
  }
}



//======== the restart Button fonctionality =============
const restartButton = document.getElementById("restartButton"); //create an eventListner for my restart button
restartButton.addEventListener("click", resetGame);

// ====================== Initial game setup ==================
shuffleAndCreateGrid(MyCards);
hideCards(); // Hide the cards when the game starts
updateScoreDisplay(); //will update the score to zero
updateErrorCount(); //update the errors to zero

// ====================== function for my score ============================
function updateScoreDisplay() {
  // function that update the score each time two cards matched
  const scoreDisplay = document.getElementById("score"); //access the score display using get elementById
  scoreDisplay.textContent = `Score: ${score}`; // show the score updated each time on my screen
}

// =========== function to count the number of error after 2 click not matched  ==================
function updateErrorCount() {
  // once we click twice and cards doesn't match is one error
  const errorCountScreen = document.getElementById("errorCount"); //get the error usin get Element ById
  errorCountScreen.textContent = `Errors: ${errorCount}`; //Display the error countion on my screen using textcentent
}

// ========= function for player turn ================
function playerTurn() {
  //function to switch between two players
  const player1On = document.getElementById("player1"); //access the player 1
  const player2On = document.getElementById("player2"); //access the player 2

  if (currentPlayer === 1) {
    //statement if the is 1 mean show player 1 and hide player 2
    player1On.style.display = "block";
    player2On.style.display = "none";
  } else {
    player1On.style.display = "none";
    player2On.style.display = "block";
  }
}

//========= add buttons for player 1 and player 2 ===========
const player1Button = document.getElementById("player1Button"); // access to button for player 1
const player2Button = document.getElementById("player2Button"); // access to button for player 2

player1Button.addEventListener("click", () => {
  //add an eventListner click for player 1
  currentPlayer = 1; //the current player is 1

  players[2].time = seconds; //switch time when we switch player with Dylan help
  seconds = players[1].time;
  playerTurn(); //invoke function player turn to call the player
});

player2Button.addEventListener("click", () => {
  //add an eventListner when we click player 2 button
  currentPlayer = 2;
  players[1].time = seconds; //switch time to player 1 to keep tracking time
  seconds = players[2].time;
  playerTurn(); // invoke function to player 2
});

// ===== function to update each player's game data and display =====
function updatePlayerData(playerNumber) {
  const currentPlayerData = players[playerNumber];
  const playerScoreElement = document.getElementById(
    `player${playerNumber}Score`
  );
  const playerErrorsElement = document.getElementById(
    `player${playerNumber}Errors`
  );
  const playerTimeElement = document.getElementById(
    `player${playerNumber}Time`
  );

  playerScoreElement.textContent = `Score: ${currentPlayerData.score}`;
  playerErrorsElement.textContent = `Errors: ${currentPlayerData.errors}`;
  playerTimeElement.textContent = `Time: ${currentPlayerData.time}s`;
}
//===== function  update each player Game Data ============
function updateGameData() {
  const currentPlayerData = players[currentPlayer];
  currentPlayerData.score = score;
  currentPlayerData.errors = errorCount;
  currentPlayerData.time = parseInt(cardTimer.textContent); //I have it from Internet
  // const currentPlayerDisplay = document.getElementById(`player${currentPlayer}`);
  // currentPlayerDisplay.innerHTML = `Player ${currentPlayer} - Score: ${score}, Errors: ${errorCount}, Time: ${currentPlayerData.time}s`;
}

//============= function to switch players ===========
function switchPlayer() {
  // Update the game data for the current player
  updateGameData();

  // Switch to the other player (1 -> 2 or 2 -> 1)
  currentPlayer = currentPlayer === 1 ? 2 : 1; // I just find it overflow and took the idea
  playerTurn();

  // Update the display with the new player's data
  const currentPlayerData = players[currentPlayer];
  score = currentPlayerData.score;
  errorCount = currentPlayerData.errors;
  cardTimer.textContent = currentPlayerData.time;
  updateScoreDisplay();
  updateErrorCount();
}

// Add event listeners to the player switch buttons
player1Button.addEventListener("click", switchPlayer);
player2Button.addEventListener("click", switchPlayer);


//function
// function findWinner(){
//   if (score){
//     numb
    

//   }
// }

// function for promptScreen
function showPromptScreen() {
  // Hide the existing prompt screen if it's displayed
  document.getElementById("exitScreen").style.display = "block";
  document.getElementById('PromptScreen').style.display = 'block';

  // Display the new prompt screen with the winning information
  document.getElementById('player1').textContent = players.textContent;
  console.log(players);
  document.getElementById("FinalScore").textContent = score;
  document.getElementById("FinalTime").textContent = cardTimer.textContent;
  document.getElementById("FinalErros").textContent = errorCount;
  

  document
    .getElementById("confirmYesButton")
    .addEventListener("click", exitGame);
    
  document
    .getElementById("confirmNoButton")
    .addEventListener("click", resetGame);
  
}

function exitGame() {
  window.close();
}