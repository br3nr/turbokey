import { useState, useEffect } from "react";
import Key from "../Key/Key";

export default function Keyboard() {
  const numRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomRow = ["Z", "X", "C", "V", "B", "N", "M"];
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const keyDat = [];

  for (let i = 0; i < topRow.length; i++) {
    keyDat.push({ id: topRow[i], position: [-8.4 + i * 2, 0, 0], size: "1u" });
  }
  for (let i = 0; i < middleRow.length; i++) {
    keyDat.push({
      id: middleRow[i],
      position: [-7.95 + i * 2, -2, 0],
      size: "1u",
    });
  }
  for (let i = 0; i < bottomRow.length; i++) {
    keyDat.push({
      id: bottomRow[i],
      position: [-7.5 + i * 2, -4, 0],
      size: "1u",
    });
  }

  keyDat.push({ id: "Space", position: [-4.2, -6, 0], size: "625u" });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // if the event key is a single character, add it to the list
      if (event.code === "Space") {
        setActiveButtons((prevList) => [...prevList, event.code]);
      } else if (event.key.length === 1) {
        setActiveButtons((prevList) => [...prevList, event.key.toUpperCase()]);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setActiveButtons((prevList) =>
          prevList.filter((item) => item !== event.code)
        );
      } else if (event.key.length === 1) {
        setActiveButtons((prevList) =>
          prevList.filter((item) => item !== event.key.toUpperCase())
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      {keyDat.map((key) => (
        <Key
          key={key.id}
          size={key.size}
          position={key.position}
          colour={activeButtons.includes(key.id) ? "gray" : "#dcdcdc"}
        />
      ))}
    </>
  );
}
