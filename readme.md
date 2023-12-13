# JavaScript Memory Game

A simple memory game implemented in JavaScript, HTML, and CSS.

## Introduction

This project is a memory game where players match pairs of cards with identical images. It features player switching, scoring, and a modal to display the winner at the end of the game.

## Features

- Grid of cards with images.
- Player switching between Player 1 and Player 2.
- Score tracking for each player.
- Error count tracking for each player.
- Timer for each player's turn.
- Modal displaying the winner or a tie at the end of the game.

## Getting Started

1. Clone the repository.
2. Open `index.html` in your web browser.

## Game Rules

1. Click on cards to reveal their images.
2. Match pairs of cards with identical images.
3. Players take turns, and each turn is timed.
4. Score is based on the number of matches.
5. Fewer errors lead to a better chance of winning.

## Game Logic

- Cards are initially hidden.
- Clicking on a card reveals its image.
- If two revealed cards match, they remain visible.
- If two revealed cards do not match, they are hidden again.
- The game continues until all pairs are matched.

## Player Switching

- Players switch turns after each move.
- Player 1 starts the game.
- The timer tracks each player's turn.

## Scoring

- Score is incremented for each matching pair.
- Fewer errors improve the player's chances of winning.

## End of Game

- The game ends when all pairs are matched.
- The modal displays the winner or a tie.
- Players' scores and error counts are shown.

## Modal

- The modal displays the winner or a tie.
- It includes buttons to replay or exit the game.

## Restart and Exit

- The "Restart" button resets the game.
- The "Exit" button attempts to close the window (with alternative alert).








