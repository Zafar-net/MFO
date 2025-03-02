import { differenceInYears } from "date-fns"
import { scoreTables, ratingRequirements } from "@/lib/score-tables"
import type { AgeGroup, ExerciseType, ExerciseResult } from "@/lib/types"

export function calculateAgeGroup(birthDate: Date): AgeGroup {
  const today = new Date()
  const age = differenceInYears(today, birthDate)

  if (age <= 27) {
    return 1
  } else if (age >= 28 && age <= 32) {
    return 2
  } else if (age >= 33 && age <= 37) {
    return 3
  } else if (age >= 38 && age <= 42) {
    return 4
  } else {
    return 5
  }
}

export function getExercisesForAgeGroup(ageGroup: AgeGroup): ExerciseType[] {
  if (ageGroup === 5) {
    return ["run1000m", "pullUp"]
  } else {
    return ["sprint100m", "run3000m", "pullUp"]
  }
}

export function calculateExerciseScore(exerciseType: ExerciseType, value: number, ageGroup: AgeGroup): number {
  const exerciseTable = scoreTables[ageGroup][exerciseType]

  if (!exerciseTable) {
    return 0
  }

  let closestEntry = exerciseTable.scores[0]
  let minDifference = Math.abs(value - closestEntry.value)

  for (let i = 1; i < exerciseTable.scores.length; i++) {
    const currentEntry = exerciseTable.scores[i]
    const difference = Math.abs(value - currentEntry.value)

    if (difference < minDifference) {
      closestEntry = currentEntry
      minDifference = difference
    }
  }

  if (exerciseType === "sprint100m" || exerciseType === "run3000m" || exerciseType === "run1000m") {
    if (value <= exerciseTable.scores[exerciseTable.scores.length - 1].value) {
      return exerciseTable.scores[exerciseTable.scores.length - 1].score
    }
    if (value > exerciseTable.scores[0].value) {
      return 0
    }
  } else {
    if (value >= exerciseTable.scores[exerciseTable.scores.length - 1].value) {
      return exerciseTable.scores[exerciseTable.scores.length - 1].score
    }
    if (value < exerciseTable.scores[0].value) {
      return 0
    }
  }

  return closestEntry.score
}

export function calculateScores(
  results: ExerciseResult[],
  ageGroup: AgeGroup,
): { score: number; overallRating: string; isMilitaryAthlete: boolean } {
  const totalScore = results.reduce((sum, result) => sum + result.score, 0)
  const requirements = ratingRequirements[ageGroup]
  let overallRating = ""

  const hasMinExcellentScores = results.every((result) => result.score >= requirements.excellent.minPerExercise)
  const hasMinGoodScores = results.every((result) => result.score >= requirements.good.minPerExercise)
  const hasMinSatisfactoryScores = results.every((result) => result.score >= requirements.satisfactory.minPerExercise)

  if (totalScore >= requirements.excellent.minTotalScore && hasMinExcellentScores) {
    overallRating = "A'lo"
  } else if (totalScore >= requirements.good.minTotalScore && hasMinGoodScores) {
    overallRating = "Yaxshi"
  } else if (totalScore >= requirements.satisfactory.minTotalScore && hasMinSatisfactoryScores) {
    overallRating = "Qoniqarli"
  } else {
    overallRating = "Qoniqarsiz"
  }

  const isMilitaryAthlete = totalScore >= requirements.militaryAthlete

  return {
    score: totalScore,
    overallRating,
    isMilitaryAthlete,
  }
}

