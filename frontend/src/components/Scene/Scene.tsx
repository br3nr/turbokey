import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Keyboard from "../Keyboard/Keyboard";

export default function Scene() {
  return (
    <>
      <Canvas camera={{fov:20, position:[0,0,50]}}>
        <ambientLight intensity={0.3} position={[0, -0, -5]} />
        <spotLight position={[0, -0, 100]} angle={0.3} />
        <Keyboard />
      </Canvas>
    </>
  );
}
