import React from "react";
import styles from "./WordWrapper.module.css";
import { Text, Center, Box, Wrap } from "@chakra-ui/react";
import Word from "../Word/Word";
import { useEffect, useState } from "react";
import { match } from "assert";
interface WordWrapperProps {
  wordList: WordObject[];
}

interface WordObject {
  targetWord: string;
  typedWord: string;
  isCorrect: boolean | null;
  errors: number | null;
}

const WordWrapper: React.FC<WordWrapperProps> = ({ wordList }) => {
  const [targetWords, setTargetWords] = useState<string[]>([]);
  const [matchWords, setMatchWords] = useState<string[]>([]);

  useEffect(() => {
    setTargetWords(wordList.map((wordObject) => wordObject.targetWord));
    setMatchWords(wordList.map((wordObject) => wordObject.typedWord));
  }, [wordList]);

  return (
    <Center>
      <Wrap width="700px">
        {targetWords.map((word, index) => (
          <Word targetWord={word} matchWord={matchWords[index]} />
        ))}
      </Wrap>
    </Center>
  );
};

export default WordWrapper;
