import React, { createContext, useContext, useState, useEffect } from 'react';
import { CovalentClient } from '@covalenthq/client-sdk';
import { useUserContext } from './UserContext';
// Create the context
const ActivityContext = createContext();

// Create a context provider component
export const ActivityProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const { address: userAddress } = useUserContext();
  useEffect(() => {
    const fetchData = async () => {
      // if (!dataFetched) {
        const newData = [];
        const client = new CovalentClient(process.env.NEXT_PUBLIC_CLIENT_ID);

        try {
          for await (const resp of client.TransactionService.getAllTransactionsForAddress(
            'eth-mainnet',
            userAddress || 'demo.eth'
          )) {
            const newItem = {
              to_address: resp.to_address,
              from_address: resp.from_address,
              value: resp.value,
              image: resp.gas_metadata.logo_url,
              date_time: resp.block_signed_at
            };
            // console.log(newItem.date_time)
            newData.push(newItem);
          }
        } catch (error) {
          console.log(error.message);
        }

        setData(newData);
        setDataFetched(true);
      }
    // };

    fetchData();
  }, [dataFetched,userAddress]);

  // Provide the context value to the children
  return (
    <ActivityContext.Provider value={{ data, setData }}>
      {children}
    </ActivityContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivityContext must be used within an ActivityProvider');
  }
  return context;
};
