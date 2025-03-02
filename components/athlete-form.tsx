"use client"

import type React from "react"

import { useState } from "react"
import type { Athlete } from "@/lib/types"

interface AthleteFormProps {
  onSubmit: (data: Athlete) => void
}

export default function AthleteForm({ onSubmit }: AthleteFormProps) {
  const [fullName, setFullName] = useState("")
  const [birthDay, setBirthDay] = useState("")
  const [birthMonth, setBirthMonth] = useState("")
  const [birthYear, setBirthYear] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const dateString = `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`
    const birthDate = new Date(dateString)

    onSubmit({
      fullName,
      birthDate,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium mb-1">
          F.I.O.
        </label>
        <input
          type="text"
          id="fullName"
          className="w-full p-2 border rounded-md"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Tug&apos;ilgan sana</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label htmlFor="birthDay" className="block text-xs text-gray-500 mb-1">
              Kun
            </label>
            <input
              type="number"
              id="birthDay"
              min="1"
              max="31"
              className="w-full p-2 border rounded-md"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="birthMonth" className="block text-xs text-gray-500 mb-1">
              Oy
            </label>
            <input
              type="number"
              id="birthMonth"
              min="1"
              max="12"
              className="w-full p-2 border rounded-md"
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="birthYear" className="block text-xs text-gray-500 mb-1">
              Yil
            </label>
            <input
              type="number"
              id="birthYear"
              min="1950"
              max={new Date().getFullYear()}
              className="w-full p-2 border rounded-md"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Natijalarni kiritish
      </button>
    </form>
  )
}

