'use client'
import { useState } from "react";
import { UserProvider } from "@/providers/UserContext";
import "../styles/globals.css";
import Nav from "@/components/Nav";



export default function RootLayout({ children }) {
  const [searchedAddress, setSearchedAddress] = useState("");

  const handleSearch = (address) => {
    setSearchedAddress(address || "demo.eth");
    // console.log(address);
  };

  return (
    <UserProvider address={searchedAddress}>
      <html lang="en">
        <body>
          <div className="main">
            <div className="background"></div>
          </div>
          <div className="w-full h-full relative z-10 pb-10">
            <Nav onSearch={handleSearch} />
            {children}
          </div>
        </body>
      </html>
    </UserProvider>
  );
}
