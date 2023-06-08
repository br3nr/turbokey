import React, { use, useEffect, useRef, useState } from "react";
import { Box, Center, Text, Input } from "@chakra-ui/react";
import ts from "typescript";

function isAlphabetOrGrammar(event: KeyboardEvent): boolean {
  const alphabetOrGrammarRegex = /^[a-zA-Z0-9!-/:-@[-`{-~ ]+$/;
  return alphabetOrGrammarRegex.test(event.key);
}

export default function TypeControls() {
  const [curKeys, setCurKeys] = useState<string[]>([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAlphabetOrGrammar(event)) {
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
        <div tabIndex={0} ref={inputRef}>
          <p>{curKeys}</p>
        </div>
      </Center>
    </>
  );
}
