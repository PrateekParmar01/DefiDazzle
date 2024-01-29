'use client'
import Wallet from '@/components/Wallet'
import { WalletProvider } from '@/providers/WalletContext'
import React from 'react'

const page = ({ activeComponent, setActiveComponent }) => {
  return (
    <WalletProvider>
        <Wallet
        activeComponent="Wallet"
        setActiveComponent={setActiveComponent}
      />
    </WalletProvider>
  )
}

export default page