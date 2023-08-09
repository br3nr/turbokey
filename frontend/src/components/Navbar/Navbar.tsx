import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Canvas } from "@react-three/fiber";
import Key from "@/components/Key/NavKey";
import { TrackballControls } from "@react-three/drei";

interface ProfileProps {
  username: string;
  avatar: string;
}

export default function Navbar(props: ProfileProps) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <div className="items-center justify-center flex w-1/2 m-auto mt-10">
      <div
        className="flex items-center w-10 h-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          router.push("/");
        }}
      >
        <Canvas camera={{ fov: 20, position: [0, 0, 7] }}>
          <ambientLight intensity={0.3} position={[0, -0, 0]} />
          <spotLight position={[0, -0, 50]} angle={0.1} />
          <Key
            position={[0, -0.2, 0]}
            colour={isHovering ? "#bd77ea" : "#9d4edd"}
            size="1u"
          />
        </Canvas>
      </div>
      <div className="flex items-center ml-auto">
        <div className="transition duration-300 ease-in-out transform hover:brightness-75">
          <Image
            src={props.avatar}
            width={40}
            height={40}
            className="border-2 border-white rounded-full"
            alt="Avatar"
            onClick={() => {
              router.push("/profile");
            }}
          />
        </div>
      </div>
    </div>
  );
}
