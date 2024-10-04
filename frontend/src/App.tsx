import React from "react";
import logo from "./logo.svg";
import HomePage from "./components/Home/Home";
import LoadingPage from "./components/Loading/Loading";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { io } from "socket.io-client";
import MainScreen from "./components/MainScreen/MainScreen";
import WinScreen from "./components/WinScreen/WinScreen";

const socket = io("http://localhost:3001", { transports: ["websocket"] });
socket.connect();

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage socket={socket} />} />
          <Route path="/Loading" element={<LoadingPage socket={socket} />} />
          <Route path="/MainScreen" element={<MainScreen socket={socket} />} />
          <Route path="/winScreen" element={<WinScreen socket={socket} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
