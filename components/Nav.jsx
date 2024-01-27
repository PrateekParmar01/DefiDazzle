import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWallet } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { useUserContext } from "@/providers/UserContext";

const Nav = ({ onSearch }) => {
  const { data, balance } = useUserContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    // console.log(searchTerm);
  };
  return (
    <div className="flex w-full mb-2 p-3 justify-between border-b-2 sticky top-0 bg-white z-50">
      <div className="flex-center gap-4 justify-end">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <p className="text-2xl font-bold">DeFiDazzle</p>
        </Link>
        <form className="w-96" onSubmit={handleSearchSubmit}>
          <label
            htmlFor="default-search"
            className= "mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className= "relative flex-center">
            <div className= "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-600 border border-gray-900 rounded-lg bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 focus:outline-none font-semibold text-0.5xl"
              placeholder="Search accounts, NFTs, Tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <button
              type="submit"
              className="absolute end-2.5 bottom-2 font-medium outline-none hover:outline-none rounded-lg text-md px-4 py-2 text-white bg-gray-400 hover:bg-gray-300"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex-center cursor-pointer text-1xl font-semibold bg-inherit hover:bg-gray-400 rounded-md p-2 hover:text-white border border-gray-300 hover:border-inherit">
          Swap
        </div>
        <div className="flex-center cursor-pointer text-1xl font-semibold bg-inherit hover:bg-gray-400 rounded-md p-2 hover:text-white border border-gray-300 hover:border-inherit">
          Bridge
        </div>
        <div className="flex-center cursor-pointer text-1xl font-semibold bg-inherit hover:bg-gray-400 rounded-md p-2 hover:text-white border border-gray-300 hover:border-inherit">
          Curate
        </div>
      </div>

      <div className="flex-center justify-end gap-4">
        <div className="flex-center cursor-pointer text-1xl font-semibold bg-inherit hover:bg-gray-400 rounded-md p-2 hover:text-white border border-gray-300 hover:border-inherit">
          <FaWallet />
        </div>
        <div className="flex-center cursor-pointer text-1xl font-semibold bg-inherit hover:bg-gray-400 rounded-md p-2 hover:text-white border border-gray-300 hover:border-inherit">
          <IoMdChatbubbles />
        </div>
        <div className="flex-center cursor-pointer text-1xl font-semibold bg-inherit hover:bg-gray-400 rounded-md p-2 hover:text-white border border-gray-300 hover:border-inherit">
          Connect Wallet
        </div>
        <div className="flex-center cursor-pointer text-1xl font-semibold bg-inherit hover:bg-gray-400 rounded-md p-2 hover:text-white border border-gray-300 hover:border-inherit">
          <IoMdArrowDropdown />
        </div>
      </div>
    </div>
  );
};

export default Nav;
