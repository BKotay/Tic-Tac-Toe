# Tic-Tac-Toe Game
A Tic-Tac-Toe game built with React. The game allows two players to take turns marking the squares of a 3x3 grid, and it tracks the history of moves so players can navigate to previous moves.


Props:

Props are used to pass data from parent components to child components.
For example, the Board component receives xIsNext, squares, and onPlay as props from the Game component.
Each Square component receives value and onSquareClick as props from the Board component.
State:

State is used to manage internal data within components:

In the Game component, history and currentMove are state variables that track the game history and the current move.
In the Board component, the state of the individual squares (the board's layout) is passed down from the Game component as props.

