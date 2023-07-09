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

  return (
    <Center>
      <Wrap width="700px">
        {wordList.map((w, index) => (
          <Word key={index} word={w} />
        ))}
      </Wrap>
    </Center>
  );
};

export default WordWrapper;
