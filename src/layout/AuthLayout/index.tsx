import React from 'react'
import styles from './AuthLayout.module.css'
import Image from 'next/image'
import Link from 'next/link'
import {useAppSelector,} from '../../store/hooks'
import {selectError, selectLoadingState,} from '../../store/slices/auth'
import {LoadingState,} from '../../store/types'
import {Routes,} from '../../constants/routes'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/loaders/Loading'
import Typography from '../../components/UI/Typography'

interface AuthLayout {
	title: string;
	children: React.ReactNode;
	link: {
		text: string;
		path: Routes;
		linkText: string;
	};
}

const AuthLayout: React.FC<AuthLayout> = ({children, title, link,}) => {
	const loadingState = useAppSelector(selectLoadingState)
	const error = useAppSelector(selectError)

	return (
		<div className={styles.authLayout}>
			<Image className={styles.authLayoutImage} src="/assets/auth_bg.jpeg" width={400} height={400}
				   alt={'auth bg'}/>
			<div className={styles.authLayoutBlock}>
				<div>
					<h1 className={styles.authLayoutTitle}>{title}</h1>
					{loadingState === LoadingState.LOADING ? <AuthLoader/> : children}
					{error[0] && <ErrorMessage message={error}/>}
				</div>
				<div className="mt-3.5 flex justify-center">
					<Typography>{link.text}</Typography>
					<Link href={link.path}>
						<a className="ml-1">
							<Typography color="var(--primary)">{link.linkText}</Typography>
						</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

const AuthLoader = () => {
	return (
		<div className={styles.authLayoutLoader}>
			<Loading/>
		</div>
	)
}

export default AuthLayout
