import React from 'react'
import BackIcon from '../../../public/assets/icons/back.svg'
import {useRouter,} from 'next/router'
import { IconButton, } from '../UI'

const GoBack = () => {
	const router = useRouter()

	const goBackHandler = React.useCallback(() => {
		router.back()
	}, [router,])

	return (
		<IconButton onClick={goBackHandler} Icon={BackIcon}/>
	)
}

export default React.memo(GoBack)
