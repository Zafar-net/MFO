interface ResultCardProps {
  rating: string
  totalScore: number
  isMilitaryAthlete: boolean
}

export default function ResultCard({ rating, totalScore, isMilitaryAthlete }: ResultCardProps) {
  return (
    <div className="space-y-4">
      <div
        className={`p-4 rounded-md text-center font-medium ${
          rating === "Alo"
            ? "bg-green-100 text-green-800"
            : rating === "Yaxshi"
              ? "bg-blue-100 text-blue-800"
              : rating === "Qoniqarli"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
        }`}
      >
        <span className="text-lg">{rating || "Baholanmadi"}</span>
        <span className="block text-sm mt-1">Jami: {totalScore} ball</span>
      </div>

      {isMilitaryAthlete && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-center">
          <p className="text-blue-800 font-medium">"HARBIY SPORTCHI" ko'krak nishoni bilan taqdirlash huquqiga ega</p>
        </div>
      )}
    </div>
  )
}

