import React from 'react'
import {useAppSelector,} from '../../store/hooks'
import {selectMate,} from '../../store/reducers/dialog'
import Header from '../../layout/Header'
import GoBack from '../GoBack'
import Title from '../UI/Title'
import Link from 'next/link'
import {Routes,} from '../../constants/routes'
import Avatar from '../Avatar'

export const DialogHeader: React.FC = React.memo(() => {
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

// TODO: header loading
