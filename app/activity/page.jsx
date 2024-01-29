'use client'
import React from 'react'
import Activity from '@/components/Activity'
import { ActivityProvider } from '@/providers/ActivityContext'

const page = ({ activeComponent, setActiveComponent }) => {

  return (
    <ActivityProvider>
        <Activity
        activeComponent="Activity"
        setActiveComponent={setActiveComponent}
      />
    </ActivityProvider>
  )
}

export default page