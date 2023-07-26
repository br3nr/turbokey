"use client";

import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Page() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // check if cookie exists
      const userName = Cookies.get("username");
      if (userName) {
        setUser(userName);
      }
    };
		fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h3>Welcome {user}. You are now logged in.</h3>
      </div>
    </div>
  );
}
