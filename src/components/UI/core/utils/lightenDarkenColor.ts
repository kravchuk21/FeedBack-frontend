export const lightenDarkenColor = (color: string, lightValue: number): string => {
	let usePound = false

	if (color[0] == '#') {
		color = color.slice(1)
		usePound = true
	}

	const num = parseInt(color, 16)

	const r = roundColorValue((num >> 16) + lightValue)
	const b = roundColorValue(((num >> 8) & 0x00FF) + lightValue)
	const g = roundColorValue((num & 0x0000FF) + lightValue)

	return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)

}

const roundColorValue = (value: number): number => {
	let roundValue: number

	if (value > 255) {
		roundValue = 255
	} else if (value < 0) {
		roundValue = 0
	} else {
		roundValue = value
	}

	return roundValue
}
