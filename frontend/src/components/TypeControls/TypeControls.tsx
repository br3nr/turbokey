import { useState, useEffect } from "react";
import { Box, Center, Text } from "@chakra-ui/react";


function isAlphabetOrGrammar(event: KeyboardEvent): boolean {
  const alphabetOrGrammarRegex = /^[a-zA-Z!-/:-@[-`{-~]$/;
  return alphabetOrGrammarRegex.test(event.key);
}

export default function TypeControls() {

	const [curKeys, setCurKeys] = useState<string[]>([]);

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
			// if event key is letter, add to curKeys
			if(isAlphabetOrGrammar(event)){
				setCurKeys((prevList) => [...prevList, event.key]);
			}
    };

    const handleKeyUp = (event: KeyboardEvent) => {
			if(event.key === "Backspace"){
				setCurKeys((prevList) => prevList.slice(0, -1));
			}
		};

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <Center>
				<Text fontSize="6xl">{curKeys}</Text>
			</Center>
    </>
  );
}
