"use client";
import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import Scene from "../components/Scene/Scene";
import TypeControls from "../components/TypeControls/TypeControls";

function Cube() {
  // for reference
  return (
    <mesh>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

export default function Home() {
  return (
    <>
      <Box height="20vh">
        <TypeControls/>
      </Box>
      <Box height="80vh">
        <Scene/>
      </Box>
    </>
  );
}
