import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Keyboard from "../Keyboard/Keyboard";
import { PerspectiveCamera } from "three";
import { useRef } from "react";
import { CameraControls } from '@react-three/drei';

export default function Scene() {
  return (
    <>
      <Canvas camera={{fov:40, position:[0,0,20]}}>
        <OrbitControls/>  
        <ambientLight intensity={0.3} position={[0, -0, -5]} />
        <spotLight position={[0, -0, 100]} angle={0.3} />
        <Keyboard />
      </Canvas>
    </>
  );
}
