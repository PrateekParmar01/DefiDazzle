import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CovalentClient } from "@covalenthq/client-sdk";
import { useEffect, useState } from "react";

const NFT = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = new CovalentClient(process.env.NEXT_PUBLIC_CLIENT_ID);
        const resp = await client.NftService.getNftsForAddress(
          "eth-mainnet",
          "demo.eth"
        );
        setData(resp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  // console.log(data);
  return (
    <>
    <p className="text-2xl font-bold px-4 py-2 my-2 border-b-2 border-gray-300">NFTs</p>
    <div className="grid grid-cols-3 gap-4">
      {data?.items.slice(0, 9).map((item, index) => (
        <div key={index} className="flex flex-col items-center border rounded-xl bg-white shadow-md">
          <div className="bg-gray-100 w-full max-h-[50%] flex justify-center">
            <img
              src={item.nft_data?.[0]?.external_data?.image}
              alt="Image Description"
              width={120}
              height={120}
            />
          </div>
          <div className="w-full px-2 py-2">
            <h3 className="text-md font-bold text-gray-800">
              {item.contract_name}
            </h3>
            <div className="flex justify-between w-full gap-2">
              <p className="text-sm mt-1 text-gray-500 justify-end">
                Floor Price
              </p>
              <p className="text-sm mt-1 text-gray-500 justify-end">
                Est Value
              </p>
            </div>
            <div className="flex justify-between w-full gap-2">
              <p className="text-sm mt-1 text-gray-500 justify-end">
                {item.pretty_floor_price_quote}
              </p>
              <p className="text-sm mt-1 text-gray-500 justify-end">
                {(Number(item.floor_price_native_quote)).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
      <button className="justify-end bg-gray-200 p-2 rounded-md hover:bg-white hover:border-2 hover:text-gray-500">Show More</button>
    </div>
    </>
  );
};

export default NFT;
