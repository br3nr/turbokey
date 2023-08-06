import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProfileProps {
  username: string;
  avatar: string;
}

export default function Navbar(props: ProfileProps) {
  return (
    <div className="items-center justify-center flex w-1/2 m-auto bg-red-700">
      <div className="flex items-center">ggg</div>
      <div className="flex items-center ml-auto">
        <Image
          src={props.avatar}
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}
