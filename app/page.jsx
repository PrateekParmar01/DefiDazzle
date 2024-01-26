"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import { CovalentClient } from "@covalenthq/client-sdk";
import { MdOutlineFileUpload } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import "../styles/globals.css"
import Overview from '@/components/Overview';
import NFT from '@/components/NFT';
import Activity from '@/components/Activity';
import Portfolio from '@/components/Portfolio';
import Badges from '@/components/Badges';

const page = () => {
  // console.log("hello");
  const [data, setData] = useState();
  const [balance, setBalance] = useState();
  const [activeComponent, setActiveComponent] = useState('Overview');

useEffect(() => {
  const fetchData = async () => {
    try {
      const client = new CovalentClient(process.env.NEXT_PUBLIC_CLIENT_ID);
      const resp = await client.BalanceService.getHistoricalTokenBalancesForWalletAddress("eth-mainnet","demo.eth");
      
      // Check if items array is defined and not empty
      if (resp.data.items && resp.data.items.length > 0) {
        setData(resp.data);

        // Extract balance in ETH
        const ethBalance = parseFloat(resp.data.items[0].balance);

        // Extract exchange rate
        const exchangeRate = 2220.98 * 1e-18;

        // Convert balance to USD
        const usdBalance = (ethBalance * exchangeRate).toFixed(3);

        // console.log("Balance in ETH:", ethBalance);
        // console.log("exchangeRate:", exchangeRate);
        // console.log("Balance in USD:", usdBalance);
        setBalance(usdBalance);
      } else {
        console.error("Items array is not present or empty in the response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);

const renderComponent = () => {
  switch (activeComponent) {
    case 'NFT':
      return <NFT />;
    case 'Activity':
      return <Activity />;
    case 'Portfolio':
      return <Portfolio />;
    case 'Badges':
      return <Badges />;
    default:
      return <Overview />;
  }
};


  return (
    <>
    <div className="flex w-full mb-2 p-3 sm:justify-between px-20 border-b-2">
      <div className='justify-end gap-2'>
        <Link href="/" className="flex flex-center">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </Link>
        <div className='flex-center gap-1.5'>
          <p className="text-2xl font-bold text-center">Demo.eth</p>
          <RiArrowDropDownLine className='text-2xl font-semibold'/>
        </div>
        <div className='flex gap-2'>
          <p className="text-1xl font-semibold text-gray-300 text-center">0 followers</p>
          <p className="text-1xl font-semibold text-gray-300 text-center">0 following</p>
        </div>
      </div>
      <div className='w-[30%] justify-end'>
        <div className='flex gap-2 justify-end align-bottom px-3'>
          <div className='text-1xl font-semibold rounded-lg p-2 bg-purple-500 hover:bg-purple-600 text-white cursor-pointer '>Follow</div>
          <div className='text-1xl font-semibold rounded-md p-2 bg-gray-300 hover:bg-gray-400 text-white hover:text-gray-50 cursor-pointer'>Send</div>
          <div className='text-2xl font-bold rounded-md p-2 bg-gray-300 hover:bg-gray-400 text-white hover:text-gray-50 cursor-pointer'><MdOutlineFileUpload/></div>
        </div>
        <div className='m-3 p-3 bg-gray-400 rounded-xl'>
          <p className='text-2xl text-gray-50'>Net Worth</p>
          <p className='text-4xl text-gray-50 font-semibold'>${balance}</p>
          <div className='flex gap-1 justify-start mt-2'>
            <div className='text-gray-50 bg-gray-300 hover:bg-gray-200 hover:text-purple-500 rounded-md px-2 py-1 cursor-pointer'>Wallet</div>
            <div className='text-gray-50 bg-gray-300 hover:bg-gray-200 hover:text-purple-500 rounded-md px-2 py-1 cursor-pointer'>Balance</div>
            <div className='text-gray-50 bg-gray-300 hover:bg-gray-200 hover:text-purple-500 rounded-md px-2 py-1 cursor-pointer'>Other</div>
          </div>
        </div>
      </div>
    </div>
    <div className='flex justify-start gap-4 w-full px-20 mt-0'>
      <div className='text-1xl font-bold rounded-md hover:bg-gray-200 p-2 hover:text-white cursor-pointer' onClick={()=>setActiveComponent('Overview')}>Overview</div>
      <div className='text-1xl font-bold rounded-md hover:bg-gray-200 p-2 hover:text-white cursor-pointer' onClick={()=>setActiveComponent('NFT')}>NFTs</div>
      <div className='text-1xl font-bold rounded-md hover:bg-gray-200 p-2 hover:text-white cursor-pointer' onClick={()=>setActiveComponent('Portfolio')}>Portfolio</div>
      <div className='text-1xl font-bold rounded-md hover:bg-gray-200 p-2 hover:text-white cursor-pointer' onClick={()=>setActiveComponent('Activity')}>Activity</div>
      <div className='text-1xl font-bold rounded-md hover:bg-gray-200 p-2 hover:text-white cursor-pointer' onClick={()=>setActiveComponent('Badges')}>Badges</div>
    </div>
    {activeComponent!='Overview'?
      <div className='m-4'>
        {renderComponent()}
      </div>:<div>
        {renderComponent()} 
      </div>
    }

    </>
  )
}

export default page