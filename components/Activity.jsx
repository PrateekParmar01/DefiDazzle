// Activity.jsx
"use client";
import React from "react";
import { useActivityContext } from "../providers/ActivityContext";

const Activity = () => {
  const { data } = useActivityContext();

  return (
    <div className="w-full h-auto border border-gray-300 bg-white shadow-md rounded-md">
      <p className="text-2xl font-bold px-4 py-2 bg-gray-200">Activity</p>
      <div className="w-full h-auto p-4">
        {data?.slice(0, 7).map((item, index) => (
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
                  <p className="text-purple-500">{item.from_address.slice(0, 2)}...{item.from_address.slice(-2)}</p>
                  <p>Time Stamp</p>
                </div>
              </div>
              <p>
                Sent ${item.value} to{" "}
                <span className="text-green-400">{item.to_address.slice(0, 2)}...{item.to_address.slice(-2)}</span>
              </p>
            </div>
            <p className="p-2 border-b-2">
              Received $ {item.value} as part of this transaction
            </p>
            <div>__ IN</div>
          </div>
        ))}
        <button className="justify-end bg-gray-200 p-2 rounded-md hover:bg-white border-2 hover:text-gray-500">
          Show More
        </button>
      </div>
    </div>
  );
};

export default Activity;
