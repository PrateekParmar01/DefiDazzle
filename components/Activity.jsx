"use client";
import React, { useEffect, useState } from "react";
import { useActivityContext } from "../providers/ActivityContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn,useSession, getProviders } from "next-auth/react";

const Activity = ({ activeComponent, setActiveComponent }) => {
  const { data } = useActivityContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showData, setShowData] = useState();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (activeComponent === "Activity") {
      setShowData(data);
    } else {
      setShowData(data.slice(0, 7));
    }
  }, [data]);

  // const showData =
  //   activeComponent === "Activity" ? data?.items : data?.items?.slice(0, 7);

  return (
    <>
      {session?.user ? (
        <>
          <div className="w-full h-auto border border-gray-300 bg-white shadow-md rounded-md mb-5">
            <p className="text-2xl font-bold px-4 py-2 bg-gray-200">Activity</p>
            <div
              className={`w-full h-auto p-4 ${
                pathname == "/activity" ? "md:grid md:grid-cols-2 md:gap-3" : ""
              }`}
            >
              {isLoading && (
                <div
                  role="status"
                  className={`flex items-center ${
                    pathname == "/activity" ? "justify-end" : "justify-center"
                  }`}
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              {showData?.map((item, index) => (
                <div
                  className="border-2 border-gray-300 rounded-lg p-4 my-4 bg-gray-50 shadow-md"
                  key={index}
                >
                  <div className="border-l-4 pl-2 border-gray-300">
                    <div className="flex gap-2">
                      <img
                        src={item.image}
                        alt="logo"
                        width={50}
                        height={50}
                        className="object-contain bg-black rounded-md"
                      />
                      <div>
                        <p className="text-purple-500">
                          {item.from_address.slice(0, 2)}...
                          {item.from_address.slice(-2)}
                        </p>
                        <p>{new Date(item.date_time).toLocaleString()}</p>
                      </div>
                    </div>
                    <p>
                      Sent $
                      {(
                        Number(item.value).toFixed(2) *
                        Math.pow(10, -18) *
                        Number(item.exchange_rate).toFixed(2)
                      ).toFixed(4)}{" "}
                      to{" "}
                      <span className="text-green-400">
                        {item.to_address.slice(0, 2)}...
                        {item.to_address.slice(-2)}
                      </span>
                    </p>
                  </div>
                  <p className="p-2 border-b-2">
                    Received $
                    {(
                      Number(item.value).toFixed(2) *
                      Math.pow(10, -18) *
                      Number(item.exchange_rate).toFixed(2)
                    ).toFixed(4)}{" "}
                    as part of this transaction
                  </p>
                  {item.verdict == true ? (
                    <div className="text-1xl font-semibold text-green-500">
                      Success
                    </div>
                  ) : (
                    <div className="text-1xl font-semibold text-red-600">
                      Failed
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {activeComponent === "Activity" ? null : (
            <Link
              href="/activity"
              className="justify-end bg-gray-200 p-2 rounded-md hover:bg-white border-2 hover:text-gray-500 shadow-md"
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
                  <p className="desc text-center">SignIn to track your Activities</p>
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

export default Activity;
