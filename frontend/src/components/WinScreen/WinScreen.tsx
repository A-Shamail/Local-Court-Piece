import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import "./WinScreen.css";
import { useLocation } from "react-router-dom";

interface WinScreenProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

function WinScreen({ socket }: WinScreenProps) {
  const location = useLocation();
  const winner = location.state.winner;

  return (
    <div className="loadingPage">
      <img
        src="./background.jpg"
        alt="background"
        className="backgroundImg"
        height="100%"
        width="100%"
      />
      <div className="title">
        <h1>Winner is {winner}</h1>
      </div>
    </div>
  );
}

export default WinScreen;
