const MyCards = [
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


shuffleAndCreateGrid(MyCards);
hideCards();

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to create and shuffle the game grid
function shuffleAndCreateGrid(cards) {
  cardGrid.innerHTML = "";
  shuffleArray(cards);

  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.index = index;

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    const img = document.createElement("img");
    img.src = card;
    cardFront.appendChild(img);

    cardElement.appendChild(cardFront);
    cardElement.appendChild(cardBack);

    cardElement.addEventListener("click", () => {
      if (!startThegame) {
        startGameTimer();
        startThegame = true;
      }

      if (waitForMove < 2 && !cardElement.classList.contains("matched")) {
        cardElement.classList.toggle("turnOver");
        reveal2chosenCard(cardElement);
      }
    });

    cardGrid.appendChild(cardElement);
  });
}

// Function to hide the cards (turn them face down)
function hideCards() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.classList.remove("turnOver");
  });
}

// Function to start the game timer
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
