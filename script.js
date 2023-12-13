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

const cardNumbers = MyCards.length; // set cardNumbers to be my array lenght
const cardGrid = document.getElementById("cards"); // set a cardGrid by id to cretae my cards
const cardScore = document.getElementById("score"); // set card score by id to get my score
const cardTimer = document.getElementById("secondTimer"); // set card timer for my time counting
const cardError = document.getElementById("errorCount"); // set card score by id to get my score
let selectedCards = []; //using an array for matched and flipped card
let twoMatchedCards = 0; //using variable to count the number matched card
let waitForMove = 0; //using variable for preventing more than two click
let startThegame = false; //set the start game to false
let timerInterval; // using for counting the time in second
let score = 0; // start the game from second zero
let errorCount = 0; // a variable for the number of errors
let seconds = 0; // a variable that set time will start from second zero
const players = {
  // create an object that have two player plaer 1 and player 2 with elemnt score, errors and time
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
currentPlayer = 1 ;

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
    //using the index in my array to create my grid
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
// Initialize variables to track elapsed time for each player
let player1ElapsedTime = 0; // variable that elapse time for player 1
let player2ElapsedTime = 0; // variable that elapse time for player 2
let player1Score = 0 ; //set the score for player 1
let player2Score = 0 ; //set the score for player 2
let player1Error = 0 ; //set the errors for player 1
let player2Error = 0 ; //set the errors for player 2





// ================== Function to start the game timer =============================================
function startGameTimer() { 
  timerInterval = setInterval(() => {
    // use setIntervale that count by 1 second incrementation
    // Increment the elapsed time for the current player
    if (currentPlayer === 1) {
      // statement if the player 1 we will elpase time for player 1
      player1ElapsedTime++; // incrementation of time
     
    } else {
      player2ElapsedTime++; // else is the second player playing and increment his time
    }
    cardTimer.textContent =
      currentPlayer === 1 ? player1ElapsedTime : player2ElapsedTime; // display the updated time for each player
  }, 1000);
}


//============ function to update score for player 1 ============================
function updatePlayer1Score() { 
  players[1].score = player1Score; // Update the score for Player 1
  document.getElementById("player1Score").textContent = `Score: ${players[1].score}`;
}


//=========== function to update  score for player 2 ================================
function updatePlayer2Score() {
  players[2].score = player2Score; // Update the score for Player 2
  document.getElementById("player2Score").textContent = `Score: ${players[2].score}`;
}


//=========== function to update errors for player 1 ==================================
function updatePlayer1Errors() {
  players[1].errors = player1Error; // Update the error count for Player 1
  document.getElementById("player1Errors").textContent = `Errors: ${players[1].errors}`;
}



//========== function to update errors for player 2 =====================================
function updatePlayer2Errors() {
  players[2].errors = player2Error; // Update the error count for Player 2
  document.getElementById("player2Errors").textContent = `Errors: ${players[2].errors}`;
}










// ========== Function to reset the entire game ==========
function resetGame() {
  // the name of resetgame linked to restart button each time we restart game will erase all data
  //reset all the game
  clearInterval(timerInterval); // reset the time
  cardGrid.innerHTML = ""; // Clear the grid
  cardTimer.textContent = "0"; //set the timer on my screen to zero
  score = 0; //set the score to zero
  errorCount = 0; // set the error count to zero
  twoMatchedCards = 0; // set the matched card to zero
  startThegame = false; //set the start game to zero
  selectedCards = []; // set the array that memorize matched and turned card to zero
  waitForMove = 0; // set 2 clicks to zero
  seconds = 0;


  player1ElapsedTime = 0; // reset elapse time for player 1
  player2ElapsedTime = 0; // reset elpase time for player 2
  player1Score = 0; // reset score for player 1
  player2Score = 0; //reset score for player 2
  player1Error = 0; // reset error for player 1
  player2Error = 0; // reset error for player 2

  updatePlayer1Score(); //invoke score update player1
  updatePlayer1Errors();  //invoke errors update player 1
  updatePlayer2Score();  //invoke score update player2
  updatePlayer2Errors();  //invoke errors update player 2
 

  //   resetTheCards(); // Reset the cards
  shuffleAndCreateGrid(MyCards); // Create a new shuffled grid
  hideCards(); // invoke Hide the cards


}

//======== the restart Button fonctionality =============
const restartButton = document.getElementById("restartButton"); //create an eventListner for my restart button
restartButton.addEventListener("click", resetGame); 





// ==================== Function to reveal two chosen cards and handle the game logic ==================
function reveal2chosenCard(card) {
  //the longest logic to work on it. the name of the function
  if (waitForMove === 0) {
    // statement if there is no move or 2 clicks
    selectedCards.push(card); // mean we can click and we push them to the empty array we created
     
    if (selectedCards.length === 2) {
      //if my array  have already 2 cards inside
      waitForMove = 2; // set the move to two fro not making any click
      const firstCard = selectedCards[0]; // set the first card revealed with index 0
      const secondCard = selectedCards[1]; // set the second card revealed with index 1

      if (firstCard.dataset.index === secondCard.dataset.index) {
        //statement if the first card index meet each other remove them from the list
        selectedCards.pop(); //remove them from the array
        waitForMove = 0;
        return;
      }

      if ( //statement if the card matched hint = i did it by image source because I duplicate my list
        firstCard.querySelector("img").src ===
        secondCard.querySelector("img").src
      ) {
        firstCard.classList.add("matched"); // switch the class of the card to matched
        secondCard.classList.add("matched"); // switch the class of the card to matched

        cardGrid.removeChild(firstCard); //each time the card are match will be removed from the grid
        cardGrid.removeChild(secondCard); //remove the matched second card as well

        selectedCards = []; // once the card matched clear the array
        waitForMove = 0;  // make move to zero to have another two clicks
        twoMatchedCards += 2; // set the matched card to 2
        score += 2; // Update the overall score

        // Update player scores based on the current player
        if (currentPlayer === 1) {
          player1Score += 2; // Update Player 1's score
          updatePlayer1Score(); // Call the function to update Player 1's score
        } else {
          player2Score += 2; // Update Player 2's score
          updatePlayer2Score(); // Call the function to update Player 2's score
        }

        if (twoMatchedCards === cardNumbers) { //statement if the card twomatched card equal to my card number mean my array lenght
          endGame(); //call the function endgame mean all the card in the grid are matched 
          clearInterval(timerInterval);
        }
      } else { //otherwise 
        errorCount += 1; // increment the errors

        // Update player errors based on the current player
        if (currentPlayer === 1) {
          player1Error += 1; // Update Player 1's error count
          updatePlayer1Errors(); // Call the function to update Player 1's error count
        } else {
          player2Error += 1; // Update Player 2's error count
          updatePlayer2Errors(); // Call the function to update Player 2's error count
        }

        setTimeout(() => {
          firstCard.classList.remove("turnOver"); // access first card and remove the flip it using classList remove
          secondCard.classList.remove("turnOver");// access second card and remove the flip because they don't match
          selectedCards = []; // set my selected card to empty again
          waitForMove = 0; // set waitfor move to have another two clicks
        }, 1000); //by 1second mean 1000 milisecond
      }
    }
  }
}





// ==================== function switch players  ==================================================
function switchPlayer() { // create function switch to switch player between player 1 and player 2 when we click in buttons 
  currentPlayer = currentPlayer === 1 ? 2 : 1; //switches the current player and keep trucking the data for each player 
}

const player1Button = document.getElementById("player1Button"); // add an event listner for the buttons player 1 and player 2
const player1Info = document.getElementById("player1"); // hide and show the player who is playing 
const player2Info = document.getElementById("player2");
player1Button.addEventListener("click", () => {
  if (currentPlayer === 1) { // statement for the current player 
    switchPlayer(); // invoke switch to switch a player
    
    player1Info.style.display = "block";
    player2Info.style.display = "block";
    updatePlayer1Score();
    updatePlayer1Errors();
    // document.getElementById("player1Time").textContent = `Player 1 Time: ${player1ElapsedTime}s`;
  }
});

const player2Button = document.getElementById("player2Button"); // add event listner for button 2 
player2Button.addEventListener("click", () => {
  if (currentPlayer === 2) {
    switchPlayer();
    
    player1Info.style.display = "block";
    player2Info.style.display = "block";
    updatePlayer2Score();
    updatePlayer2Errors();
    // document.getElementById("player2Time").textContent = `Player 2 Time: ${player2ElapsedTime}s`;
  }
});





//================ function for a winner player ==========================================
function playerWinner() {
  if (players[1].score > players[2].score) { // statement if player 1 score higher than player 2 score 
    return 1; // Player 1 wins
  } else if (players[2].score > players[1].score) { // statement if player 2 score higher player 2 win 
    return 2; // Player 2 wins
  } else {   // if the players has the same score we can compare errors who has fewer errors is the winner 
    if (players[1].errors < players[2].errors) { // if the player 1 has fewer errors 
      return 1; // Player 1 wins based on fewer errors
    } else if (players[2].errors < players[1].errors) { // player 2 has fewer errors 
      return 2; // Player 2 wins based on fewer errors
    } else {
      return 0; // It's a tie, no clear winner
    }
  }
}


// =========== function end of the game to link it when all card are revealed or matched 
function endGame() {
  const winner = playerWinner();
  displayWinnerMessage(winner);
  openModal();
  clearInterval(timerInterval);
}








function openModal() {
  document.getElementById('endGameModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('endGameModal').style.display = 'none';
}

function displayWinnerMessage(winner) {
  const messageElement = document.getElementById('winnerMessage');
  if (winner === 1) {
      messageElement.textContent = 'Player 1 is the winner!';
  } else if (winner === 2) {
      messageElement.textContent = 'Player 2 is the winner!';
  } else {
      messageElement.textContent = 'It\'s a tie!';
  }
}

function replayGame() {
  window.location.reload();
}

function exitGame() {
  // Attempt to close the window
  window.close();

  // If window.close() is blocked or not supported, show an alternative message
  alert('Exiting the game...');

}