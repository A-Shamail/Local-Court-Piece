import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useState, useEffect } from "react";
import "../../playing-cards.css";

interface LoadingPageProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

function Messages({ socket }: LoadingPageProps) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("messageList", (messageList: string[]) => {
      setMessages(messageList);
    });
  }, [socket]);

  return (
    <div className="message-box">
      {messages.map((message, index) => (
        <div key={index} className="message-content-container">
          {message}
        </div>
      ))}
    </div>
  );
}

export default Messages;
