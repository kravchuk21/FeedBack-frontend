import React from 'react';
import styles from './AuthLayout.module.css';
import Image from 'next/image';
import Link from 'next/link';
import {useAppSelector} from '../../store/hooks';
import {selectError, selectLoadingState} from '../../store/slices/auth';
import {LoadingState} from '../../store/types';
import {Routes} from '../../constants/routes';

interface AuthLayout {
	title: string;
	children: React.ReactNode;
	link: {
		text: string;
		path: Routes;
		linkText: string;
	};
}

const AuthLayout: React.FC<AuthLayout> = ({children, title, link}) => {
	const loadingState = useAppSelector(selectLoadingState);
	const error = useAppSelector(selectError);

	return (
		<div className={styles.authLayout}>
			<Image className={styles.authLayoutImage} src="/assets/auth_bg.png" width={400} height={400}
				   alt={'auth bg'}/>
			<div className={styles.authLayoutBlock}>
				<h1 className={styles.authLayoutTitle}>{title}</h1>
				{loadingState === LoadingState.LOADING ? <h1>Loading</h1> : children}
				{error[0] && <h1>{error}</h1>}
				<p className={styles.authLayoutLink}>
					{link.text}
					<Link href={link.path}>
						<a> {link.linkText}</a>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default AuthLayout;

// TODO: add optional description
// TODO: change authLayout image
// TODO: loading component
