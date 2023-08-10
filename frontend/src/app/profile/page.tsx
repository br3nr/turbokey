"use client";

import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";


//TODO make interface

export default function Page() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // check if cookie exists
      const cookie = Cookies.get();
      console.log(cookie);
      const response = await fetch("http://localhost:8000/auth/login", {
        credentials: "include",
      });
      const data = await response.json();
      setUserData(data);
    };
    fetchData();
  }, []);
  //https://tailwindcss.com/docs/customizing-colors
  return (
    <div>
      <div className="items-center justify-center flex w-1/2 m-auto mt-10 bg-zinc-900 rounded-2xl">
        <div className="flex items-center w-100 h-100 p-10">
          <Image
            src={userData.avatar_url}
            width={100}
            height={100}
            className="rounded-full "
          />
        </div>
        <div className="text-2xl">{userData.name}</div>
        <div className="flex items-center ml-auto">

        </div>
      </div>
    </div>
  );
}
