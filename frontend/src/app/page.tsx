"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box } from "@chakra-ui/react";
import Keyboard from "../components/Keyboard";

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
        <Canvas>
          <OrbitControls />
          <ambientLight intensity={0.3} position={[0, -0, -5]}/>
          <spotLight position={[0, -0, 100]} angle={0.3}/>
          <Keyboard/>
        </Canvas>
      </Box>dd
    </>
  );
}
