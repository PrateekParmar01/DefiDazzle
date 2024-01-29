// Activity.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useActivityContext } from "../providers/ActivityContext";
import Link from "next/link";
const Activity = ({ activeComponent, setActiveComponent }) => {
  const { data } = useActivityContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [data]);

  // const showData =
  //   activeComponent === "Activity" ? data?.items : data?.items?.slice(0, 7);

  return (
    <>
      <div className="w-full h-auto border border-gray-300 bg-white shadow-md rounded-md mb-5">
        <p className="text-2xl font-bold px-4 py-2 bg-gray-200">Activity</p>
        <div className="w-full h-auto p-4">
          {isLoading && <div>Loading data</div>}
          {data.slice(0, 7).map((item, index) => (
            <div
              className="border-2 border-gray-300 rounded-lg p-4 my-4 bg-gray-50 shadow-md"
              key={index}
            >
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
                    <p className="text-purple-500">
                      {item.from_address.slice(0, 2)}...
                      {item.from_address.slice(-2)}
                    </p>
                    <p>Time Stamp</p>
                  </div>
                </div>
                <p>
                  Sent ${item.value} to{" "}
                  <span className="text-green-400">
                    {item.to_address.slice(0, 2)}...
                    {item.to_address.slice(-2)}
                  </span>
                </p>
              </div>
              <p className="p-2 border-b-2">
                Received $ {item.value} as part of this transaction
              </p>
              <div>__ IN</div>
            </div>
          ))}
        </div>
      </div>
      {activeComponent === "Activity" ? null : (
        <Link
          href="/activity"
          className="justify-end bg-gray-200 p-2 rounded-md hover:bg-white border-2 hover:text-gray-500"
        >
          Show More
        </Link>
      )}
    </>
  );
};

export default Activity;
