'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User } from '@/types/User'
//TODO make interface

export default function Page() {
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/auth/login', {
        credentials: 'include',
      });

      if (response.status == 200) {
        const data = await response.json();
        const user: User = {
          username: data.username,
          userId: data.id, 
          avatarId: data.avatar,
          avatarUrl: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`,
          bannerId: data.banner,
          bannerUrl: `https://cdn.discordapp.com/banners/${data.id}/${data.avatar}.png?size=480`,
        }
        setUserData(user);
      } else {
        router.push('/login');
      }
    };
    fetchData();
  }, []);
  //https://tailwindcss.com/docs/customizing-colors
  return (
    <div>
      <div className="items-center justify-center flex w-1/2 m-auto mt-10 bg-zinc-900 rounded-2xl">
        <div className="flex items-center w-100 h-100 p-10">
          <Image
            src={userData?.avatarUrl || ""}
            width={100}
            height={100}
            className="rounded-full"
            alt="Avatar"
          />
        </div>
        <div className="text-2xl">{userData?.username || ""}</div>
        <div className="flex items-center ml-auto"></div>
      </div>
    </div>
  );
}
