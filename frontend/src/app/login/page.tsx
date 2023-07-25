'use client';

import React from "react";

export default function Page() {
  
  const authenticateUser = () => {
    window.location.href = "https://discord.com/api/oauth2/authorize?client_id=1124947743190814740&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2F&response_type=code&scope=identify";
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h3>Welcome to Turbokey</h3>
        <div className="flex items-center justify-center m-10">
          <button onClick={authenticateUser}>Login</button>
        </div>
      </div>
    </div>
  );
}
