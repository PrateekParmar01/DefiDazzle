"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SignedIn } from "@clerk/nextjs";
const TabList = () => {
  const pathname = usePathname();
  // console.log(pathname)
  return (
    // <SignedIn>
      <div className="md:flex justify-start gap-4 w-full px-5 lg:px-20 mt-0 mb-4 ">
        <Link
          href="/overview"
          className={`${
            pathname === "/overview" || pathname === "/"
              ? "text-1xl font-bold rounded-md  bg-gray-500 p-2 text-white cursor-pointer my-2 md:my-0 shadow-md"
              : "text-1xl font-bold rounded-md border border-gray-300 hover:border hover:bg-gray-300 p-2 cursor-pointer my-2 md:my-0 shadow-md"
          }`}
        >
          Overview
        </Link>
        <Link
          href="/nft"
          className={`${
            pathname === "/nft"
              ? "text-1xl font-bold rounded-md  bg-gray-500 p-2 text-white cursor-pointer my-2 md:my-0 shadow-md"
              : "text-1xl font-bold rounded-md border border-gray-300 hover:border hover:bg-gray-300 p-2 cursor-pointer my-2 md:my-0 shadow-md"
          }`}
        >
          NFTs
        </Link>
        <Link
          href="/wallet"
          className={`${
            pathname === "/wallet"
              ? "text-1xl font-bold rounded-md  bg-gray-500 p-2 text-white cursor-pointer my-2 md:my-0 shadow-md"
              : "text-1xl font-bold rounded-md border border-gray-300 hover:border hover:bg-gray-300 p-2 cursor-pointer my-2 md:my-0 shadow-md"
          }`}
        >
          Wallet
        </Link>
        <Link
          href="/activity"
          className={`${
            pathname === "/activity"
              ? "text-1xl font-bold rounded-md  bg-gray-500 p-2 text-white cursor-pointer my-2 md:my-0 shadow-md"
              : "text-1xl font-bold rounded-md border border-gray-300 hover:border hover:bg-gray-300 p-2 cursor-pointer my-2 md:my-0 shadow-md"
          }`}
        >
          Activity
        </Link>
        <Link
          href="/badges"
          className={`${
            pathname === "/badges"
              ? "text-1xl font-bold rounded-md  bg-gray-500 p-2 text-white cursor-pointer my-2 md:my-0 shadow-md"
              : "text-1xl font-bold rounded-md border border-gray-300 hover:border hover:bg-gray-300 p-2 cursor-pointer my-2 md:my-0 shadow-md"
          }`}
        >
          Badges
        </Link>
      </div>
    // </SignedIn>
  );
};

export default TabList;
