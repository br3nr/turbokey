import { useState, useEffect } from "react";
import Key from "../components/Key";



export default function Home() {
  const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomRow = ["Z", "X", "C", "V", "B", "N", "M"];
  const [activeButton, setActiveButton] = useState<string>("");
  const keyDat = [];

  for (let i = 0; i < topRow.length; i++) {
    keyDat.push({ id: topRow[i], position: [-9 + i * 2, 0, 0] });
  }
  for (let i = 0; i < middleRow.length; i++) {
    keyDat.push({ id: middleRow[i], position: [-8.5 + i * 2, -2, 0] });
  }
  for (let i = 0; i < bottomRow.length; i++) {
    keyDat.push({ id: bottomRow[i], position: [-7.5 + i * 2, -4, 0] });
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setActiveButton(event.key.toUpperCase());
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setActiveButton("");
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <>
      {keyDat.map((key) => (
        <Key key={key.id} position={key.position} colour={activeButton == key.id ? 'pink' : 'hotpink'}/>
      ))}
    </>
  );
}
