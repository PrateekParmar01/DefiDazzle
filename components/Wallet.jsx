"use client"
import React from "react";
import { useEffect, useState } from "react";
import { CovalentClient } from "@covalenthq/client-sdk";
const Wallet = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = new CovalentClient(process.env.NEXT_PUBLIC_CLIENT_ID);
        const resp =
          await client.BalanceService.getTokenBalancesForWalletAddress(
            "eth-mainnet",
            "demo.eth"
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
  }, []);
  // Log the updated value outside the fetchData function

  return (
    <div className="relative overflow-x-auto border border-gray-300 rounded-lg mb-10 shadow-md">
       <p className="text-2xl font-bold px-4 py-2 bg-gray-200">Wallet</p>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Token
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Balance
            </th>
            <th scope="col" className="px-6 py-3">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.items.slice(0, 9).map((item, index) => (
            <tr className="bg-white border-b" key={index}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {item.contract_ticker_symbol}
              </th>
              <td className="px-6 py-4">{item.quote_rate}</td>
              <td className="px-6 py-4">{(Number(item.balance) * 1e-18).toFixed(3)}</td>
              <td className="px-6 py-4">${(Number(item.balance) * 1e-18 * item.quote_rate).toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="justify-end bg-gray-200 p-2 m-2 rounded-md hover:bg-white hover:border-2 hover:text-gray-500">Show More</button>
    </div>
  );
};

export default Wallet;
