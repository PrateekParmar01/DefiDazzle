"use client";
import React from "react";
import { useEffect, useState } from "react";
import { CovalentClient } from "@covalenthq/client-sdk";
import { useWalletContext } from "@/providers/WalletContext";
import Link from "next/link";
import { signIn,useSession, getProviders } from "next-auth/react";

const Wallet = ({ activeComponent, setActiveComponent }) => {
  const { data } = useWalletContext();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const showData =
    activeComponent === "Wallet" ? data?.items : data?.items.slice(0, 9);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <>
      {session?.user ? (
        <>
          <div className="relative overflow-x-auto border border-gray-300 rounded-lg mb-5 shadow-md">
            <p className="text-2xl w-full font-bold px-4 py-2 bg-gray-200">
              Wallet
            </p>
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
                        Number(item.balance) /
                        Math.pow(10, item.contract_decimals)
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
              className="justify-end bg-gray-200 p-2 m-2 rounded-md hover:bg-white border-2 hover:text-gray-500 shadow-md"
            >
              Show More
            </Link>
          )}
        </>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <>
                <section className="w-full flex-center flex-col">
                  <h1 className="head_text text-center">
                    Track & Share
                    <br className="max-md:hidden" />
                    <span className="orange_gradient text-center">
                      {" "}
                      NFTs,Badges,Tokens
                    </span>
                  </h1>
                  <p className="desc text-center">
                    SignIn to track your Wallet
                  </p>
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn"
                  >
                    Sign in
                  </button>
                </section>
              </>
            ))}
        </>
      )}
    </>
  );
};

export default Wallet;
