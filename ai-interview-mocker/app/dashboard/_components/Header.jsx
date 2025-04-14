"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

function Header() {
  const path = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    console.log(path);
    setHasMounted(true);
  }, [path]);

  // Wait until after client mount to render, avoiding hydration mismatch
  if (!hasMounted) return null;

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src={"/logo.svg"} width={160} height={100} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <li
          className={`hover:text-pri hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard" && "text-primary font-bold"
          }`}
        >
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li
          className={`hover:text-pri hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/question" && "text-primary font-bold"
          }`}
        >
          <Link href="/dashboard/question">Questions</Link>
        </li>
        <li
          className={`hover:text-pri hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/upgrade" && "text-primary font-bold"
          }`}
        >
          <Link href="/dashboard/upgrade">Upgrade</Link>
        </li>
        <li
          className={`hover:text-pri hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/how" && "text-primary font-bold"
          }`}
        >
          <Link href="/dashboard/how">How it Works?</Link>
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;