"use client";

import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Page() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // check if cookie exists
      const cookie = Cookies.get();
      console.log(cookie);
      const response = await fetch("http://localhost:8000/auth/login", { credentials: 'include' });
      const data = await response.json();
      console.log(data);
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
