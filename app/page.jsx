"use client";
import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import Overview from "@/components/Overview";
import { ActivityProvider } from "@/providers/ActivityContext";
import { NFTProvider } from "@/providers/NFTContext";
import { WalletProvider } from "@/providers/WalletContext";
import { useUserContext } from "@/providers/UserContext";
import Hero from "@/components/Hero";

const page = () => {
  const { address, data, balance } = useUserContext();
  const [activeComponent, setActiveComponent] = useState("Overview");

  
  return (
    <>
      <ActivityProvider>
        <NFTProvider>
          <WalletProvider>
              <Hero/>
          </WalletProvider>
        </NFTProvider>
      </ActivityProvider>
      
    </>
  );
};

export default page;
