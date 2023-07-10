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

  const checkIsFinalWord = (word: WordObject, index: number) =>
  {
    if(wordList[index+1] == undefined || wordList[index+1].isCorrect == null)
    {
      return true;
    }
    return false;
  }

  return (
    <Center>
      <Wrap width="800px">
        {wordList.map((w, index) => (
          <Word key={index} word={w} isFinalWord={checkIsFinalWord(w, index)}/>
        ))}
      </Wrap>
    </Center>
  );
};

export default WordWrapper;
