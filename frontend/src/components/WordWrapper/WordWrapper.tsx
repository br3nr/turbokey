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
  const checkIsFinalWord = (word: WordObject, index: number) => {
    const nextWord = wordList[index + 1];
    const prevWord = wordList[index - 1];

    if (nextWord && nextWord.isCorrect == null) {
      // if the next word exists and isCorrect is null, it may be final word
      if (wordList[index].isCorrect === null) {
        // if current word has not been assessed, it may be final word
        if (prevWord) {
          // if the previous word exits
          if (prevWord.isCorrect !== null) {
            // if the previous word has been assesed then this is current word
            return true;
          }
        } else {
          // handle case on first word
          return true;
        }
      } else {
        return false;
      }
    }
    return false;
  };

  return (
    <Center>
      <div className={styles.container}>
        <div className={styles.blur}>
          <Wrap width="800px">
            {wordList.map((w, index) => (
              <Word
                key={index}
                word={w}
                isFinalWord={checkIsFinalWord(w, index)}
              />
            ))}
          </Wrap>
        </div>
        <button className={styles.overlayButton}>Click to Start</button>
      </div>
    </Center>
  );
};

export default WordWrapper;
