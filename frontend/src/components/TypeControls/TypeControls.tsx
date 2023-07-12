import React, { useEffect, useRef, useState } from "react";
import { Center } from "@chakra-ui/react";
import { generateWordList } from "@/utils/generateWordList";
import WordWrapper from "../WordWrapper/WordWrapper";

interface WordObject {
  targetWord: string;
  typedWord: string;
  isCorrect: boolean | null;
  errors: number | null;
}

function isAlphabetOrGrammar(event: KeyboardEvent): boolean {
  const alphabetOrGrammarRegex = /^[a-zA-Z0-9!-/:-@[-`{-~ ]+$/;
  return alphabetOrGrammarRegex.test(event.key);
}

function getWords(sentence: string): WordObject[] {
  const words = sentence.split(" ");
  const wordList: WordObject[] = [];

  for (let i = 0; i < words.length; i++) {
    let wordObj: WordObject = {
      targetWord: "",
      typedWord: "",
      isCorrect: null,
      errors: null,
    };
    if (i !== words.length - 1) {
      wordObj.targetWord = words[i];
    } else {
      wordObj.targetWord = words[i];
    }
    wordList.push(wordObj);
  }
  return wordList;
}

export default function TypeControls() {
  const [curKeys, setCurKeys] = useState<string>("");
  const [targetSentence, setTargetSentence] = useState<string>(""); // TODO: replace with words from backend
  const [wordList, setWordList] = useState<WordObject[]>([]);
  const inputRef = useRef(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const getWordList = async () => {
      const sentence = await generateWordList();
      setTargetSentence(sentence);
      setWordList(getWords(sentence));
    };
    getWordList();
  }, []);

  const setTypedWords = (keyList: string) => {
    const curKeyArray = keyList.split(" ");
    setWordList((prevWordList) => {
      return prevWordList.map((word, index) => {
        if (index < curKeyArray.length) {
          let correct = null;
          if (index < curKeyArray.length - 1) {
            // check if the previous word is missspelt
            if (curKeyArray[index] === wordList[index].targetWord) {
              correct = true;
            } else {
              correct = false;
            }
          }
          return { ...word, typedWord: curKeyArray[index], isCorrect: correct };
        }
        return word;
      });
    });
  };

  const handleBackSpace = (keyList: string[]) => {
    if (
      wordList[keyList.length - 2] &&
      wordList[keyList.length - 2].targetWord ===
        wordList[keyList.length - 2].typedWord
    ) {
      if (keyList[keyList.length - 1].length > 0) {
        setTypedWords(curKeys.slice(0, -1));
        setCurKeys((prevList) => prevList.slice(0, -1));
      }
    } else {
      setTypedWords(curKeys.slice(0, -1));
      setCurKeys((prevList) => prevList.slice(0, -1));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAlphabetOrGrammar(event) && event.key.length === 1) {
        setCurKeys((prevList) => prevList + event.key);
        setTypedWords(curKeys + event.key);
      } else if (event.key === "Backspace") {
        let curKeyList = curKeys.split(" ");
        handleBackSpace(curKeyList);
      }
    };

    const focusInput = () => {
      //@ts-ignore
      inputRef.current.focus(); // use ref issue, fix later
    };

    focusInput();

    document.addEventListener("keydown", handleKeyDown);

    console.log(wordList);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [curKeys, targetSentence, wordList]);

  return (
    <>
      <Center height="100%">
        <div>{seconds}</div>
        <div tabIndex={0} ref={inputRef}></div>
      </Center>
      <WordWrapper wordList={wordList} />
    </>
  );
}
