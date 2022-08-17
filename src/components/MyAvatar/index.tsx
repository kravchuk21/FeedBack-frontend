import React from 'react'
import {useAppSelector,} from '../../store/hooks'
import {selectUserData,} from '../../store/reducers/user'
import Link from 'next/link'
import {Routes,} from '../../constants/routes'
import Avatar from '../Avatar'

const MyAvatar: React.FC = () => {
	const user = useAppSelector(selectUserData)

	if (!user) {
		return null
	}

	return (
		<Link href={Routes.PROFILE + user._id}>
			<a>
				<Avatar fullName={user.fullName}
						avatarUrl={user?.avatar}/>
			</a>
		</Link>
	)
}

export default MyAvatar
