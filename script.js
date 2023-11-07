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

console.log(MyCards);

//let create function that randomize my array of cards this way we
//can change the postion of the cards each time revealed.
const shuffleAndCreateGrid = (MyCards) => {
  for (let i = MyCards.length - 1; i > 0; i--) {
    //starting from last element working down it garantee
    const j = Math.floor(Math.random() * (i + 1)); //the last element in our array have a chance of being swapped with any other element in our array
    [MyCards[i], MyCards[j]] = [MyCards[j], MyCards[i]]; //generate a random integer j between 0 and i
  }

  //using mathfloor to get a random integer with this range
  //using mathfloor to get a random integer with this range

  // Create my card on the grid using DOM like we learn it in class
  const container = document.querySelector(".myScreen"); //access to my grid that I named myScreen
  container.innerHTML = ""; //clean the screen each time

  for (let i = 0; i < MyCards.length; i++) {
    // create a loop that iretrate all the lengrh of my array
    const card = document.createElement("div"); // creat a div for each element in my array
    const backCard = document.createElement('div') 

    card.classList.add("card"); // add a class name card for each card created
    backCard.classList.add('backCard')
    card.dataset.MyCards = MyCards[i]; //using dataset to import my card to my grid

    const img = document.createElement("img"); //create a variable img to add my images to card
    img.src = MyCards[i]; //store each image inside my Array that I called Mycards
    card.appendChild(img); //display my Image isnide the div
    card.appendChild(backCard)

    container.appendChild(card); // display all cards on my Grid or Screen
  }
};

//========= Call the function with your MyCards array
shuffleAndCreateGrid(MyCards);

//=========function that count the time by second ===============
  function startGameTimer() {
    let seconds = 0; //we starting from second zero
    timerInterval = setInterval(() => { //setInterval is built Javascript function that count
        // repeadtly the specified function by fixed time on milliscond
        seconds++ ; // the incrementation of the seconds
        cardTimer.textContent = seconds ; // this display the time in our screen.
    }, 1000); //setInterval will be excuted each 1000 miliisecond and is one second.
}



//========= I need function to reset a cards hide front face
function resetTheCards() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach((card) => {
      card.classList.remove('turnOver');
    });
  }

  
  // Call the function to reset the cards when the game starts
  resetTheCards();


// =========Function to reaveal 2 card chosen============
function reveal2chosenCard(card) {
  // function called reveal2chosenCards
  //it called when the player click on the card
  if (!startThegame) {
    // we set our variable startThegame to flase mean if there is click
    startGameTimer(); // The startGameTimer will be called to start counting the seconds
    startThegame = true; //set the Variable startThegame to true to make sure that first card been clicked
  }
  if (waitForMove > 0) {
    // Don't let the player select more than two cards
    return;
  }

  // return my My clicked car
  const MyClickedCards = [];
  card.classList.add("turnOver");
  MyClickedCards.push(card);

  if (MyClickedCards.length === 2) { //if there is just 2 cards selected
    waitForMove = 2; // waitForMove is set 2 to for preventing to compare more than 2 cards 

    // Compare the two selected cards
    if (MyClickedCards[0].dataset.MyCards === MyClickedCards[1].dataset.MyCards) {// statement to check or compare if both cards are matched 
      // Match found
      
      setTimeout(() => { //give the affect to show that two card as matched and have the same image
        MyClickedCards.forEach((card) => { //iterate inside my Array to add the class matched for turning over again
          card.classList.add("matched");
          cardGrid.removeChild(card); //I need to check this==============
        });
        MyClickedCards = []; //set my Array to empty again
        twoMatchedCards += 2; //increment that 2 more matched cards found 
        waitForMove = 0; //set to 0 to let the player click again two different cards

        if (twoMatchedCards === cardNumbers) { //check if the player one won means our twoMatchedCard is 16 
            //and is the same number of cards
          clearInterval(timerInterval);// stop the time when the player and start when restard the game again
          setTimeout( //checked Internet and read some exemple in overflow to set it working 
            () =>
              alert(
                "Congratulations! You won! Your time: " + cardTimer.textContent //just show in screen that game is won 
              ),
            500 //set it for a half second mean 500 milisecond
          );
        }
      }, 500);
    } else { //else statament if the 2 cards doesn
      
      setTimeout(() => { //use function setTimeout to two turnedOver cards
        MyClickedCards.forEach((card) => { //iterate my Array 
          card.classList.remove("turnOver"); //once turnover change the classlist to be checked again
        });
        MyClickedCards = []; // set My array to zero to get empty again to choose another cards 
        waitForMove = 0; //set move to zero to let the player can have 2 clicks again
      }, 1000);
    }
  }
}
  //set up my clicks on cards using add event Listner
  const allCards = document.querySelectorAll('.card')
  allCards.forEach((card) => {

    card.addEventListener('click', () => {
      if (!card.classList.contains('turnOver') && waitForMove < 2) {
        card.classList.add('turnOver');
        reveal2chosenCard(card);
      }
    });
  });




  