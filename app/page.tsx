"use client"

import { useState, useEffect } from "react"
import AthleteForm from "@/components/athlete-form"
import ExerciseResults from "@/components/exercise-results"
import ResultCard from "@/components/result-card"
import { calculateAgeGroup, calculateScores } from "@/lib/calculator"
import type { Athlete, ExerciseResult, AgeGroup } from "@/lib/types"

export default function Home() {
  const [athlete, setAthlete] = useState<Athlete | null>(null)
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null)
  const [exerciseResults, setExerciseResults] = useState<ExerciseResult[]>([])
  const [totalScore, setTotalScore] = useState<number>(0)
  const [rating, setRating] = useState<string>("")
  const [isMilitaryAthlete, setIsMilitaryAthlete] = useState<boolean>(false)

  useEffect(() => {
    if (athlete) {
      const group = calculateAgeGroup(athlete.birthDate)
      setAgeGroup(group)
    }
  }, [athlete])

  useEffect(() => {
    if (ageGroup && exerciseResults.length > 0) {
    
      const validResults = exerciseResults.filter((result) => result.value !== null)

      const requiredExercises = ageGroup === 5 ? 2 : 3

      if (validResults.length >= requiredExercises) {
        const { score, overallRating, isMilitaryAthlete: isMilAthlete } = calculateScores(validResults, ageGroup)
        setTotalScore(score)
        setRating(overallRating)
        setIsMilitaryAthlete(isMilAthlete)
      }
    }
  }, [ageGroup, exerciseResults])

  const handleAthleteSubmit = (data: Athlete) => {
    setAthlete(data)
    setExerciseResults([])
    setTotalScore(0)
    setRating("")
  }

  const handleResultsSubmit = (results: ExerciseResult[]) => {
    setExerciseResults(results)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl font-bold mb-2">Military Fit Online</h1>
        <p className="text-center text-gray-600 mb-10">
          Harbiy xizmatchilar uchun jismoniy tayyorgarlik ko&apos;rsatkichlarini hisoblash dasturi
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Ma'lumotlarni kiritish</h2>
              <AthleteForm onSubmit={handleAthleteSubmit} />
            </div>

            {ageGroup && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Natijalar</h2>
                <ExerciseResults ageGroup={ageGroup} onSubmit={handleResultsSubmit} />
              </div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Natija</h2>

              {athlete && ageGroup && (
                <div className="mb-4">
                  <p className="text-sm font-medium">
                    {athlete.fullName}, {ageGroup}-yosh guruhi
                  </p>
                </div>
              )}

              {exerciseResults.length > 0 && (
                <div className="space-y-2 mb-6">
                  {exerciseResults.map(
                    (result, index) =>
                      result.value !== null && (
                        <div key={index} className="flex justify-between text-sm">
                          <span>Mashq {index + 1}</span>
                          <span className="font-medium">{result.score}</span>
                        </div>
                      ),
                  )}
                  <div className="flex justify-between pt-2 border-t font-medium">
                    <span>Jami</span>
                    <span>{totalScore}</span>
                  </div>
                </div>
              )}

              {rating && <ResultCard rating={rating} totalScore={totalScore} isMilitaryAthlete={isMilitaryAthlete} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

