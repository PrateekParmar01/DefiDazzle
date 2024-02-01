"use client";
import React from "react";
import Wallet from "./Wallet";
import NFT from "./NFT";
import Activity from "./Activity";
import { WalletProvider } from "@/providers/WalletContext";
import { NFTProvider } from "@/providers/NFTContext";
import { ActivityProvider } from "@/providers/ActivityContext";
import { signIn,useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Overview = ({ activeComponent, setActiveComponent }) => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

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
          <WalletProvider>
            <NFTProvider>
              <ActivityProvider>
                <div className="lg:flex gap-4">
                  <div className="w:full lg:w-[50%] p-3 lg:pl-20 lgpt-4">
                    <Wallet />
                    <NFT
                      activeComponent={activeComponent}
                      setActiveComponent={setActiveComponent}
                    />
                  </div>
                  <div className="w:full lg:w-[50%] p-3 lg:pr-20 lg:pt-4">
                    <Activity />
                  </div>
                </div>
              </ActivityProvider>
            </NFTProvider>
          </WalletProvider>
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
                    SignIn to track your Portfolio
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

export default Overview;
