import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useEffect } from "react";
import "../../playing-cards.css";
import { useSelector, useDispatch } from "react-redux";
import { newRang } from "../../store/rangSlice";

interface SelectRangProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  myName: string;
  names: any;
}

function SelectRang({ socket, myName, names }: SelectRangProps) {
  let index = 0;
  const dispatch = useDispatch();
  const color = useSelector((state: any) => state.rang.value);

  for (let i = 0; i < names.length; i++) {
    if (names[i] === myName) {
      index = i;
      break;
    }
  }

  const handleRangChange = (newColor: string) => {
    dispatch(newRang(newColor));
    socket.emit("rang", newColor);
  };
  useEffect(() => {
    const listener = (currentRang: string) => {
      dispatch(newRang(currentRang));
    };
    socket.on("currentRang", listener);
    return () => {
      socket.off("currentRang", listener);
    };
  }, [socket, dispatch]);

  return (
    <div>
      {color || index !== 0 ? (
        <div>
          <h1>Selected rang: {color}</h1>
        </div>
      ) : (
        <div>
          {index === 0 && (
            <div>
              <h1 style={{ textAlign: "center" }}>Select Rang</h1>
              <>
                <button
                  className="button-select-rang"
                  onClick={() => handleRangChange("clubs")}
                >
                  Clubs
                </button>
                <button
                  className="button-select-rang"
                  onClick={() => handleRangChange("diams")}
                >
                  Diamond
                </button>
                <button
                  className="button-select-rang"
                  onClick={() => handleRangChange("hearts")}
                >
                  Hearts
                </button>
                <button
                  className="button-select-rang"
                  onClick={() => handleRangChange("spades")}
                >
                  Spades
                </button>
              </>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SelectRang;
