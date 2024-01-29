'use client'
import { NFTProvider } from "@/providers/NFTContext";
import React from "react";
import NFT from "@/components/NFT";

const page = ({ activeComponent, setActiveComponent }) => {
  return (
    <NFTProvider>
      <div className='mx-5'>
      <NFT
        activeComponent="NFT"
        setActiveComponent={setActiveComponent}
      />
      </div>
    </NFTProvider>
  );
};

export default page;
