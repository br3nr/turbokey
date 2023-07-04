import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Keyboard from "../Keyboard/Keyboard";
import { Text, Box } from "@chakra-ui/react";

interface WordProps {
  targetWord: string;
  matchWord: string;
}

const Word: React.FC<WordProps> = ({ targetWord, matchWord }) => {
  return (
    <>
      <Box margin={[0, 2, 0, 2]}>
        {targetWord.split("").map((letter, index) => {
          return letter === " " ? (
            <span style={{ color: "red" }} key={index}>
              {letter}
            </span>
          ) : matchWord == undefined ? (
            <span style={{ color: "gray" }} key={index}>
              {letter}
            </span>
          ) : letter === matchWord[index] ? (
            <span style={{ color: "white" }} key={index}>
              {letter}
            </span>
          ) : matchWord[index] == undefined ? (
            <span style={{ color: "gray" }} key={index}>
              {letter}
            </span>
          ) : (
            <span style={{ color: "red" }} key={index}>
              {letter}
            </span>
          );
        })}
      </Box>
    </>
  );
};

export default Word;
