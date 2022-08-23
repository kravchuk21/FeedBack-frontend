import type {GetServerSideProps, NextPage,} from 'next'
import Head from 'next/head'
import React from 'react'
import Avatar from '../../components/Avatar'
import {UserInterface,} from '../../interfaces/user.interface'
import {useAppSelector,} from '../../store/hooks'
import {selectUserId,} from '../../store/reducers/user'
import SettingsIcon from '../../../public/assets/icons/settings.svg'
import GoBack from '../../components/GoBack'
import Link from 'next/link'
import {Routes,} from '../../constants/routes'
import TextLink from '../../components/Link'
import Header from '../../layout/Header'
import {dateFormat,} from '../../utils/dateFormat'
import {Api,} from '../../services'
import {Button, IconButton, Title, Typography,} from '../../components/UI'
import {useRouter,} from 'next/router'
import {socket,} from '../../store/socket'
import CreateDialogPopup from '../../components/CreateDialogPopup'

interface ProfilePageProps {
	data: UserInterface;
}

const Profile: NextPage<ProfilePageProps> = ({data,}) => {
	const userId = useAppSelector(selectUserId)
	const isMe = data._id === userId
	const router = useRouter()

	const [loading, setLoading,] = React.useState(true)
	const [dialogId, setDialogId,] = React.useState<string | null>(null)

	const fetchDialog = React.useCallback(async () => {
		try {
			const {data: dialogId,} = await Api().dialogs.getByUser(data._id)
			return dialogId
		} catch {
			return null
		}
	}, [data,])


	React.useEffect(() => {
		if (!isMe) {
			fetchDialog().then(r => {
				setDialogId(r)
				setLoading(false)
			})
		}
	}, [fetchDialog, isMe,])

	const handleClickGoToDialog = () => {
		return router.push(Routes.DIALOG + dialogId)
	}

	React.useEffect(() => {
		socket.on('DIALOG:UPDATED', (e) => {
			return router.push(Routes.DIALOG + e._id)
		})
	}, [router,])

	return (
		<div>
			<Head>
				<title>{`FeedBack | ${data.fullName}`}</title>
			</Head>
			<ProfileHeader isMe={isMe}/>

			<div className="flex flex-col items-center m-3.5">
				<div className="mb-3.5 scale-150">
					<Avatar fullName={data.fullName} avatarUrl={data.avatar}/>
				</div>
				<Title textAlign="center" size={20}>{data.fullName}</Title>
				<TextLink href={`mailto:${data.email}`}>{data.email}</TextLink>
				<Typography>Account created at:</Typography>
				<Typography>{dateFormat(data.createdAt)}</Typography>
				{!isMe && !loading && (
					<div className="m-3">
						{dialogId && <Button onClick={handleClickGoToDialog}>Go to dialog</Button>}
						{!dialogId && <CreateDialogPopup mateId={data._id}/>}
					</div>
				)}
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
	const userId: string = ctx.params?.profileId as string


	if (userId) {
		try {
			const {data,} = await Api(ctx).user.getUser(userId)

			if (data) {
				return {props: {data,},}
			}

			return {notFound: true,}
		} catch {
			return {notFound: true,}
		}
	}

	return {notFound: true,}

}

export default Profile
