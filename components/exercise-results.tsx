"use client"

import { useState, useEffect } from "react"
import { getExercisesForAgeGroup, calculateExerciseScore } from "@/lib/calculator"
import type { AgeGroup, ExerciseResult, ExerciseType } from "@/lib/types"

interface ExerciseResultsProps {
  ageGroup: AgeGroup
  onSubmit: (results: ExerciseResult[]) => void
}

export default function ExerciseResults({ ageGroup, onSubmit }: ExerciseResultsProps) {
  const [results, setResults] = useState<ExerciseResult[]>([])

  useEffect(() => {
    const exercises = getExercisesForAgeGroup(ageGroup)
    setResults(
      exercises.map((exercise) => ({
        type: exercise,
        value: null,
        score: 0,
      })),
    )
  }, [ageGroup])

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
    <form className="space-y-4">
      {results.map((result, index) => (
        <div key={index} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor={`exercise-${index}`} className="block text-sm font-medium mb-1">
              {getExerciseName(result.type)}
            </label>
            <input
              type="number"
              id={`exercise-${index}`}
              step="0.01"
              className="w-full p-2 border rounded-md"
              value={result.value === null ? "" : result.value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ball</label>
            <div className="w-full p-2 border rounded-md bg-gray-50">{result.score}</div>
          </div>
        </div>
      ))}
    </form>
  )
}

