export function getLastUniqueExerciseIds(arr) {
	if (!arr.length) {
		return []
	}
	const seen = new Set()
	const result = []

	// Итерируем массив с конца
	for (let i = arr.length - 1; i >= 0; i--) {
		if (!seen.has(arr[i].exerciseId)) {
			result.push(arr[i])
			seen.add(arr[i].exerciseId)
		}
	}

	// Так как мы проходили с конца, разворачиваем результат обратно
	return result.reverse().map(exer => ({ [exer.exerciseId]: exer.isCompleted }))
}
