// app/nft/page.jsx
'use client';
import { NFTProvider } from "@/providers/NFTContext";
import React from "react";
import NFT from "@/components/NFT";

const Page = ({ activeComponent, setActiveComponent }) => {
  return (
    <NFTProvider>
      <div className="mx-5">
          <NFT
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
          />
      </div>
    </NFTProvider>
  );
};

export default Page;
