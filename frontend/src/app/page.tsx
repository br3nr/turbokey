"use client";
import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import Scene from "../components/Scene/Scene";
import TypeControls from "../components/TypeControls/TypeControls";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div style={robotoMono.style}>
        <Box height="20vh">
          <TypeControls />
        </Box>
        <Box marginTop="30px" height="50vh">
          <Scene />
        </Box>
      </div>
    </>
  );
}
