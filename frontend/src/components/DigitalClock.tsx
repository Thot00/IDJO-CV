import React, { useState, useEffect } from 'react'
import { Globe, ChevronLeft, ChevronRight } from 'lucide-react'

interface TimeZone {
  name: string
  offset: string
  tzId: string
}

const DigitalClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [selectedTimeZones, setSelectedTimeZones] = useState<TimeZone[]>([
    { name: 'Paris (France)', offset: 'Europe/Paris', tzId: 'Europe/Paris' },
    { name: 'New York (USA)', offset: 'America/New_York', tzId: 'America/New_York' },
    { name: 'Tokyo (Japon)', offset: 'Asia/Tokyo', tzId: 'Asia/Tokyo' },
    { name: 'Sydney (Australie)', offset: 'Australia/Sydney', tzId: 'Australia/Sydney' },
  ])
  const [showTimezoneSelector, setShowTimezoneSelector] = useState(false)

  const timeZones: TimeZone[] = [
    { name: 'Londres', offset: 'Europe/London', tzId: 'Europe/London' },
    { name: 'Paris', offset: 'Europe/Paris', tzId: 'Europe/Paris' },
    { name: 'Berlin', offset: 'Europe/Berlin', tzId: 'Europe/Berlin' },
    { name: 'Tokyo', offset: 'Asia/Tokyo', tzId: 'Asia/Tokyo' },
    { name: 'Sydney', offset: 'Australia/Sydney', tzId: 'Australia/Sydney' },
    { name: 'New York', offset: 'America/New_York', tzId: 'America/New_York' },
    { name: 'Los Angeles', offset: 'America/Los_Angeles', tzId: 'America/Los_Angeles' },
    { name: 'Toronto', offset: 'America/Toronto', tzId: 'America/Toronto' },
    { name: 'Mexico City', offset: 'America/Mexico_City', tzId: 'America/Mexico_City' },
    { name: 'São Paulo', offset: 'America/Sao_Paulo', tzId: 'America/Sao_Paulo' },
    { name: 'Dubai', offset: 'Asia/Dubai', tzId: 'Asia/Dubai' },
    { name: 'Singapour', offset: 'Asia/Singapore', tzId: 'Asia/Singapore' },
    { name: 'Hong Kong', offset: 'Asia/Hong_Kong', tzId: 'Asia/Hong_Kong' },
    { name: 'Bangkok', offset: 'Asia/Bangkok', tzId: 'Asia/Bangkok' },
    { name: 'Mumbai', offset: 'Asia/Kolkata', tzId: 'Asia/Kolkata' },
    { name: 'Istanbul', offset: 'Europe/Istanbul', tzId: 'Europe/Istanbul' },
    { name: 'Le Caire', offset: 'Africa/Cairo', tzId: 'Africa/Cairo' },
    { name: 'Johannesburg', offset: 'Africa/Johannesburg', tzId: 'Africa/Johannesburg' },
    { name: 'Auckland', offset: 'Pacific/Auckland', tzId: 'Pacific/Auckland' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getTimeInTimeZone = (tzId: string): string => {
    try {
      const formatter = new Intl.DateTimeFormat('fr-FR', {
        timeZone: tzId,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      return formatter.format(currentTime)
    } catch (e) {
      return '--:--:--'
    }
  }

  const getDateInTimeZone = (tzId: string): string => {
    try {
      const formatter = new Intl.DateTimeFormat('fr-FR', {
        timeZone: tzId,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      })
      return formatter.format(currentTime)
    } catch (e) {
      return ''
    }
  }

  const toggleTimeZone = (tz: TimeZone) => {
    const isSelected = selectedTimeZones.some((t) => t.tzId === tz.tzId)
    if (isSelected) {
      if (selectedTimeZones.length > 1) {
        setSelectedTimeZones(selectedTimeZones.filter((t) => t.tzId !== tz.tzId))
      }
    } else {
      if (selectedTimeZones.length < 6) {
        setSelectedTimeZones([...selectedTimeZones, tz])
      }
    }
  }

  const removeTimeZone = (tzId: string) => {
    if (selectedTimeZones.length > 1) {
      setSelectedTimeZones(selectedTimeZones.filter((t) => t.tzId !== tzId))
    }
  }

  const moveTimeZone = (index: number, direction: 'up' | 'down') => {
    const newArray = [...selectedTimeZones]
    if (direction === 'up' && index > 0) {
      [newArray[index], newArray[index - 1]] = [newArray[index - 1], newArray[index]]
    } else if (direction === 'down' && index < newArray.length - 1) {
      [newArray[index], newArray[index + 1]] = [newArray[index + 1], newArray[index]]
    }
    setSelectedTimeZones(newArray)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Globe className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Horloge Mondiale</h1>
        </div>
        <button
          onClick={() => setShowTimezoneSelector(!showTimezoneSelector)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          {showTimezoneSelector ? 'Fermer' : 'Ajouter fuseau'}
        </button>
      </div>

      {/* Timezone Selector */}
      {showTimezoneSelector && (
        <div className="mb-8 p-4 bg-slate-700 rounded-lg border border-slate-600">
          <h2 className="text-white font-semibold mb-4">Sélectionnez les fuseaux horaires (max 6)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {timeZones.map((tz) => {
              const isSelected = selectedTimeZones.some((t) => t.tzId === tz.tzId)
              return (
                <button
                  key={tz.tzId}
                  onClick={() => toggleTimeZone(tz)}
                  className={`p-3 rounded-lg font-medium transition ${
                    isSelected
                      ? 'bg-blue-600 text-white border-2 border-blue-400'
                      : 'bg-slate-600 text-slate-200 border-2 border-transparent hover:bg-slate-500'
                  }`}
                >
                  {tz.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Clocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedTimeZones.map((tz, index) => (
          <div
            key={tz.tzId}
            className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600 hover:border-blue-400 transition shadow-lg"
          >
            {/* Timezone Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-blue-300">{tz.name}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => moveTimeZone(index, 'up')}
                  disabled={index === 0}
                  className="p-2 hover:bg-slate-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-300" />
                </button>
                <button
                  onClick={() => moveTimeZone(index, 'down')}
                  disabled={index === selectedTimeZones.length - 1}
                  className="p-2 hover:bg-slate-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
                <button
                  onClick={() => removeTimeZone(tz.tzId)}
                  className="p-2 hover:bg-red-600 rounded text-red-400 hover:text-red-200"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Digital Time Display */}
            <div className="bg-black rounded-lg p-6 mb-4 border-2 border-blue-500">
              <div className="text-5xl font-mono font-bold text-blue-400 text-center mb-2 tracking-wider">
                {getTimeInTimeZone(tz.tzId)}
              </div>
              <div className="text-xs text-gray-400 text-center font-mono">
                {tz.tzId.replace('_', ' ')}
              </div>
            </div>

            {/* Date Display */}
            <div className="text-sm text-gray-300 text-center capitalize">
              {getDateInTimeZone(tz.tzId)}
            </div>

            {/* Analog Clock */}
            <div className="mt-4 flex justify-center">
              <AnalogClock tzId={tz.tzId} time={currentTime} />
            </div>
          </div>
        ))}
      </div>

      {/* Current Time Summary */}
      <div className="mt-8 p-4 bg-blue-900 rounded-lg border border-blue-600">
        <p className="text-gray-300 text-center">
          <span className="text-blue-300 font-semibold">Heure actuelle (locale):</span>
          {' '}
          <span className="text-white font-mono text-lg">{currentTime.toLocaleTimeString('fr-FR')}</span>
        </p>
      </div>
    </div>
  )
}

interface AnalogClockProps {
  tzId: string
  time: Date
}

const AnalogClock: React.FC<AnalogClockProps> = ({ tzId, time }) => {
  const getTimeInTimeZone = (tzId: string): Date => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tzId,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const parts = formatter.formatToParts(time)
    const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0')
    const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0')
    const second = parseInt(parts.find((p) => p.type === 'second')?.value || '0')

    const tzTime = new Date(time)
    tzTime.setHours(hour, minute, second)
    return tzTime
  }

  const tzTime = getTimeInTimeZone(tzId)
  const hours = tzTime.getHours() % 12
  const minutes = tzTime.getMinutes()
  const seconds = tzTime.getSeconds()

  const hourDegrees = (hours * 30) + (minutes * 0.5)
  const minuteDegrees = (minutes * 6) + (seconds * 0.1)
  const secondDegrees = seconds * 6

  return (
    <div className="relative w-24 h-24 rounded-full bg-black border-4 border-gray-600">
      {/* Hour Markers */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-3 bg-gray-500 left-1/2 top-1 transform -translate-x-1/2 origin-center"
          style={{
            transform: `translateX(-50%) rotate(${i * 30}deg)`,
          }}
        />
      ))}

      {/* Hour Hand */}
      <div
        className="absolute w-1 h-6 bg-blue-400 left-1/2 top-1/2 origin-bottom transform -translate-x-1/2"
        style={{
          transform: `translate(-50%, -100%) rotate(${hourDegrees}deg)`,
        }}
      />

      {/* Minute Hand */}
      <div
        className="absolute w-0.5 h-8 bg-blue-300 left-1/2 top-1/2 origin-bottom transform -translate-x-1/2"
        style={{
          transform: `translate(-50%, -100%) rotate(${minuteDegrees}deg)`,
        }}
      />

      {/* Second Hand */}
      <div
        className="absolute w-px h-9 bg-red-400 left-1/2 top-1/2 origin-bottom transform -translate-x-1/2"
        style={{
          transform: `translate(-50%, -100%) rotate(${secondDegrees}deg)`,
        }}
      />

      {/* Center Dot */}
      <div className="absolute w-2 h-2 bg-blue-400 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  )
}

export default DigitalClock
