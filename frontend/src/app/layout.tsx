// app/layout.tsx
"use client";
import "./globals.css";
import Providers from "./Providers";
import Navbar from "../components/Navbar/Navbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("http://localhost:8000/auth/login", {
        credentials: "include",
      });
      if (response.status === 200) {
        const data = await response.json();
        setUsername(data.username);
        setAvatar(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`);
      }
    };

    if (pathname !== "/login") {
      fetchUserData();
    }
  });

  return (
    <html lang="en">
      <body style={robotoMono.style}>
        {pathname !== "/login" ? (
          <Navbar username={username} avatar={avatar} />
        ) : (
          <></>
        )}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
