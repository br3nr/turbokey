import React, { useEffect, useRef, useState } from "react";
import {
  Wrap,
  Box,
  Center,
  Text,
  Input,
  AbsoluteCenter,
} from "@chakra-ui/react";
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
        
        let curKeyList = curKeys.split(" ")
        let targSentenceList = targetSentence.split(" ")
        if((targSentenceList[curKeyList.length-2] === curKeyList[curKeyList.length-2]))
        // Prevent user from backspacing to prev. word if it was correctly typed
        {
          if(curKeyList[curKeyList.length-1].length != 0)
          {
            setCurKeys((prevList) => prevList.slice(0, -1));
          }
        }
        else
        {
          setCurKeys((prevList) => prevList.slice(0, -1));
        }
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
  }, [curKeys, targetSentence]);

  useEffect(() => {
    let curKeyList = curKeys.split(" ")
    let targSentenceList = targetSentence.split(" ")

  }, [curKeys]);

  return (
    <>
      <Center height="100%">
        <div tabIndex={0} ref={inputRef}>
        </div>
      </Center>
      <WordWrapper words={targetSentence.split(" ")} currentKey={curKeys} />
    </>
  );
}
