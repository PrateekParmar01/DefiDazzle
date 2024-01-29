'use client'
import React from 'react'
import Activity from '@/components/Activity'
import { ActivityProvider } from '@/providers/ActivityContext'

const page = ({ activeComponent, setActiveComponent }) => {

  return (
    <ActivityProvider>
      <div className='mx-5'>
        <Activity
        activeComponent="Activity"
        setActiveComponent={setActiveComponent}
      />
      </div>
    </ActivityProvider>
  )
}

export default page