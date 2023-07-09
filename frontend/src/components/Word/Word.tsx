import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Keyboard from "../Keyboard/Keyboard";
import { Text, Box } from "@chakra-ui/react";
import styles from "./Word.module.css";
import { Roboto_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import React from "react";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

interface WordProps {
  word: WordObject;
}

interface WordObject {
  targetWord: string;
  typedWord: string;
  isCorrect: boolean | null;
  errors: number | null;
}

const Word: React.FC<WordProps> = ({ word }) => {
  const [refWord, setRefWord] = useState<string>(word.targetWord);

  useEffect(() => {
    // Render the refword to display overrun words
    if (word.typedWord && word.typedWord.length > word.targetWord.length) {
      setRefWord(
        word.targetWord + word.typedWord.slice(word.targetWord.length)
      );
    } else {
      setRefWord(word.targetWord);
    }
  }, [word.typedWord, word.targetWord]);

  return (
    <>
      <Box margin={[0, 2, 0, 2]}>
        <div
          className={word.isCorrect == false ? styles.error : styles.WordObject}
          style={robotoMono.style}
        >
          {refWord.split("").map((letter, index) => {
            return index > word.targetWord.length - 1 ? (
              <span style={{ color: "#8B0000" }} key={index}>
                {letter}
              </span>
            ) : word.typedWord == undefined ? (
              <span style={{ color: "gray" }} key={index}>
                {letter}
              </span>
            ) : letter === word.typedWord[index] ? (
              <span style={{ color: "white" }} key={index}>
                {letter}
              </span>
            ) : word.typedWord[index] == undefined ? (
              <span style={{ color: "gray" }} key={index}>
                {letter}
              </span>
            ) : (
              <span style={{ color: "red" }} key={index}>
                {letter}
              </span>
            );
          })}
        </div>
      </Box>
    </>
  );
};

export default Word;
