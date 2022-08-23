export const lightenDarkenColor = (col: string, value: number) => {

	const num = parseInt(col.charAt(0) === '#' ? col.slice(1) : col, 16)

	const clamp = (val: number) => (val < 0 ? 0 : val > 255 ? 255 : val)

	return (
		(col.charAt(0) === '#' ? '#' : '') +
		[0, 8, 16,]
			.map((shift) => clamp(((num >> shift) & 0xff) + value) << shift)
			.reduce((a, c) => a + c, 0)
			.toString(16)
			.padStart(6, '0')
	)
}
