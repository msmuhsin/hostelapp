export default function calculateScore(studentData) {
  let { Distance, Income, CGPA, Sem } = studentData

  Income = parseInt(Income)
  Distance = parseInt(Distance)
  CGPA = parseFloat(CGPA)

  if (!Distance || !Income || !CGPA || CGPA > 10) return

  try {
    const maxDistance = 300
    const maxIncome = 1500000

    const distanceScore = (Distance / maxDistance) * 10
    const incomeScore = 10 - (Income / maxIncome) * 10

    if (Sem == 'S5' || Sem == 'S7' || Sem == 'S9') {
      return incomeScore * 5 + distanceScore * 3 + 2 * CGPA
    } else {
      return incomeScore * 7 + distanceScore * 3
    }
  } catch (error) {
    console.error(error)
  }
}
