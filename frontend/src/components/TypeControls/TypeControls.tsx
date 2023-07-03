import React, { useEffect, useRef, useState } from "react";
import { Wrap, Box, Center, Text, Input, AbsoluteCenter } from "@chakra-ui/react";
import { generateWordList } from "@/utils/generateWordList";
import Papa from "papaparse";
import WordWrapper from "../WordWrapper/WordWrapper";

function isAlphabetOrGrammar(event: KeyboardEvent): boolean {
  const alphabetOrGrammarRegex = /^[a-zA-Z0-9!-/:-@[-`{-~ ]+$/;
  return alphabetOrGrammarRegex.test(event.key);
}

function getWordList(sentence: string): string[] {
  const words = sentence.split(" ");
  const wordList: string[] = [];

  for (let i = 0; i < words.length; i++) {
    if (i != words.length - 1) {
      wordList[i] = words[i] + " ";
    } else {
      wordList[i] = words[i];
    }
  }
  return wordList;
}

export default function TypeControls() {
  const [curKeys, setCurKeys] = useState<string>("");
  const [targetSentence, setTargetSentence] = useState<string>(""); // TODO: replace with words from backend
  const wordList = getWordList(targetSentence);
  const inputRef = useRef(null);

  useEffect(() => {
    const getWordList = async () => {
      const sentence = await generateWordList();
      setTargetSentence(sentence);
    };
    getWordList();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAlphabetOrGrammar(event) && event.key.length === 1) {
        setCurKeys((prevList) => prevList + event.key);
      } else if (event.key === "Backspace") {
        setCurKeys((prevList) => prevList.slice(0, -1));
      }
    };

    const focusInput = () => {
      //@ts-ignore
      inputRef.current.focus(); // use ref issue, fix later
    };

    focusInput();

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    console.log(curKeys);
  }, [curKeys]);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" >
        <Wrap width="500px" spacing="0px" overflow="hidden" translate="no">
          {targetSentence.split("").map((letter, index) => {
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
        </Wrap>
      </Box>
      <Center height="100%">
        <div tabIndex={0} ref={inputRef}>
          <p>{curKeys}</p>
        </div>
      </Center>
      <WordWrapper words={targetSentence.split(" ")} currentKey={curKeys}/>
    </>
  );
}
