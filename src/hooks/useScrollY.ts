import React from 'react'


export const useScrollY = (): number => {
	const isBrowser = typeof window !== 'undefined'

	const [scrollY, setScrollY,] = React.useState(0)

	const handleScroll = React.useCallback(() => {
		const currentScrollY = isBrowser ? window.scrollY : 0
		setScrollY(currentScrollY)
	}, [isBrowser,])

	React.useEffect(() => {
		window.addEventListener('scroll', handleScroll, {passive: true,})
		return () => window.removeEventListener('scroll', handleScroll)
	}, [handleScroll,])

	return scrollY
}
