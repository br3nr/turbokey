import React from "react";
import styles from "./WordWrapper.module.css";
import { Text, Center } from "@chakra-ui/react";

interface WordWrapperProps {
  words: string[];
  currentKey: string;
}

const WordWrapper: React.FC<WordWrapperProps> = ({ words, currentKey }) => {
  const keyMatch = currentKey.toString().split(" ");

  return (
    <Center>
      <div className={styles.wordWrapper}>
        {words.map((word, index) => (
          <span key={index}>
            {word === keyMatch[index] ? (
           <Text fontSize="lg" color="green.500">
                {word}
              </Text>
            ) : keyMatch[index] == undefined ? (
              <Text fontSize="lg" color="gray.500">
                {word}
              </Text>
            ) : (
              <Text fontSize="lg" color="red.500">
                {word}
              </Text>
            )}
          </span>
        ))}
      </div>

      <div className={styles.wordWrapper}>
        {currentKey
          .toString()
          .split(" ")
          .map((word, index) => (
            <span key={index}>
              <Text fontSize="lg">{word}</Text>
            </span>
          ))}
      </div>
    </Center>
  );
};

/**
 *  {targetSentence.split("").map((letter, index) => {
            return letter === " " ? (
              <Text color="gray.100" >&nbsp;</Text>
            ) : letter === curKeys[index] ? (
              <Text color="gray.100" >{letter}</Text>
            ) : curKeys[index] === undefined ? (
              <Text color="gray.500" >{letter}</Text>
            ) : (
              <Text color="red.500" >{letter}</Text>
            );
          })}
 */

export default WordWrapper;
