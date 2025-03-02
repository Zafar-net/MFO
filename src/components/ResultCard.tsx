import type React from "react"
import type { AgeGroup } from "../types"

interface ResultCardProps {
  athleteName: string
  ageGroup: AgeGroup
  totalScore: number
  overallRating: string
  isMilitaryAthlete: boolean
}

const ResultCard: React.FC<ResultCardProps> = ({
  athleteName,
  ageGroup,
  totalScore,
  overallRating,
  isMilitaryAthlete,
}) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "A'lo":
        return "bg-green-100 text-green-800"
      case "Yaxshi":
        return "bg-blue-100 text-blue-800"
      case "Qoniqarli":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Natija</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {athleteName}, {ageGroup}-yosh guruhi
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Umumiy ball</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{totalScore}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Baho</dt>
            <dd
              className={`mt-1 text-sm font-semibold sm:mt-0 sm:col-span-2 ${getRatingColor(overallRating)} inline-block py-1 px-2 rounded-full`}
            >
              {overallRating}
            </dd>
          </div>
          {isMilitaryAthlete && (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Qo'shimcha</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                "HARBIY SPORTCHI" ko'krak nishoni bilan taqdirlash huquqiga ega
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}

export default ResultCard

