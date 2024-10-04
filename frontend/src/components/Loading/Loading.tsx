import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import "./Loading.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface LoadingPageProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

function LoadingPage({ socket }: LoadingPageProps) {
  const navigate = useNavigate();
  const [nums, setNums] = useState(0);
  const [dots, setDots] = useState(".");
  const [hand, setHand] = useState([]);

  const location = useLocation();
  const name = location.state.name;

  useEffect(() => {
    socket.on("playersReady", (players) => {
      console.log(players);
      navigate("/MainScreen", { state: { naam: name, cards: hand } });
    });
    socket.on("numOfPlayers", (num) => {
      setNums(num);
    });
    socket.on("yourHand", (hand) => {
      setHand(hand);
    });

    const interval = setInterval(() => {
      setDots((dots) => (dots === "..." ? "." : dots + "."));
    }, 500);

    return () => {
      socket.off("playersReady");
      socket.off("numOfPlayers");
      socket.off("yourHand");
      clearInterval(interval);
    };
  }, [socket, navigate, hand, name]);

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
        <h1>Waiting for Players to join{dots}</h1>
        <h2 className="players">{nums}/4 in lobby</h2>
      </div>
    </div>
  );
}

export default LoadingPage;
