"use client";
import React from "react";
import { CovalentClient } from "@covalenthq/client-sdk";
import { useEffect, useState } from "react";

const Activity = () => {
  const [data, setData] = useState();
  const [txData, setTxData] = useState();


  useEffect(() => {
    const fetchData = async () => {
      const newData = [];
      const client = new CovalentClient(process.env.NEXT_PUBLIC_CLIENT_ID);
      let shouldContinue = true;
      const timeoutId = setTimeout(() => {
        shouldContinue = false;
      }, 8000);
      try {
        for await (const resp of client.TransactionService.getAllTransactionsForAddress(
          "eth-mainnet",
          "demo.eth"
        )) {
          if (!shouldContinue) break;
          const newItem = {
            to_address: resp.to_address,
            from_address: resp.from_address,
            value: resp.value,
          };

          newData.push(newItem);
          // console.log(newItem);
        }
      }catch(error){
        console.log(error.message);
      }
      // console.log(newData)
      setData(newData);
    };

    fetchData();
  }, []);

  // Now 'data' state holds the fetched data
  // console.log(data);
  return (
    <div className="w-full h-full border border-gray-300 bg-white shadow-md rounded-md">
      <p className="text-2xl font-bold px-4 py-2 bg-gray-200">Activity</p>
      <div className="w-full h-auto p-4">
        {data?.slice(0,7).map((item, index) => (
          <div className="border-2 border-gray-300 rounded-lg p-4 my-4 bg-gray-50 shadow-md" key={index}>
            <div className="border-l-4 pl-2 border-gray-300">
              <div className="flex gap-2">
                <img
                  src="/assets/images/logo.svg"
                  alt="logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <div>
                  <p className="text-purple-500">{item.from_address}</p>
                  <p>Time Stamp</p>
                </div>
              </div>
              <p>Sent ${item.value} to <span className="text-green-400">{item.to_address}</span></p>
            </div>
            <p className="p-2 border-b-2">
              Received $ {item.value} as part of this transaction
            </p>
            <div>__ IN</div>
          </div>
        ))}
        <button className="justify-end bg-gray-200 p-2 rounded-md hover:bg-white hover:border-2 hover:text-gray-500">Show More</button>
      </div>
    </div>
  );
  
};

export default Activity;
