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
import ThemeChanger from '../../components/ThemeChanger'
import Typography from '../../components/Typography'

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
				<h1 className={styles.authLayoutTitle}>{title}</h1>
				{loadingState === LoadingState.LOADING ? <AuthLoader/> : children}
				{error[0] && <ErrorMessage message={error}/>}
				<AuthLink link={link}/>
				<ThemeChanger/>
			</div>
		</div>
	)
}

const AuthLink: React.FC<Pick<AuthLayout, 'link'>> = ({link,}) => (
	<Typography className={styles.authLayoutLink}>
		{link.text}
		<Link href={link.path}>
			<a> {link.linkText}</a>
		</Link>
	</Typography>
)


const AuthLoader = () => {
	return (
		<div className={styles.authLayoutLoader}>
			<Loading/>
		</div>
	)
}

export default AuthLayout
