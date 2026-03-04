// Gameboard Module (IIFE - Single instance)
const Gameboard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const setMark = (index, mark) => {
    if (index >= 0 && index < 9 && board[index] === '') {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const reset = () => {
    board = ['', '', '', '', '', '', '', '', ''];
  };

  const isFull = () => board.every(cell => cell !== '');

  return { getBoard, setMark, reset, isFull };
})();

// Player Factory
const Player = (name, mark) => {
  return { name, mark };
};

// GameController Module (IIFE - Single instance)
const GameController = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameActive = false;
  let gameOver = false;

  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
  ];

  const initGame = (player1Name, player2Name) => {
    players = [
      Player(player1Name || 'Player 1', 'X'),
      Player(player2Name || 'Player 2', 'O')
    ];
    currentPlayerIndex = 0;
    gameActive = true;
    gameOver = false;
    Gameboard.reset();
    console.log('Game started!');
    console.log(`${players[0].name} (X) vs ${players[1].name} (O)`);
  };

  const getCurrentPlayer = () => players[currentPlayerIndex];

  const switchPlayer = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const checkWinner = () => {
    const board = Gameboard.getBoard();
    
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: players.find(p => p.mark === board[a]), combination };
      }
    }
    return null;
  };

  const playTurn = (index) => {
    if (!gameActive || gameOver) {
      console.log('Game is not active!');
      return { success: false, message: 'Game is not active' };
    }

    const currentPlayer = getCurrentPlayer();
    const placed = Gameboard.setMark(index, currentPlayer.mark);

    if (!placed) {
      console.log('Invalid move!');
      return { success: false, message: 'Invalid move' };
    }

    console.log(`${currentPlayer.name} placed ${currentPlayer.mark} at position ${index}`);
    console.log(Gameboard.getBoard());

    // Check for winner
    const result = checkWinner();
    if (result) {
      gameOver = true;
      gameActive = false;
      console.log(`${result.winner.name} wins!`);
      return { 
        success: true, 
        gameOver: true, 
        winner: result.winner,
        winningCombination: result.combination
      };
    }

    // Check for tie
    if (Gameboard.isFull()) {
      gameOver = true;
      gameActive = false;
      console.log("It's a tie!");
      return { success: true, gameOver: true, tie: true };
    }

    // Switch player
    switchPlayer();
    console.log(`${getCurrentPlayer().name}'s turn`);
    return { success: true, gameOver: false, nextPlayer: getCurrentPlayer() };
  };

  const isGameActive = () => gameActive;
  const isGameOver = () => gameOver;

  return { initGame, playTurn, getCurrentPlayer, isGameActive, isGameOver };
})();

// DisplayController Module (IIFE - Single instance)
const DisplayController = (() => {
  const cells = document.querySelectorAll('.cell');
  const startBtn = document.getElementById('startBtn');
  const restartBtn = document.getElementById('restartBtn');
  const player1Input = document.getElementById('player1');
  const player2Input = document.getElementById('player2');
  const turnDisplay = document.getElementById('turnDisplay');
  const gameResult = document.getElementById('gameResult');

  const updateBoard = () => {
    const board = Gameboard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
      cell.classList.remove('x', 'o', 'winning');
      if (board[index] === 'X') {
        cell.classList.add('x');
      } else if (board[index] === 'O') {
        cell.classList.add('o');
      }
    });
  };

  const updateTurnDisplay = () => {
    if (GameController.isGameActive()) {
      const currentPlayer = GameController.getCurrentPlayer();
      turnDisplay.textContent = `${currentPlayer.name}'s turn (${currentPlayer.mark})`;
      gameResult.textContent = '';
    }
  };

  const showResult = (result) => {
    if (result.winner) {
      gameResult.textContent = `${result.winner.name} wins! 🎉`;
      gameResult.style.color = '#4CAF50';
      
      // Highlight winning combination
      if (result.winningCombination) {
        result.winningCombination.forEach(index => {
          cells[index].classList.add('winning');
        });
      }
    } else if (result.tie) {
      gameResult.textContent = "It's a tie! 🤝";
      gameResult.style.color = '#FF9800';
    }
    turnDisplay.textContent = '';
    restartBtn.style.display = 'block';
  };

  const handleCellClick = (e) => {
    const index = parseInt(e.target.dataset.index);
    const result = GameController.playTurn(index);

    if (result.success) {
      updateBoard();
      
      if (result.gameOver) {
        showResult(result);
      } else {
        updateTurnDisplay();
      }
    }
  };

  const startGame = () => {
    const player1Name = player1Input.value.trim() || 'Player 1';
    const player2Name = player2Input.value.trim() || 'Player 2';
    
    GameController.initGame(player1Name, player2Name);
    updateBoard();
    updateTurnDisplay();
    gameResult.textContent = '';
    restartBtn.style.display = 'none';
    
    // Enable cell clicks
    cells.forEach(cell => {
      cell.style.pointerEvents = 'auto';
    });
  };

  const init = () => {
    // Add event listeners
    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);

    // Disable cells initially
    cells.forEach(cell => {
      cell.style.pointerEvents = 'none';
    });

    turnDisplay.textContent = 'Enter player names and click "Start Game"';
  };

  return { init };
})();

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  DisplayController.init();
});
