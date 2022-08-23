import type {NextPage,} from 'next'
import Head from 'next/head'
import React from 'react'
import GoBack from '../components/GoBack'
import Header from '../layout/Header'
import {Title, Typography,} from '../components/UI'

const NotFoundPage: NextPage = () => (
	<div>
		<Head>
			<title>404 | Oppps</title>
		</Head>
		<Header>
			<GoBack/>
		</Header>

		<div className="p-3 flex flex-col items-center">
			<Typography size={80} fontWeight={700}>404</Typography>
			<Title size={40}>Not found</Title>
		</div>
	</div>
)

export default NotFoundPage
