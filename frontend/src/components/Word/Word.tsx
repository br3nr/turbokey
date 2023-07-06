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
  targetWord: string;
  matchWord: string;
}

const Word: React.FC<WordProps> = ({ targetWord, matchWord }) => {
  const [refWord, setRefWord] = useState<string>(targetWord);

  useEffect(() => {
    console.log(targetWord)
    if (matchWord && matchWord.length > targetWord.length) {
      setRefWord(targetWord + matchWord.slice(targetWord.length));
    } else {
      setRefWord(targetWord);
    }
  }, [matchWord, targetWord]);

  return (
    <>
      <Box margin={[0, 2, 0, 2]}>
        <div className={styles.word} style={robotoMono.style}>
          {refWord.split("").map((letter, index) => {
            return index > targetWord.length - 1 ? (
              <span style={{ color: "#8B0000" }} key={index}>
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
        </div>
      </Box>
    </>
  );
};

export default Word;
