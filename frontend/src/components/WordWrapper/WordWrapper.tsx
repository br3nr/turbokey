import React from "react";
import styles from "./WordWrapper.module.css";
import Word from "../Word/Word";
import { WordObject } from "@/types/WordObject";

interface WordWrapperProps {
  wordList: WordObject[];
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
    <div className={styles.center}>
          <div className={styles.wrap}>
            {wordList.map((w, index) => (
              <Word
                key={index}
                word={w}
                isFinalWord={checkIsFinalWord(w, index)}
              />
            ))}
          </div>
    </div>
  );
};

export default WordWrapper;
