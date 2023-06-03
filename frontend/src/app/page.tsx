"use client";
import Head from "next/head";
import { Flex, Heading, AbosoluteCenter, Box, AbsoluteCenter } from "@chakra-ui/react";
import React from "react";
import Keycap from "../components/Keycap";

export default function Home() {
  const handleClick = (key: string) => {
    console.log(`Clicked key: ${key}`);
    // Handle the key press event here
  };
  return (
    <>
    <AbsoluteCenter height="100%">
        <Flex flexDirection="column">
          <Flex>
            <Keycap keyLabel="Tab" onClick={() => handleClick("Tab")} keycapSize={60} borderRadius="6%/10%"/>
            <Keycap keyLabel="Q" onClick={() => handleClick("Q")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="W" onClick={() => handleClick("W")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="E" onClick={() => handleClick("E")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="R" onClick={() => handleClick("R")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="T" onClick={() => handleClick("T")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="Y" onClick={() => handleClick("Y")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="U" onClick={() => handleClick("U")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="I" onClick={() => handleClick("I")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="O" onClick={() => handleClick("O")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="P" onClick={() => handleClick("P")} keycapSize={40} borderRadius="15%"/>
          </Flex>
          <Flex marginLeft="">
            <Keycap keyLabel="Caps Lk" onClick={() => handleClick("Tab")} keycapSize={70}  borderRadius="6%/10%"/>
            <Keycap keyLabel="A" onClick={() => handleClick("A")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="S" onClick={() => handleClick("S")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="D" onClick={() => handleClick("D")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="F" onClick={() => handleClick("F")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="G" onClick={() => handleClick("G")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="H" onClick={() => handleClick("H")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="J" onClick={() => handleClick("J")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="K" onClick={() => handleClick("K")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="L" onClick={() => handleClick("L")} keycapSize={40} borderRadius="15%"/>
          </Flex>
          <Flex>
          <Keycap keyLabel="Shift" onClick={() => handleClick("Tab")} keycapSize={90} borderRadius="6%/10%"/>
            <Keycap keyLabel="Z" onClick={() => handleClick("Z")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="X" onClick={() => handleClick("X")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="C" onClick={() => handleClick("C")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="V" onClick={() => handleClick("V")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="B" onClick={() => handleClick("B")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="N" onClick={() => handleClick("N")} keycapSize={40} borderRadius="15%"/>
            <Keycap keyLabel="M" onClick={() => handleClick("M")} keycapSize={40} borderRadius="15%"/>
          </Flex>
        </Flex>
      </AbsoluteCenter>
    </>
  );
}
