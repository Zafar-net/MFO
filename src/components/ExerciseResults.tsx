"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { AgeGroup, ExerciseType, ExerciseResult } from "../types"
import { calculateExerciseScore } from "../utils/calculator"

interface ExerciseResultsProps {
  ageGroup: AgeGroup
  exercises: ExerciseType[]
  onSubmit: (results: ExerciseResult[]) => void
}

const ExerciseResults: React.FC<ExerciseResultsProps> = ({ ageGroup, exercises, onSubmit }) => {
  const [results, setResults] = useState<ExerciseResult[]>([])

  useEffect(() => {
    setResults(
      exercises.map((exercise) => ({
        type: exercise,
        value: null,
        score: 0,
      })),
    )
  }, [exercises])

  const handleChange = (index: number, value: string) => {
    const numValue = value === "" ? null : Number.parseFloat(value)

    const updatedResults = [...results]
    updatedResults[index] = {
      ...updatedResults[index],
      value: numValue,
      score: numValue !== null ? calculateExerciseScore(updatedResults[index].type, numValue, ageGroup) : 0,
    }

    setResults(updatedResults)
    onSubmit(updatedResults)
  }

  const getExerciseName = (type: ExerciseType) => {
    switch (type) {
      case "sprint100m":
        return "100m yugurish (sekund)"
      case "run3000m":
        return "3000m yugurish (minut)"
      case "run1000m":
        return "1000m yugurish (minut)"
      case "pullUp":
        return "Turnikda tortilish (marta)"
      default:
        return "Mashq"
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Mashq natijalari</h2>
      {results.map((result, index) => (
        <div key={index} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor={`exercise-${index}`} className="block text-sm font-medium text-gray-700">
              {getExerciseName(result.type)}
            </label>
            <input
              type="number"
              id={`exercise-${index}`}
              step="0.01"
              value={result.value === null ? "" : result.value}
              onChange={(e) => handleChange(index, e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ball</label>
            <div className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm sm:text-sm">
              {result.score}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExerciseResults

