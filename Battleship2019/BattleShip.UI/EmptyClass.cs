using System;
using BattleShip.BLL;

namespace BattleShip.UI
{
        class BattleshipUI
        {
            private GameWorkflow _game;
            private string _player1Name;
            private string _player2Name;

            public BattleshipUI()
            {
                // Initialize the game and player names to default values
                _game = null;
                _player1Name = "Player 1";
                _player2Name = "Player 2";
            }

            public void Run()
            {
                bool playAgain = true;

                while (playAgain)
                {
                    // Task 1: Create and display the start menu / splash screen
                    DisplayStartMenu();

                    // Task 2: Query and store player names
                    _player1Name = GetPlayerName(1);
                    _player2Name = GetPlayerName(2);

                    // Task 3: Randomly determine which player goes first
                    int currentPlayer = DetermineStartingPlayer();

                    // Task 6: Create a setup workflow object and initialize the game
                    SetUpGame();

                    // Main game loop
                    while (!_game.IsGameOver)
                    {
                        // Task 7: Handle the current player's turn
                        ProcessPlayerTurn(currentPlayer);

                        // Switch to the other player
                        currentPlayer = 1 - currentPlayer;
                    }

                    // Task 8: Prompt the players to play again or quit
                    playAgain = PromptPlayAgain();
                }
            }

            // Implement the methods for each task here
            // ...
        }
    }
