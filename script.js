const MyCards = ['1', '2', '3', '4', '5', '6', '7', '8', '1', '2', '3', '4', '5', '6', '7', '8'];
const cardNumbers = MyCards.length;
const cardGrid = document.getElementById('cards');
const cardScore= document.getElementById('score');
const cardTimer= document.getElementById('secondTimer');
let selectedCards = [];
let twoMatchedCards = 0;
let waitForMove = 0;
let startThegame = false;
let timerInterval;



//let create function that randomize my array of cards this way we can change the postion of the cards each time revealed.
const shuffle = (array) =>{   
    for (let i = array.length - 1; i > 0; i--) { //starting from last element working down it garantee
        //the last element in our array have a chance of being swapped with any other element in our array
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; //generate a random integer j between 0 and i
      //using mathfloor to get a random integer with this range
      //swapping a value between two variables without a need of temporary variable.
    } 

  }; 



//function that count the time by second ===============
  function startGameTimer() {
    let sec = 0; //we starting from second zero
    timerInterval = setInterval(() => { //setInterval is built Javascript function that count 
        // repeadtly the specified function by fixed time on milliscond 
        sec++ ; // the incrementation of the seconds 
        cardTimer.textContent = seconds ; // this display the time in our screen.
    }, 1000); //setInterval will be excuted each 1000 miliisecond and is one second.
}


// Function to reaveal 2 card chosen
function reaveal2chosenCard (card){ // function called reveal2chosenCards
    //it called when the player click on the card
    if (!startThegame) { // we set our variable startThegame to flase mean if there is click
        startGameTimer() // The startGameTimer will be called to start counting the seconds 
        startThegame = true //set the Variable startThegame to true to make sure that first card been clicked
    }
    



}

















