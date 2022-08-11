import type {GetServerSidePropsContext, NextPage,} from 'next'
import Head from 'next/head'
import Header from '../../layout/Header'
import styles from '../../styles/Dialog.module.css'
import DialogInput from '../../components/DialogInput'
import Title from '../../components/UI/Title'
import GoBack from '../../components/GoBack'
import Messages from '../../components/Messages'
import {MessagesAPI,} from '../../store/services/MessagesService'
import React from 'react'
import {socket,} from '../../store/services/socket'
import {useAppDispatch, useAppSelector,} from '../../store/hooks'
import {selectMate, setDialogId, setMate, setMessages,} from '../../store/reducers/dialog'
import {DialogAPI,} from '../../store/services/DialogService'
import Avatar from '../../components/Avatar'
import Link from 'next/link'
import {Routes,} from '../../constants/routes'

export interface DialogPageProps {
	dialogId: string;
}

const Dialog: NextPage<DialogPageProps> = ({dialogId,}) => {
	const [fetchAllMessages, {data, isSuccess,},] = MessagesAPI.useGetAllDialogMessagesMutation()
	const [fetchMate, {data: mate,},] = DialogAPI.useGetMateMutation()
	const dispatch = useAppDispatch()

	React.useEffect(() => {
		if (dialogId) {
			fetchAllMessages(dialogId)
			fetchMate(dialogId)
		}
	}, [dialogId, fetchAllMessages, fetchMate,])

	React.useEffect(() => {
		if (dialogId && mate) {
			dispatch(setDialogId(dialogId))
			dispatch(setMate(mate))
		}
	}, [dialogId, dispatch, mate,])

	React.useEffect(() => {
		if (dialogId) {
			socket.emit('JOIN', dialogId)
		}
		return () => {
			socket.close()
		}
	}, [dialogId,])

	React.useEffect(() => {
		if (isSuccess && data) {
			dispatch(setMessages(data))
		}
	}, [data, dispatch, isSuccess,])


	return (
		<div className={styles.dialog}>
			<Head>
				<title>FeedBack | Dialog</title>
				<link rel="icon" href="/public/favicon.ico"/>
			</Head>
			<DialogHeader/>
			<Messages/>
			<DialogInput/>
		</div>
	)
}

const DialogHeader: React.FC = React.memo(() => {
	const mate = useAppSelector(selectMate)

	return (
		<Header>
			<GoBack/>
			{mate && (
				<>
					<Title>{mate.fullName}</Title>
					<Link href={Routes.PROFILE + mate._id}>
						<a>
							<Avatar fullName={mate.fullName} avatarUrl={mate.avatar}/>
						</a>
					</Link>
				</>
			)
			}
		</Header>
	)
})

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const dialogId = context.params?.id

	if (typeof dialogId === 'string') {

		return {
			props: {dialogId,},
		}
	} else {
		return {notFound: true,}
	}
}

export default Dialog
