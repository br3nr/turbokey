// app/layout.tsx
"use client";
import "./globals.css";
import Providers from "./Providers";
import Navbar from "../components/Navbar/Navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        {pathname !== "/login" ? <Navbar /> : <></>}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
