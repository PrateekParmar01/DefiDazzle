import React, { createContext, useContext, useState, useEffect } from "react";
import { CovalentClient } from "@covalenthq/client-sdk";
import { useUserContext } from "./UserContext";
// Create the context
const WalletContext = createContext();

// Create a context provider component
export const WalletProvider = ({ children }) => {
  const { address: userAddress } = useUserContext();

  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = new CovalentClient(process.env.NEXT_PUBLIC_CLIENT_ID);
        const resp =
          await client.BalanceService.getTokenBalancesForWalletAddress(
            "eth-mainnet",
            userAddress || "demo.eth"
          );
        // console.log(resp.data);

        // Check if items array is defined and not empty
        if (resp.data.items && resp.data.items.length > 0) {
          setData(resp.data);
        } else {
          console.error("Items array is not present or empty in the response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userAddress]);
  // console.log(data);

  // Provide the context value to the children
  return (
    <WalletContext.Provider value={{ data, setData }}>
      {children}
    </WalletContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within an WalletProvider");
  }
  return context;
};
