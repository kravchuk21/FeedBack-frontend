import type {NextPage,} from 'next'
import Head from 'next/head'
import styles from '../../styles/Dialog.module.css'
import React from 'react'
import {useAppDispatch,} from '../../store/hooks'
import {setDialogId, setMate,} from '../../store/reducers/dialog'
import {MessagesContainer,} from '../../containers/Messages'
import {useRouter,} from 'next/router'
import {DialogInputContainer,} from '../../containers/DialogInput'
import {Api,} from '../../services'
import {DialogHeader,} from '../../components/DialogHeader'

const Dialog: NextPage = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const dialogId = router.query.id as string

	const fetchMate = React.useCallback(async (dialogId: string) => {
		let mate = null
		if (dialogId) {
			try {
				const {data,} = await Api().dialog.getMate(dialogId)
				mate = data
			} catch {
				console.log('error')
			}
		}
		return mate
	}, [])

	React.useEffect(() => {
		if (dialogId) {
			dispatch(setDialogId(dialogId))
			fetchMate(dialogId).then(data => {
				dispatch(setMate(data))
			})
		}
	}, [dialogId, dispatch, fetchMate,])

	return (
		<div className={styles.dialog}>
			<Head>
				<title>FeedBack | Dialog</title>
			</Head>
			<DialogHeader/>
			<MessagesContainer/>
			<DialogInputContainer/>
		</div>
	)
}


export default Dialog
