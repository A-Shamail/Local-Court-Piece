import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useState, useEffect } from "react";
import "../../playing-cards.css";

interface LoadingPageProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  names: any;
}
const suitSymbols: any = {
  spades: "\u2660",
  hearts: "\u2665",
  diams: "\u2666",
  clubs: "\u2663",
};

function Board({ socket, names }: LoadingPageProps) {
  const [board, setBoard] = useState({
    player1: { suit: "", rank: "" },
    player2: { suit: "", rank: "" },
    player3: { suit: "", rank: "" },
    player4: { suit: "", rank: "" },
  });

  useEffect(() => {
    socket.on("playerCards", (newBoard) => {
      setBoard(newBoard);
    });
    return () => {
      socket.off("playerCards");
    };
  }, [socket]);

  const cards = [
    board["player1"],
    board["player2"],
    board["player3"],
    board["player4"],
  ];

  return (
    <div className="game-table">
      <div className="card-area">
        <div className="card-area-rows output-row-one">
          {
            <div className={`card rank-${cards[2].rank} ${cards[2].suit}`}>
              <span className="rank">{cards[2].rank.toUpperCase()}</span>
              <span className="suit">{suitSymbols[cards[2].suit]}</span>
            </div>
          }
        </div>

        <div className="card-area-rows output-row-two">
          {
            <div className={`card rank-${cards[1].rank} ${cards[1].suit}`}>
              <span className="rank">{cards[1].rank.toUpperCase()}</span>
              <span className="suit">{suitSymbols[cards[1].suit]}</span>
            </div>
          }
          {
            <div className={`card rank-${cards[3].rank} ${cards[3].suit}`}>
              <span className="rank">{cards[3].rank.toUpperCase()}</span>
              <span className="suit">{suitSymbols[cards[3].suit]}</span>
            </div>
          }
        </div>

        <div className="card-area-rows output-row-three">
          {
            <div className={`card rank-${cards[0].rank} ${cards[0].suit}`}>
              <span className="rank">{cards[0].rank.toUpperCase()}</span>
              <span className="suit">{suitSymbols[cards[0].suit]}</span>
            </div>
          }
        </div>
      </div>

      <div className="game-players-container">
        <div
          className="player-tag player-one"
          style={{ fontWeight: "bold", color: "white" }}
        >
          {names[0]} - P1
        </div>
      </div>

      <div className="game-players-container">
        <div
          className="player-tag player-two"
          style={{ fontWeight: "bold", color: "white" }}
        >
          {names[1]} - P2
        </div>
      </div>

      <div className="game-players-container">
        <div
          className="player-tag player-three"
          style={{ fontWeight: "bold", color: "white" }}
        >
          {names[2]} - P3
        </div>
      </div>

      <div className="game-players-container">
        <div
          className="player-tag player-four"
          style={{ fontWeight: "bold", color: "white" }}
        >
          {names[3]} - P4
        </div>
      </div>
    </div>
  );
}

export default Board;
