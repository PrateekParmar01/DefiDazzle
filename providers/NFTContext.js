import React, { createContext, useContext, useState, useEffect } from "react";
import { CovalentClient } from "@covalenthq/client-sdk";
import { useUserContext } from "./UserContext";
// Create the context
const NFTContext = createContext();

// Create a context provider component
export const NFTProvider = ({ children }) => {
  const { address: userAddress } = useUserContext();
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // if (userAddress) {
          const client = new CovalentClient(process.env.NEXT_PUBLIC_CLIENT_ID);
          const resp = await client.NftService.getNftsForAddress(
            "eth-mainnet",
            userAddress || "demo.eth" // Use the user's address here
          );
          setData(resp.data);
        // } else {
        //   console.error("User address is not available");
        // }
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    fetchData();
  }, [userAddress]);
  // console.log(data);

  // Provide the context value to the children
  return (
    <NFTContext.Provider value={{ data, setData }}>
      {children}
    </NFTContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useNFTContext = () => {
  const context = useContext(NFTContext);
  if (!context) {
    throw new Error("useNFTContext must be used within an NFTProvider");
  }
  return context;
};
