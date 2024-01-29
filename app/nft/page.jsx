'use client'
import { NFTProvider } from "@/providers/NFTContext";
import React from "react";
import NFT from "@/components/NFT";

const page = ({ activeComponent, setActiveComponent }) => {
  return (
    <NFTProvider>
      <NFT
        activeComponent="NFT"
        setActiveComponent={setActiveComponent}
      />
    </NFTProvider>
  );
};

export default page;
