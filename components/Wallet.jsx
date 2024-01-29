"use client";
import React from "react";
import { useEffect, useState } from "react";
import { CovalentClient } from "@covalenthq/client-sdk";
import { useWalletContext } from "@/providers/WalletContext";
import Link from "next/link";
const Wallet = ({ activeComponent, setActiveComponent }) => {
  const { data } = useWalletContext();
  const showData =
    activeComponent === "Wallet" ? data?.items : data?.items.slice(0, 9);

  return (
    <>
    <div className="relative overflow-x-auto border border-gray-300 rounded-lg mb-5 shadow-md">
      <p className="text-2xl w-full font-bold px-4 py-2 bg-gray-200">Wallet</p>
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
          {showData?.map((item, index) => (
            <tr className="bg-white border-b" key={index}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {item.contract_ticker_symbol}
              </th>
              <td className="px-6 py-4">{item.quote_rate}</td>
              <td className="px-6 py-4">
                {(
                  Number(item.balance) / Math.pow(10, item.contract_decimals)
                ).toFixed(3)}
              </td>
              <td className="px-6 py-4">
                $
                {(
                  (Number(item.balance) * item.quote_rate) /
                  Math.pow(10, item.contract_decimals)
                ).toFixed(3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      {activeComponent === "Wallet" ? null : (
      <Link
        href="/wallet"
        className="justify-end bg-gray-200 p-2 m-2 rounded-md hover:bg-white border-2 hover:text-gray-500 shadow-md">
        Show More
      </Link>
      )}
    </>
  );
};

export default Wallet;
