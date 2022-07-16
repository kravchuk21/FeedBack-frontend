import Link from 'next/link';
import React from 'react';
import styles from './Avatar.module.css';
import Image from 'next/image';
import Title from '../Title';

interface Avatar {
	path: string;
	fullName: string;
	avatarUrl?: string;
	className?: string;
}

const Avatar: React.FC<Avatar> = ({path, avatarUrl, fullName, className}) => {
	return (
		<Link className={className} href={path}>
			<a title={fullName}>
				{avatarUrl &&
                    <Image className={styles.avatarBlockImage} src={avatarUrl} width={40} height={40} alt={fullName}/>}
				{!avatarUrl &&
                    <div className={styles.avatarBlock}>
                        <Title className={styles.avatarBlockText}>{fullName[0].toUpperCase()}</Title>
                    </div>
				}
			</a>
		</Link>
	);
};

export default Avatar;
