import type {NextPage,} from 'next'
import Head from 'next/head'
import React from 'react'
import ThemeChanger from '../../components/ThemeChanger'
import GoBack from '../../components/GoBack'
import Header from '../../layout/Header'
import {useAppDispatch,} from '../../store/hooks'
import {logout,} from '../../store/reducers/auth'
import {useRouter,} from 'next/router'
import {Button,} from '../../components/UI'

const Settings: NextPage = () => {
	const dispatch = useAppDispatch()
	const route = useRouter()

	const handleLogout = async () => {
		await dispatch(logout())
		route.reload()
	}

	return (
		<div>
			<Head>
				<title>FeedBack | Settings</title>
			</Head>
			<Header>
				<GoBack/>
				<ThemeChanger/>
			</Header>

			<div className="m-3.5">
				<Button onClick={handleLogout}>Log out</Button>
			</div>
		</div>
	)
}

export default Settings
