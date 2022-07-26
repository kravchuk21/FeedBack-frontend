import type {NextPage,} from 'next'
import Head from 'next/head'
import React from 'react'
import Button from '../../components/Button'

const Settings: NextPage = () => {
	return (
		<div>
			<Head>
				<title>FeedBack | Settings</title>
				<meta name="description" content="Generated by create next app"/>
				<link rel="icon" href="/public/favicon.ico"/>
			</Head>
			<div className="m-3.5">
				<Button text="Log Out"/>
				<Button text="Delete account"/>
			</div>
		</div>
	)
}


export default Settings
