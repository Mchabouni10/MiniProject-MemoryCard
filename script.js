const MyCards = [ //my array to store the cards 
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
let selectedCards = [];
let twoMatchedCards = 0;
let waitForMove = 0;
let startThegame = false;
let timerInterval;
let score = 0;
let errorCount = 0;


shuffleAndCreateGrid(MyCards);// always shuffle the card in ramdmizw when game start
hideCards(); // hide cards when the game start




//let create function that randomize my array of cards this way we
//can change the postion of the cards each time revealed.


// =======Function to shuffle an array============
function shuffleArray(array) { //name the function shuffle the Array
  for (let i = array.length - 1; i > 0; i--) { //using for loop to iterate my array
    const j = Math.floor(Math.random() * (i + 1)); //using math floor to generate a random integer j between 0 and i
    [array[i], array[j]] = [array[j], array[i]]; //swapping a value between two variables without a need of temporary variable
  }
}

// ============== Function to create and shuffle the game grid =============================
function shuffleAndCreateGrid(cards) { // function called shuffle and create my grid usining DOM
  cardGrid.innerHTML = ""; // clean my screen each time we start the game
  shuffleArray(cards); // call the function shuffle to shffule before to put the card in the grid 

  cards.forEach((card, index) => { //using the index in my array to crate my grid
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
    cardElement.appendChild(cardBack);  //append to screen the back card grey background

    cardElement.addEventListener("click", () => { // add an eventlistner click to the cards 
      if (!startThegame) { //my logic start fro here statement if game not started yet
        startGameTimer(); // call the to start the game time
        startThegame = true; // change start the game to true from the first click
      }

      if (waitForMove < 2 && !cardElement.classList.contains("matched")) { //if my move hasn't two click yet or already matched 
        cardElement.classList.toggle("turnOver"); //using toggle to change the card to turnOver
        reveal2chosenCard(cardElement); //call the function reveal 2 card with the logic I set up
      }
    });

    cardGrid.appendChild(cardElement); //append them to my screen 
  });
}

// =========Function to hide the cards (turn them face down)==============
function hideCards() { //function that hide the cards in the begning of the game or when we click reset the game 
  const allCards = document.querySelectorAll(".card"); //create const allcards to select all the cards in my array
  allCards.forEach((card) => { //using a loop for each element inside my array 
    card.classList.remove("turnOver"); //remove the cards that been turned over 
  });
}

// ================= Function to start the game timer =================
function startGameTimer() {
  let seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    cardTimer.textContent = seconds;
  }, 1000);
}

// Function to reset the cards to their initial state (face down)
function resetTheCards() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.classList.remove("turnOver", "matched");
  });
}

// Function to reset the entire game
function resetGame() {
  clearInterval(timerInterval);
  cardGrid.innerHTML = ""; // Clear the grid
  cardTimer.textContent = "0";
  score = 0;
  errorCount = 0
  twoMatchedCards = 0;
  startThegame = false;
  selectedCards = [];
  waitForMove = 0;
  resetTheCards(); // Reset the cards
  shuffleAndCreateGrid(MyCards); // Create a new shuffled grid
  hideCards(); // Hide the cards
  updateScoreDisplay();
  updateErrorCount()
}

// Function to reveal two chosen cards and handle the game logic
function reveal2chosenCard(card) {
  if (waitForMove === 0) {
    selectedCards.push(card);

    if (selectedCards.length === 2) {
      waitForMove = 2;

      const firstCard = selectedCards[0];
      const secondCard = selectedCards[1];

      if (firstCard.dataset.index === secondCard.dataset.index) {
        selectedCards.pop();
        waitForMove = 0;
        return;
      }

      if (
        firstCard.querySelector("img").src ===
        secondCard.querySelector("img").src
      ) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        cardGrid.removeChild(firstCard);
        cardGrid.removeChild(secondCard);

        selectedCards = [];
        waitForMove = 0;
        twoMatchedCards += 2;
        score += 1; // Update player score
        updateScoreDisplay(); // Update the score display on the page
        

        if (twoMatchedCards === cardNumbers) {
          clearInterval(timerInterval);
          setTimeout(() => {
            alert(
              "Congratulations! You won! Your time: " + cardTimer.textContent
            );
          }, 500);
        }
      } else {
        errorCount += 1
        updateErrorCount()
        setTimeout(() => {
          firstCard.classList.remove("turnOver");
          secondCard.classList.remove("turnOver");
          selectedCards = [];
          waitForMove = 0;
        }, 1000);
      }
    }
  }
}

const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", resetGame);

// Initial game setup
shuffleAndCreateGrid(MyCards);
hideCards(); // Hide the cards when the game starts
updateScoreDisplay();
updateErrorCount();




// function for my score ============================
function updateScoreDisplay() {
  const scoreDisplay = document.getElementById("score");
  scoreDisplay.textContent = `Score: ${score}`;
}



//funct
function updateErrorCount() {
    const errorCountScreen = document.getElementById("errorCount");
    errorCountScreen.textContent = `Errors: ${errorCount}`;
  }
