'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import { CovalentClient } from "@covalenthq/client-sdk";

// Create the context
const UserContext = createContext();

// Create a context provider component
export const UserProvider = ({ children,address}) => {
  const [data, setData] = useState();
  const [balance, setBalance] = useState();
    console.log(address)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = new CovalentClient(process.env.NEXT_PUBLIC_CLIENT_ID);
        const resp =
          await client.BalanceService.getHistoricalTokenBalancesForWalletAddress(
            "eth-mainnet",
            `${address}` ||"demo.eth"
          );

        // Check if items array is defined and not empty
        if (resp.data.items && resp.data.items.length > 0) {
          setData(resp.data);

          // Extract balance in ETH
          const ethBalance = parseFloat(resp.data.items[0].balance);

          // Extract exchange rate
          const exchangeRate = 2220.98 * 1e-18;

          // Convert balance to USD
          const usdBalance = (ethBalance * exchangeRate).toFixed(3);

          // console.log("Balance in ETH:", ethBalance);
          // console.log("exchangeRate:", exchangeRate);
          // console.log("Balance in USD:", usdBalance);
          setBalance(usdBalance);
        } else {
          console.error("Items array is not present or empty in the response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [address]);
  // console.log(data);

  // Provide the context value to the children
  return (
    <UserContext.Provider value={{address, data, setData,balance,setBalance }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};
