import React from 'react'
import JokeGenerator from '../components/JokeGenerator'

const Jokes: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-4 flex items-center justify-center">
      <JokeGenerator />
    </div>
  )
}

export default Jokes
