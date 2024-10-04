const { Socket } = require("socket.io");

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const users = new Map();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

const suits = ["hearts", "diams", "clubs", "spades"];
const ranks = [
  "a",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "j",
  "q",
  "k",
];
const cardRankWorth = [
  { rank: "2", worth: 1 },
  { rank: "3", worth: 2 },
  { rank: "4", worth: 3 },
  { rank: "5", worth: 4 },
  { rank: "6", worth: 5 },
  { rank: "7", worth: 6 },
  { rank: "8", worth: 7 },
  { rank: "9", worth: 8 },
  { rank: "10", worth: 9 },
  { rank: "j", worth: 10 },
  { rank: "q", worth: 11 },
  { rank: "k", worth: 12 },
  { rank: "a", worth: 13 },
];

let deck = [];

for (let suit of suits) {
  for (let rank of ranks) {
    deck.push({ suit, rank });
  }
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

deck = shuffleDeck(deck);

const player1Hand = deck.slice(0, 13);
const player2Hand = deck.slice(13, 26);
const player3Hand = deck.slice(26, 39);
const player4Hand = deck.slice(39, 52);

let playerTurn = 0;
let messages = [];
let playerList = [];
let cardsPlayedThisRound = [];
let Rang = "";
let teamOneWins = 0;
let teamTwoWins = 0;

let playerCards = {
  player1: { suit: "", rank: "" },
  player2: { suit: "", rank: "" },
  player3: { suit: "", rank: "" },
  player4: { suit: "", rank: "" },
};

let playerNames = {
  player1: "",
  player2: "",
  player3: "",
  player4: "",
};

server.listen(3001, () => {
  console.log("SERVER IS LISTENING ON PORT 3001");
});

io.on("connection", (socket) => {
  console.log("user connected with a socket id", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("joinLobby", (name) => {
    console.log(name.data, "entered the lobby");
    users.set(name.data, users.size);
    if (users.size === 1) {
      socket.emit("yourHand", player1Hand);
    }
    if (users.size === 2) {
      socket.emit("yourHand", player2Hand);
    }
    if (users.size === 3) {
      socket.emit("yourHand", player3Hand);
    }
    if (users.size === 4) {
      socket.emit("yourHand", player4Hand);
      playerList = Array.from(users.keys());
      shuffleArray(playerList);
      playerNames["player1"] = playerList[0];
      playerNames["player2"] = playerList[1];
      playerNames["player3"] = playerList[2];
      playerNames["player4"] = playerList[3];
      io.emit("playersReady");
      setTimeout(() => {
        io.emit("playerList", playerList);
      }, 1000);
      console.log("Players ready:", playerList);
    }
    socket.emit("myName", name.data);
    io.emit("numOfPlayers", users.size);
  });
  socket.on("rang", (rang) => {
    messages.unshift(`${playerList[0]} chose ${rang} as the Rang this game!`);
    messages.unshift(`It is ${playerList[0]}'s turn`);
    io.emit("messageList", messages);
    io.emit("currentRang", rang);
    io.emit("playerTurn", playerTurn);
    Rang = rang;
  });

  socket.on("newBoardState", (cardsOnBoard) => {
    io.emit("upateBoard", cardsOnBoard);
  });
  socket.on("addCard", (object) => {
    const { player, card, playersCards } = object;
    if (isLegalMove(card, playersCards)) {
      playerCards[player] = card;
      cardsPlayedThisRound.push({ turn: playerTurn, Card: card });
      messages.unshift(
        `${playerNames[player]} (P${player[6]}) played the card ${card.rank} of ${card.suit}`
      );
      socket.emit("legalMove");

      if (cardsPlayedThisRound.length === 4) {
        io.emit("playerCards", playerCards);
        let winner = getWinningCard().turn;
        playerTurn = winner;
        if (winner === 0 || winner === 2) {
          teamOneWins += 1;
          messages.unshift(`Team One won that round`);
          io.emit("messageList", messages);
        } else {
          teamTwoWins += 1;
          messages.unshift(`Team Two won that round`);
          io.emit("messageList", messages);
        }
        cardsPlayedThisRound = [];
        playerCards = {
          player1: { suit: "", rank: "" },
          player2: { suit: "", rank: "" },
          player3: { suit: "", rank: "" },
          player4: { suit: "", rank: "" },
        };
        io.emit("wins", { teamOneWins, teamTwoWins });
        io.emit("turn", playerTurn);
        setTimeout(() => {
          io.emit("playerCards", playerCards);
        }, 1000);
        messages.unshift(`It is ${playerList[playerTurn]}'s turn`);
        io.emit("messageList", messages);
      } else {
        playerTurn = (playerTurn + 1) % 4;
        io.emit("turn", playerTurn);
        io.emit("playerCards", playerCards);
        messages.unshift(`It is ${playerList[playerTurn]}'s turn`);
        io.emit("messageList", messages);
      }
    } else {
      messages.unshift("Cannot Make this move");
      socket.emit("messageList", messages);
      socket.emit("illegalMove");
    }
  });
});

function isLegalMove(card, playersCards) {
  if (cardsPlayedThisRound.length === 0) {
    return true;
  } else {
    const suitOfRound = cardsPlayedThisRound[0].Card.suit;
    const hasSameSuitCard = playersCards.some(
      (patta) => patta.suit === suitOfRound
    );
    if (card.suit === suitOfRound || !hasSameSuitCard) {
      return true;
    }
  }
  return false;
}
function getCardWorth(card) {
  return cardRankWorth.find((patta) => patta.rank === card.rank)?.worth || 0;
}

function getWinningCard() {
  const suitOfRound = cardsPlayedThisRound[0].Card.suit;

  const rangCards = cardsPlayedThisRound.filter(
    (patta) => patta.Card.suit === Rang
  );
  if (rangCards.length > 0) {
    return rangCards.reduce((highest, current) => {
      if (getCardWorth(current.Card) > getCardWorth(highest.Card)) {
        return current;
      }
      return highest;
    });
  } else {
    const sameSuitCards = cardsPlayedThisRound.filter(
      (patta) => patta.Card.suit === suitOfRound
    );
    return sameSuitCards.reduce((highest, current) => {
      if (getCardWorth(current.Card) > getCardWorth(highest.Card)) {
        return current;
      }
      return highest;
    });
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
