import React from 'react'
import styles from './AuthLayout.module.css'
import Image from 'next/image'
import Link from 'next/link'
import {Routes,} from '../../constants/routes'
import {SOMETHING_WENT_WRONG,} from '../../constants/api'
import Loading from '../../components/loaders/Loading'
import {Title, Toast, Typography, withUITheme, WithUIThemeProps,} from '../../components/UI'

interface AuthLayout {
	title: string;
	children: React.ReactNode;
	link: {
		text: string;
		path: Routes;
		linkText: string;
	};
}

const AuthLayout: React.FC<AuthLayout & WithUIThemeProps> = ({children, title, link, theme,}) => (
	<div className={styles.authLayout}>
		<Image className={styles.authLayoutImage} src="/assets/auth_bg.jpg" width={400} height={400}
			   alt={'auth bg'}/>
		<div className={styles.authLayoutBlock}>
			<div className="mb-5 flex flex-col items-center">
				<Title fontWeight={700} size={36} color={theme.primary}>{title}</Title>
			</div>
			{children}
			<div className="mt-3.5 flex justify-center">
				<Typography>{link.text}</Typography>
				<Link href={link.path}>
					<a className="ml-1">
						<Typography color={theme.primary}>{link.linkText}</Typography>
					</a>
				</Link>
			</div>
		</div>
	</div>
)


export const AuthLoader = () => (
	<div className="flex justify-center content-center m-3.5">
		<Loading/>
	</div>
)


export type ErrorMessage = {
	message: string | string[] | undefined;
}
export const ErrorMessage: React.FC<ErrorMessage> = ({message,}) => {

	if (!message) {
		message = SOMETHING_WENT_WRONG
	}

	return <Toast type="error" message={message} delay={8000}/>
}

export default React.memo(withUITheme(AuthLayout))
