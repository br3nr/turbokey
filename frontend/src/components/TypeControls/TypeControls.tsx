import React, { use, useEffect, useRef, useState } from "react";
import { Box, Center, Text, Input } from "@chakra-ui/react";
import ts from "typescript";

function isAlphabetOrGrammar(event: KeyboardEvent): boolean {
  const alphabetOrGrammarRegex = /^[a-zA-Z0-9!-/:-@[-`{-~ ]+$/;
  return alphabetOrGrammarRegex.test(event.key);
}

export default function TypeControls() {
  const [curKeys, setCurKeys] = useState<string[]>([]);
  const targetWord = ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"];
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAlphabetOrGrammar(event) && event.key.length === 1) {
        setCurKeys((prevList) => [...prevList, event.key]);
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
      <Center>
        {targetWord.map((letter, index) => {
          return letter === " " ? (
            <Text color="green.500">&nbsp;</Text>
          ) : letter === curKeys[index] ? (
            <Text color="green.500">{letter}</Text>
          ) : curKeys[index] === undefined ? (
            <Text color="gray.500">{letter}</Text>
          ) : (
            <Text color="red.500">{letter}</Text>
          );
        })}
      </Center>
      <Center height="100%">
        <div tabIndex={0} ref={inputRef}>
          <p>{curKeys}</p>
        </div>
      </Center>
    </>
  );
}
