export default function calculateScore(studentData) {
  let { distance, income, cgpa, sem } = studentData

  income = parseInt(income)
  distance = parseInt(distance)
  cgpa = parseFloat(cgpa)

  if (!distance || !income || !cgpa || cgpa > 10) return

    try {
      const maxDistance = 300
      const maxIncome = 1500000

      const distanceScore = (distance / maxDistance) * 10
      const incomeScore = 10 - (income / maxIncome) * 10


      if (sem == 'S5' || sem == 'S7' || sem == 'S9') {
        return incomeScore * 5 + distanceScore * 3 + 2 * cgpa
      } else {
        return incomeScore * 7 + distanceScore * 3
      }
    } catch (error) {
      console.error(error)
    }
}
