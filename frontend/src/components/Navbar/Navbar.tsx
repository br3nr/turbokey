import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProfileProps {
  username: string;
  avatar: string;
}

export default function Navbar(props: ProfileProps) {
  const router = useRouter();

  return (
    <div className="items-center justify-center flex w-1/2 m-auto bg-gray-800 mt-10">
      <div className="flex items-center">
        <Image
          src="swirl.svg"
          width={40}
          height={40}
          className=" rounded-full"
          alt="Avatar"
        />
      </div>
      <div className="flex items-center ml-auto">
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
  );
}
