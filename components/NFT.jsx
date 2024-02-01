"use client";
import React, { useState, Suspense } from "react";
import { useNFTContext } from "@/providers/NFTContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn,useSession, getProviders } from "next-auth/react";
import { useEffect} from "react";


const NFT = ({ activeComponent, setActiveComponent }) => {
  const { data } = useNFTContext();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const showData =
  pathname === "/nft" ? data?.items : data?.items.slice(0, 9);
  return (
    <>
      {session?.user ? (
        <>
      <p className="text-2xl font-bold px-4 py-2 my-2 border-b-2 border-gray-300">
        NFTs
      </p>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${pathname=='/nft'?"md:grid-cols-5":"md:grid-cols-3"} gap-4 mb-6`}>
        {showData
          ? showData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center border rounded-xl bg-white shadow-md"
              >
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
                      {Number(item.floor_price_native_quote).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
        {pathname === "/nft" ? null : (
          <Link
           href="/nft"
            className="justify-end bg-gray-200 p-2 rounded-md hover:bg-white border-2 hover:text-gray-500 shadow-md"
          >
            Show More
          </Link>
        )}
        </>
      ):(
        <>
          {providers &&
            Object.values(providers).map((provider,index) => (
              <>
                <section key={index} className="w-full flex-center flex-col">
                  <h1 className="head_text text-center">
                    Track & Share
                    <br className="max-md:hidden" />
                    <span className="orange_gradient text-center">
                      {" "}
                      NFTs,Badges,Tokens
                    </span>
                  </h1>
                  <p className="desc text-center">
                    SignIn to track your NFTs
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

export default NFT;
