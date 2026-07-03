import React, { useState } from 'react'
import JokeGenerator from '../components/JokeGenerator'

const Jokes: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4 flex items-center justify-center">
      <JokeGenerator />
    </div>
  )
}

export default Jokes
