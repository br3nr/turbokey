import React from "react";
import styles from "./WordWrapper.module.css";
import { Text, Center, Box, Wrap } from "@chakra-ui/react";
import Word from "../Word/Word";

interface WordWrapperProps {
  words: string[];
  currentKey: string;
}

const WordWrapper: React.FC<WordWrapperProps> = ({ words, currentKey }) => {
  const keyMatch = currentKey.toString().split(" ");
  return (
    <Center>
      <Wrap width="500px">
        {words.map((word, index) => (
            <Word targetWord={word} matchWord={keyMatch[index]} />
        ))}
      </Wrap>
    </Center>
  );
};

export default WordWrapper;
