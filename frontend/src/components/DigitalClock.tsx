import React, { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown, X, Plus } from 'lucide-react'

interface Clock {
  timezone: string
  city: string
  country: string
}

const DigitalClock: React.FC = () => {
  const [clocks, setClocks] = useState<Clock[]>([
    { timezone: 'Europe/Paris', city: 'Paris', country: 'France' },
    { timezone: 'America/New_York', city: 'New York', country: 'USA' },
    { timezone: 'Asia/Tokyo', city: 'Tokyo', country: 'Japan' },
  ])
  const [times, setTimes] = useState<Record<string, string>>({})
  const [showModal, setShowModal] = useState(false)
  const [selectedTimezone, setSelectedTimezone] = useState('Europe/London')

  const timezones = [
    { timezone: 'Europe/London', city: 'Londres', country: 'Royaume-Uni' },
    { timezone: 'Europe/Paris', city: 'Paris', country: 'France' },
    { timezone: 'Europe/Berlin', city: 'Berlin', country: 'Allemagne' },
    { timezone: 'Europe/Moscow', city: 'Moscou', country: 'Russie' },
    { timezone: 'America/New_York', city: 'New York', country: 'USA' },
    { timezone: 'America/Chicago', city: 'Chicago', country: 'USA' },
    { timezone: 'America/Denver', city: 'Denver', country: 'USA' },
    { timezone: 'America/Los_Angeles', city: 'Los Angeles', country: 'USA' },
    { timezone: 'Asia/Dubai', city: 'Dubaï', country: 'Émirats' },
    { timezone: 'Asia/Kolkata', city: 'New Delhi', country: 'Inde' },
    { timezone: 'Asia/Bangkok', city: 'Bangkok', country: 'Thaïlande' },
    { timezone: 'Asia/Hong_Kong', city: 'Hong Kong', country: 'Chine' },
    { timezone: 'Asia/Shanghai', city: 'Shanghai', country: 'Chine' },
    { timezone: 'Asia/Tokyo', city: 'Tokyo', country: 'Japon' },
    { timezone: 'Asia/Seoul', city: 'Séoul', country: 'Corée' },
    { timezone: 'Australia/Sydney', city: 'Sydney', country: 'Australie' },
    { timezone: 'Pacific/Auckland', city: 'Auckland', country: 'Nouvelle-Zélande' },
    { timezone: 'Africa/Cairo', city: 'Le Caire', country: 'Égypte' },
    { timezone: 'Africa/Lagos', city: 'Lagos', country: 'Nigeria' },
  ]

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, string> = {}
      clocks.forEach((clock) => {
        const date = new Date()
        const time = date.toLocaleTimeString('fr-FR', { timeZone: clock.timezone })
        newTimes[clock.timezone] = time
      })
      setTimes(newTimes)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [clocks])

  const moveUp = (index: number) => {
    if (index > 0) {
      const newClocks = [...clocks]
      ;[newClocks[index], newClocks[index - 1]] = [newClocks[index - 1], newClocks[index]]
      setClocks(newClocks)
    }
  }

  const moveDown = (index: number) => {
    if (index < clocks.length - 1) {
      const newClocks = [...clocks]
      ;[newClocks[index], newClocks[index + 1]] = [newClocks[index + 1], newClocks[index]]
      setClocks(newClocks)
    }
  }

  const removeClock = (index: number) => {
    setClocks(clocks.filter((_, i) => i !== index))
  }

  const addClock = () => {
    const timezone = timezones.find((tz) => tz.timezone === selectedTimezone)
    if (timezone && !clocks.find((c) => c.timezone === timezone.timezone)) {
      setClocks([...clocks, timezone])
      setShowModal(false)
    }
  }

  return (
    <div className="w-full max-w-7xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">🌍 Horloge Mondiale</h1>
            <p className="text-gray-600 mt-2">{clocks.length} fuseaux horaires</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            <span>Ajouter fuseau</span>
          </button>
        </div>

        {/* Grid of clocks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clocks.map((clock, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{clock.city}</h3>
                  <p className="text-sm text-gray-600">{clock.country}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="p-1 hover:bg-blue-200 disabled:opacity-50 rounded transition"
                  >
                    <ChevronUp size={18} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === clocks.length - 1}
                    className="p-1 hover:bg-blue-200 disabled:opacity-50 rounded transition"
                  >
                    <ChevronDown size={18} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => removeClock(index)}
                    className="p-1 hover:bg-red-200 rounded transition"
                  >
                    <X size={18} className="text-red-600" />
                  </button>
                </div>
              </div>

              {/* Digital time */}
              <div className="bg-white rounded-lg p-4 mb-4 text-center">
                <div className="text-4xl font-mono font-bold text-blue-600">
                  {times[clock.timezone] || '00:00:00'}
                </div>
                <p className="text-sm text-gray-600 mt-2">{clock.timezone}</p>
              </div>

              {/* Analog clock */}
              <div className="flex justify-center mb-4">
                <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow">
                  {/* Circle */}
                  <circle cx="60" cy="60" r="55" fill="white" stroke="#2563eb" strokeWidth="2" />
                  {/* Numbers */}
                  {[12, 3, 6, 9].map((num, i) => {
                    const angle = (num === 12 ? 0 : num * 30) * (Math.PI / 180)
                    const x = 60 + 45 * Math.sin(angle)
                    const y = 60 - 45 * Math.cos(angle)
                    return (
                      <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="bold">
                        {num}
                      </text>
                    )
                  })}
                  {/* Center dot */}
                  <circle cx="60" cy="60" r="3" fill="#2563eb" />
                  {/* Hour and minute hands */}
                  {(() => {
                    const date = new Date()
                    const timeInTZ = new Date(date.toLocaleString('en-US', { timeZone: clock.timezone }))
                    const hours = timeInTZ.getHours() % 12
                    const minutes = timeInTZ.getMinutes()
                    const seconds = timeInTZ.getSeconds()

                    const hourAngle = (hours + minutes / 60) * 30
                    const minuteAngle = minutes * 6
                    const secondAngle = seconds * 6

                    return (
                      <>
                        {/* Hour hand */}
                        <line
                          x1="60"
                          y1="60"
                          x2={60 + 25 * Math.sin((hourAngle * Math.PI) / 180)}
                          y2={60 - 25 * Math.cos((hourAngle * Math.PI) / 180)}
                          stroke="#2563eb"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        {/* Minute hand */}
                        <line
                          x1="60"
                          y1="60"
                          x2={60 + 38 * Math.sin((minuteAngle * Math.PI) / 180)}
                          y2={60 - 38 * Math.cos((minuteAngle * Math.PI) / 180)}
                          stroke="#059669"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        {/* Second hand */}
                        <line
                          x1="60"
                          y1="60"
                          x2={60 + 40 * Math.sin((secondAngle * Math.PI) / 180)}
                          y2={60 - 40 * Math.cos((secondAngle * Math.PI) / 180)}
                          stroke="#dc2626"
                          strokeWidth="1"
                          strokeLinecap="round"
                        />
                      </>
                    )
                  })()}
                </svg>
              </div>

              {/* Date */}
              <div className="text-center text-sm text-gray-600">
                {new Date(new Date().toLocaleString('en-US', { timeZone: clock.timezone })).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal pour ajouter un fuseau */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Ajouter un fuseau horaire</h2>
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:border-blue-500 outline-none"
            >
              {timezones.map((tz) => (
                <option key={tz.timezone} value={tz.timezone}>
                  {tz.city} ({tz.country}) - {tz.timezone}
                </option>
              ))}
            </select>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 px-4 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
              >
                Annuler
              </button>
              <button
                onClick={addClock}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DigitalClock