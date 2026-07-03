import React from 'react'
import DigitalClock from '../components/DigitalClock'

const Clock: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4">
      <DigitalClock />
    </div>
  )
}

export default Clock
