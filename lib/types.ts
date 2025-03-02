export type AgeGroup = 1 | 2 | 3 | 4 | 5

export type ExerciseType = "sprint100m" | "run3000m" | "run1000m" | "pullUp"

export interface Athlete {
  fullName: string
  birthDate: Date
}

export interface ExerciseResult {
  type: ExerciseType
  value: number | null
  score: number
}

export type ScoreTable = {
  [key in AgeGroup]: {
    [exercise in ExerciseType]?: {
      scores: { value: number; score: number }[]
    }
  }
}

export interface ScoreRequirements {
  excellent: {
    minTotalScore: number
    minPerExercise: number
  }
  good: {
    minTotalScore: number
    minPerExercise: number
  }
  satisfactory: {
    minTotalScore: number
    minPerExercise: number
  }
  militaryAthlete: number
}

export type RatingRequirements = {
  [key in AgeGroup]: ScoreRequirements
}

