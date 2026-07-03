import React from 'react'
import DigitalClock from '../components/DigitalClock'

const Clock: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <DigitalClock />
    </div>
  )
}

export default Clock