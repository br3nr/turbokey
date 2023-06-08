import { useState, useEffect } from "react";
import { Box, Center, Text } from "@chakra-ui/react";

export default function TypeControls() {

	const [curKeys, setCurKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setCurKeys((prevList) => [...prevList, event.key]);
			console.log(event.key)
    };

    const handleKeyUp = (event: KeyboardEvent) => {
			setCurKeys((prevList) => prevList.filter((item) => item !== event.key));
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
