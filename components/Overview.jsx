'use client'
import React from "react";
import Wallet from "./Wallet";
import NFT from "./NFT";
import Activity from "./Activity";
import { WalletProvider } from "@/providers/WalletContext";
import { NFTProvider } from "@/providers/NFTContext";
import { ActivityProvider } from "@/providers/ActivityContext";

const Overview = ({ activeComponent, setActiveComponent }) => {
  return (
    <WalletProvider>
      <NFTProvider>
        <ActivityProvider>
        <div className="lg:flex gap-4">
          <div className="w:full lg:w-[50%] p-3 lg:pl-20 lgpt-4">
            <Wallet />
            <NFT
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
            />
          </div>
          <div className="w:full lg:w-[50%] p-3 lg:pr-20 lg:pt-4">
            <Activity />
          </div>
        </div>
        </ActivityProvider>
      </NFTProvider>
    </WalletProvider>
  );
};

export default Overview;
