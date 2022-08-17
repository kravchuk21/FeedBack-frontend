import type {GetServerSideProps, NextPage,} from 'next'
import Head from 'next/head'
import React from 'react'
import Avatar from '../../components/Avatar'
import Title from '../../components/UI/Title'
import {UserInterface,} from '../../interfaces/user.interface'
import {useAppSelector,} from '../../store/hooks'
import {selectUserId,} from '../../store/reducers/user'
import IconButton from '../../components/UI/IconButton'
import SettingsIcon from '../../../public/assets/icons/settings.svg'
import GoBack from '../../components/GoBack'
import Link from 'next/link'
import {Routes,} from '../../constants/routes'
import TextLink from '../../components/Link'
import Header from '../../layout/Header'
import Typography from '../../components/UI/Typography'
import {dateFormat,} from '../../utils/dateFormat'
import {Api,} from '../../services'

interface ProfilePageProps {
	data: UserInterface;
}

const Profile: NextPage<ProfilePageProps> = ({data,}) => {
	const userId = useAppSelector(selectUserId)
	const isMe = data._id === userId

	return (
		<div>
			<Head>
				<title>{`FeedBack | ${data.fullName}`}</title>
			</Head>
			<ProfileHeader isMe={isMe}/>

			<div className="flex flex-col items-center m-3.5">
				<div className="mb-3.5">
					<Avatar fullName={data.fullName} avatarUrl={data.avatar}/>
				</div>
				<Title textAlign="center" size={20}>{data.fullName}</Title>
				<Typography>Account created at:</Typography>
				<Typography>{dateFormat(data.createdAt)}</Typography>
				<TextLink href={`mailto:${data.email}`}>{data.email}</TextLink>
			</div>
		</div>
	)
}

const ProfileHeader: React.FC<{ isMe: boolean }> = React.memo(({isMe,}) => <Header>
	<GoBack/>
	{isMe && (
		<Link href={Routes.SETTINGS}>
			<a>
				<IconButton Icon={SettingsIcon}/>
			</a>
		</Link>
	)}
</Header>)


export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const userId = ctx.params?.profileId

	if (typeof userId === 'string') {
		const {data,} = await Api(ctx).user.getUser(userId)

		if (!data) {
			return {notFound: true,}
		} else {
			return {
				props: {data,},
			}
		}
	} else {
		return {notFound: true,}
	}
}

export default Profile
