'use client'
import Wallet from '@/components/Wallet'
import { WalletProvider } from '@/providers/WalletContext'
import React from 'react'

const page = ({ activeComponent, setActiveComponent }) => {
  return (
    <WalletProvider>
      <div className='mx-5'>
        <Wallet
        activeComponent="Wallet"
        setActiveComponent={setActiveComponent}
      />
      </div>
    </WalletProvider>
  )
}

export default page