import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useState } from "react";
import "../../playing-cards.css";
import { useSelector } from "react-redux";

interface LoadingPageProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  cards: any;
  players: any;
  name: any;
}

function Cards({
  socket,
  cards: initialCards,
  players,
  name,
}: LoadingPageProps) {
  const [cards, setCards] = useState(
    initialCards.sort((a: any, b: any) => {
      if (a.suit < b.suit) return -1;
      if (a.suit > b.suit) return 1;
      return 0;
    })
  );
  const [idx, setIdx] = useState(0);
  const turn = useSelector((state: any) => state.turn.value);
  const rang = useSelector((state: any) => state.rang.value);

  function playCard(cardIndex: number) {
    if (rang === "" || turn !== players.indexOf(name)) return;
    const playedCard = cards[cardIndex];
    setIdx(cardIndex);
    console.log("here", {
      player: `player${players.indexOf(name) + 1}`,
      card: playedCard,
    });
    socket.emit("addCard", {
      player: `player${players.indexOf(name) + 1}`,
      card: playedCard,
      playersCards: cards,
    });

    socket.on("legalMove", () => {
      const newCards = [...cards];
      const playedCard = newCards.splice(cardIndex, 1)[0];
      setCards(newCards);
    });
    socket.on("illegalMove", () => {
      return;
    });
  }

  const suitSymbols: any = {
    spades: "\u2660",
    hearts: "\u2665",
    diams: "\u2666",
    clubs: "\u2663",
  };

  if (rang === "") {
    return (
      <div className="my-cards-inner-container">
        <ul className="hand">
          {cards.slice(0, 5).map((card: any, index: number) => (
            <li key={index} onClick={() => playCard(index)}>
              <a className={`card rank-${card.rank} ${card.suit}`}>
                <span className="rank">{card.rank.toUpperCase()}</span>
                <span className="suit">{suitSymbols[card.suit]}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="my-cards-inner-container">
        <ul className="hand">
          {cards.map((card: any, index: number) => (
            <li
              key={index}
              onClick={() => {
                playCard(index);
              }}
            >
              <a className={`card rank-${card.rank} ${card.suit}`}>
                <span className="rank">{card.rank.toUpperCase()}</span>
                <span className="suit">{suitSymbols[card.suit]}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Cards;
