import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Board from "../Board/Board";
import SelectRang from "../SelectRang/SelectRang";
import Messages from "../Messages/Messages";
import Cards from "../Cards/Cards";

import "../../playing-cards.css";
import "../../rang.css";
import { useDispatch } from "react-redux";
import { updateTurn } from "../../store/turnSlice";

interface LoadingPageProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

function MainScreen({ socket }: LoadingPageProps) {
  const dispatch = useDispatch();

  const location = useLocation();
  const name = location.state.naam;
  const hand = location.state.cards;
  const [gamers, setGamers] = useState<{ name: string }[]>([]);
  const navigate = useNavigate();
  const [teamOne, setTeamOne] = useState(0);
  const [teamTwo, setTeamTwo] = useState(0);

  socket.on("playerList", (players) => {
    setGamers(players);
  });

  socket.on("turn", (turn) => {
    dispatch(updateTurn(turn));
  });

  socket.on("wins", (wins) => {
    const { teamOneWins, teamTwoWins } = wins;
    setTeamOne(teamOneWins);
    setTeamTwo(teamTwoWins);

    if (teamOneWins === 7) {
      navigate("/winScreen", {
        state: { winner: `team ${gamers[0]} and ${gamers[2]}` },
      });
    } else if (teamTwoWins === 7) {
      navigate("/winScreen", {
        state: { winner: `team ${gamers[1]} and ${gamers[3]}` },
      });
    }
    console.log(teamOneWins, teamTwoWins);
  });

  return (
    <div className="main-container playingCards">
      <div className="game-container">
        <div className="heading-container">
          <h1>{name}'s view of Rang</h1>
        </div>

        <div className="game-table-container">
          <Board socket={socket} names={gamers}></Board>
        </div>

        <div className="select-rang-container">
          <SelectRang socket={socket} names={gamers} myName={name}></SelectRang>
        </div>
        <div>
          <h2>TeamOne (P1 + P3) wins = {teamOne}</h2>
        </div>
        <div>
          <h2>TeamTwo (P2 + P4) wins = {teamTwo}</h2>
        </div>
      </div>

      <div className="messages-and-cards-container">
        <div className="right-side-container messages-container">
          <h1>Messages</h1>
          <Messages socket={socket}></Messages>
        </div>

        <div className="right-side-container my-cards-container">
          <h1>My Cards</h1>
          <Cards
            socket={socket}
            cards={hand}
            players={gamers}
            name={name}
          ></Cards>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
