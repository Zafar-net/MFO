import { useState } from "react"
import AthleteForm from "./components/AthleteForm"
import ExerciseResults from "./components/ExerciseResults"
import ResultCard from "./components/ResultCard"
import { calculateAgeGroup, calculateScores, getExercisesForAgeGroup } from "./utils/calculator"
import type { Athlete, ExerciseResult, AgeGroup } from "./types"

function App() {
  const [athlete, setAthlete] = useState<Athlete | null>(null)
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null)
  const [exerciseResults, setExerciseResults] = useState<ExerciseResult[]>([])
  const [totalScore, setTotalScore] = useState<number>(0)
  const [overallRating, setOverallRating] = useState<string>("")
  const [isMilitaryAthlete, setIsMilitaryAthlete] = useState<boolean>(false)

  const handleAthleteSubmit = (data: Athlete) => {
    setAthlete(data)
    const group = calculateAgeGroup(data.birthDate)
    setAgeGroup(group)
    setExerciseResults([])
    setTotalScore(0)
    setOverallRating("")
    setIsMilitaryAthlete(false)
  }

  const handleResultsSubmit = (results: ExerciseResult[]) => {
    setExerciseResults(results)
    if (ageGroup) {
      const { score, overallRating, isMilitaryAthlete } = calculateScores(results, ageGroup)
      setTotalScore(score)
      setOverallRating(overallRating)
      setIsMilitaryAthlete(isMilitaryAthlete)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">Military Fit Online</h1>
            <AthleteForm onSubmit={handleAthleteSubmit} />
            {ageGroup && (
              <ExerciseResults
                ageGroup={ageGroup}
                exercises={getExercisesForAgeGroup(ageGroup)}
                onSubmit={handleResultsSubmit}
              />
            )}
            {overallRating && (
              <ResultCard
                athleteName={athlete?.fullName || ""}
                ageGroup={ageGroup || 1}
                totalScore={totalScore}
                overallRating={overallRating}
                isMilitaryAthlete={isMilitaryAthlete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

