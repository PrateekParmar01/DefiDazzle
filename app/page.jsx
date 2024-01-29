"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CovalentClient } from "@covalenthq/client-sdk";
import { MdOutlineFileUpload } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import "../styles/globals.css";
import Overview from "@/components/Overview";
import NFT from "@/components/NFT";
import Activity from "@/components/Activity";
import Wallet from "@/components/Wallet";
import Badges from "@/components/Badges";
import { ActivityProvider } from "@/providers/ActivityContext";
import { NFTProvider } from "@/providers/NFTContext";
import { WalletProvider } from "@/providers/WalletContext";
import { useUserContext } from "@/providers/UserContext";

const page = () => {
  const { address, data, balance } = useUserContext();
  const [activeComponent, setActiveComponent] = useState("Overview");

  const renderComponent = () => {
    switch (activeComponent) {
      case "NFT":
        return (
          <NFT
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
          />
        );
      case "Activity":
        return <Activity />;
      case "Wallet":
        return <Wallet />;
      case "Badges":
        return <Badges />;
      default:
        return (
          <Overview
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
          />
        );
    }
  };

  return (
    <>
      <ActivityProvider>
        <NFTProvider>
          <WalletProvider>
            <Overview/>
          </WalletProvider>
        </NFTProvider>
      </ActivityProvider>
      
    </>
  );
};

export default page;
