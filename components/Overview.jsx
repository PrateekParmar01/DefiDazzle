import React from 'react'
import Wallet from './Wallet'
import NFT from './NFT'
import Activity from './Activity'

const Overview = () => {
  return (
    <div className='lg:flex gap-4'>
      <div className='w:full lg:w-[50%] p-3 lg:pl-20 lgpt-4'>
        <Wallet/>
        <NFT/>
      </div>
      <div className='w:full lg:w-[50%] p-3 lg:pr-20 lg:pt-4'>
        <Activity/>
      </div>
    </div>
  )
}

export default Overview