# Tic-Tac-Toe

A classic Tic-Tac-Toe game built with vanilla JavaScript using the Module Pattern and Factory Functions. This project demonstrates clean code architecture with minimal global scope pollution and proper separation of concerns.

## 🎮 Live Demo

Simply open `index.html` in your browser to play!

## ✨ Features

- **Two-player gameplay** with custom player names
- **Win detection** for all possible winning combinations (3 rows, 3 columns, 2 diagonals)
- **Tie detection** when the board is full
- **Visual feedback** with color-coded marks (X in purple, O in violet)
- **Winning animation** highlighting the winning combination
- **Responsive design** that works on mobile and desktop
- **Game controls** with Start Game and Play Again buttons
- **Turn indicator** showing which player's turn it is

## 🏗️ Architecture

This project follows the **Module Pattern** with **Factory Functions** to create a clean, maintainable codebase with minimal global variables.

### Design Patterns Used

#### 1. **Gameboard Module (IIFE)**
```javascript
const Gameboard = (() => {
  // Private state
  let board = ['', '', '', '', '', '', '', '', ''];
  
  // Public API
  return { getBoard, setMark, reset, isFull };
})();
```
- Manages the game board state (3x3 grid stored as an array)
- Provides methods to get board state, place marks, reset, and check if full
- Single instance wrapped in IIFE (Immediately Invoked Function Expression)

#### 2. **Player Factory**
```javascript
const Player = (name, mark) => {
  return { name, mark };
};
```
- Creates player objects with name and mark (X or O)
- Factory function allows creating multiple player instances

#### 3. **GameController Module (IIFE)**
```javascript
const GameController = (() => {
  // Private game state
  let players = [];
  let currentPlayerIndex = 0;
  let gameActive = false;
  
  // Public API
  return { initGame, playTurn, getCurrentPlayer, isGameActive, isGameOver };
})();
```
- Controls game flow and logic
- Manages player turns and game state
- Checks for win conditions and ties
- Handles game initialization and turn processing

#### 4. **DisplayController Module (IIFE)**
```javascript
const DisplayController = (() => {
  // DOM elements and event handlers
  
  // Public API
  return { init };
})();
```
- Handles all DOM manipulation and UI updates
- Manages event listeners for user interactions
- Updates visual feedback for game state changes
- Separates presentation logic from game logic

## 🎯 Key Design Principles

- **Separation of Concerns**: Game logic, display logic, and data management are separate
- **Single Responsibility**: Each module has one clear purpose
- **Encapsulation**: Private state is protected within closures
- **Minimal Global Scope**: Only 4 objects in global scope (Gameboard, Player, GameController, DisplayController)
- **Console-First Development**: Game logic works and logs to console before DOM integration

## 🚀 How to Play

1. Open `index.html` in your web browser
2. Enter names for Player 1 (X) and Player 2 (O), or use the defaults
3. Click "Start Game"
4. Players take turns clicking on empty cells to place their mark
5. First player to get 3 marks in a row (horizontally, vertically, or diagonally) wins
6. If all cells are filled with no winner, the game ends in a tie
7. Click "Play Again" to start a new game

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Game logic with modern syntax (arrow functions, const/let, template literals)

## 📁 Project Structure

```
tic-tac-toe/
│
├── index.html          # HTML structure
├── styles.css          # Styling and animations
├── script.js           # Game logic (modules and factories)
└── README.md           # Project documentation
```

## 🎨 CSS Features

- **Gradient background** for modern look
- **Smooth transitions** and hover effects
- **Pulse animation** for winning cells
- **Responsive design** with media queries
- **Color-coded marks** (X and O have different colors)

## 🧪 Testing the Console

Open your browser's developer console to see game state logging:

```javascript
// Game initialization logs
Game started!
Player 1 (X) vs Player 2 (O)

// Each move logs
Player 1 placed X at position 0
['X', '', '', '', '', '', '', '', '']

// Win/tie detection
Player 1 wins!
```

## 🔮 Future Enhancements

- [ ] AI opponent with difficulty levels
- [ ] Score tracking across multiple games
- [ ] Undo/redo functionality
- [ ] Custom board sizes (4x4, 5x5)
- [ ] Online multiplayer
- [ ] Sound effects
- [ ] Themes/skins

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as a learning project to practice:
- Module Pattern in JavaScript
- Factory Functions
- Clean code architecture
- DOM manipulation
- Game state management

---

**Enjoy the game!** 🎮
