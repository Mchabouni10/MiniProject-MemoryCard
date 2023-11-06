const MyCards = ['1', '2', '3', '4', '5', '6', '7', '8', '1', '2', '3', '4', '5', '6', '7', '8'];
const cardNumbers = MyCards.length;
const cardGrid = document.getElementById('cards');
const cardScore= document.getElementById('score');
const cardTimer= document.getElementById('secondTimer');
let selectedCards = [];
let twoMatched = 0;
let waitForMove = 0;
let gameStarted = false;
let timerInterval;



//let create function that randomize my array of cards
const shuffle = ((array: element[]) => {   
    for (let i = array.length - 1; i > 0; i--) { //starting from last element working down it garantee
        //the last element in our array have a chance of being swapped with any other element in our array
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; //generate a random integer j between 0 and i
      //using mathfloor to get a random integer with this range
      //swapping a value between two variables without a need of temporary variable.
    } 
  }); 

  function startTimer() {
    let sec = 0;
    timerInterval = setInterval(() => {
        sec++ ;
        cardTimer.textContent = seconds ;
    }, 2000);
}

















