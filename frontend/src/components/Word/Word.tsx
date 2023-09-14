import styles from "./Word.module.css";
import { useEffect, useState } from "react";
import React from "react";
import { useTheme } from "next-themes";
import { WordObject } from "@/types/WordObject";

interface WordProps {
  word: WordObject;
  isFinalWord: boolean;
}

const Word: React.FC<WordProps> = ({ word, isFinalWord }) => {
  const { theme, setTheme } = useTheme();
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
      <div className={styles.wordContainer}>
        <div
          className={word.isCorrect == false ? styles.error : styles.WordObject}
        >
          <div>
            {isFinalWord && word.typedWord == "" ? (
              <span className={styles.caret}></span>
            ) : (
              <></>
            )}
          </div>
          <div>
            {refWord.split("").map((letter, index) => {
              return (
                <>
                  <>
                    {index > word.targetWord.length - 1 ? (
                      <span style={{ color: "#8B0000" }} key={index}>
                        {letter}
                      </span>
                    ) : word.typedWord == undefined ? (
                      <>
                        <span style={{ color: "gray" }} key={index}>
                          {letter}
                        </span>
                      </>
                    ) : letter === word.typedWord[index] ? (
                      <>
                        <span className={`text-${theme}-primary`} key={index}>
                          {letter}
                        </span>
                      </>
                    ) : word.typedWord[index] == undefined ? (
                      <>
                        <span className="text-gray-500" key={index}>
                          {letter}
                        </span> 
                      </>
                    ) : word.typedWord === "" ? (
                      <>
                        <span className={styles.caret}></span>
                      </>
                    ) : (
                      <>
                        <span style={{ color: "red" }} key={index}>
                          {letter}
                        </span>
                      </>
                    )}
                  </>
                  <></>
                  {isFinalWord && word.typedWord && index == word.typedWord.length - 1 ? (
                    <span className={styles.caret}></span>
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Word;
