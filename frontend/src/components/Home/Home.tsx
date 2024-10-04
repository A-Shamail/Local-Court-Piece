import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import "./Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

function HomePage({ socket }: HomePageProps) {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleClick = (socket: Socket) => {
    console.log("Socket ID:", socket.id);
    socket.emit("joinLobby", { data: userName });
    navigate("./Loading", { state: { name: userName } });
  };

  return (
    <>
      <div className="sampleHomePage">
        <div className="logo">
          <img src="./RUNG_logo.png" alt="" height="25%" width="40%" />
        </div>
        <img src="./background.jpg" alt="" height="100%" width="100%" />
        <div className="sampleMessage">
          <input
            className="myinput"
            placeholder="Enter Username"
            onChange={(event) => setUserName(event.target.value)}
            style={{ color: "white" }}
          ></input>
          <button
            className="mybutton"
            style={{ color: "white" }}
            onClick={() => {
              handleClick(socket);
            }}
          >
            Join
          </button>
        </div>
      </div>
    </>
  );
}
export default HomePage;
