import React from 'react'
import Wallet from './Wallet'
import NFT from './NFT'
import Activity from './Activity'

const Overview = () => {
  return (
    <div className='flex gap-4'>
      <div className='w-[50%] pl-20 pt-4'>
        <Wallet/>
        <NFT/>
      </div>
      <div className='w-[50%] pr-20 pt-4'>
        <Activity/>
      </div>
    </div>
  )
}

export default Overview