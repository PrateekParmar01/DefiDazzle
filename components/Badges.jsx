"use client";
import React from "react";
import { signIn,useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Badges = () => {
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
          <div>Badges</div>
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
                  <p className="desc text-center">SignIn to track your Badges</p>
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

export default Badges;
