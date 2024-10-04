![image](https://github.com/user-attachments/assets/0d843f0a-af1b-41b6-a5c8-1fbe5080dfc1)


# Local Court Piece (Rang) Game

## Introduction
**Local Court Piece**, also known as **Rang** in [Urdu], is a four-player card game where players connect locally and enjoy playing amongst themselves. This game is developed using the **MERN** stack (MongoDB, Express, React, Node.js), and all the artwork styles were created by hand, adding a unique and personalized touch to the gameplay.

## Features
- **Local Multiplayer**: Four players can connect to the game locally.
- **Real-Time Gameplay**: The game uses WebSockets for real-time communication between players.
- **Custom Artwork**: All visuals in the game are created by myself or were open source, making the game aesthetically unique.
- **Card Shuffling**: The game includes a randomized card-shuffling algorithm for a fair play experience.
- **Responsive Design**: The game is designed to work well on both desktop and mobile devices.
- **Player Turns**: The game handles player turns seamlessly, ensuring a smooth flow of the game.

## Game Rules
- **Objective**: The objective of Rang is to win the most number of tricks, with the trump suit (Rang) playing a key role in determining the winner of each round.
- **Teams**: Players are split into two teams, with two players per team.
- **Tricks**: Each team tries to win as many tricks as possible by playing cards of higher value than their opponents.
- **Rang**: A trump suit (Rang) is selected at the start of each game, and cards from the trump suit are more powerful than cards from any other suit.
- **Gameplay**:
  1. Cards are dealt equally to all players.
  2. Players take turns to play a card, following the suit if possible.
  3. The player with the highest card wins the trick.
  4. The team with the most tricks wins the round.

![image](https://github.com/user-attachments/assets/ed8daa53-c869-4e0c-828a-96521209044c)


## Tech Stack
This game was built using the **MERN** stack, leveraging the following technologies:

- **MongoDB**: Used to store game data and player statistics.
- **Express.js**: Handles the backend API and server-side logic.
- **React.js**: The front-end framework that renders the game interface and manages user interactions.
- **Node.js**: The runtime environment that powers the server-side logic.
- **Socket.io**: Used for real-time communication between players, ensuring smooth gameplay.

## How to Play
1. Ensure that all four players are connected to the same local network.
2. Launch the backend server by running the following command:
   ```bash
   node server.ts
   ```
3. Start the frontend React application with:
   ```bash
   npm start
   ```
4. Each player can join the game by visiting `http://localhost:3000` on their browser.
5. Once all players have connected, the game will start, and players can begin playing cards according to the rules.

## Development
This game was created using the following development tools:

- **Visual Studio Code**: Used for writing and managing the codebase.
- **Git**: Version control for managing changes to the game.
- **Postman**: Used to test backend APIs.
- **WebSockets**: Implemented using **Socket.io** to manage real-time communication between players.


## Future Improvements
- **AI Players**: Adding AI-controlled players so users can enjoy the game in single-player mode.
- **Online Multiplayer**: Enabling players to connect and play with friends over the internet.
- **Enhanced Animations**: Adding more sophisticated animations for card movements and player actions.
- **Leaderboards**: Implementing leaderboards to track player statistics and victories.
