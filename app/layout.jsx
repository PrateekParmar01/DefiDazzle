"use client";
import { useState } from "react";
import "../styles/globals.css";
import Nav from "@/components/Nav";
import ShowDetails from "@/components/ShowDetails";
import { UserProvider } from "@/providers/UserContext";
import TabList from "@/components/TabList";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  const [searchedAddress, setSearchedAddress] = useState("");

  const handleSearch = (address) => {
    setSearchedAddress(address || "demo.eth");
    // console.log(address);
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="main">
            <div className="background"></div>
          </div>
          <div className="w-full h-full relative z-10 pb-10">
            <Nav onSearch={handleSearch} />
            <UserProvider address={searchedAddress}>
              <ShowDetails />
              <TabList />
              {children}
            </UserProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
