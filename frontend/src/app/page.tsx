"use client";
import React from "react";
import { Box } from "@chakra-ui/react";
import Scene from "../components/Scene/Scene";

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
      <Box height="100vh">
        <Scene></Scene>
      </Box>
    </>
  );
}
