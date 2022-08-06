import React from 'react'
import styles from './Avatar.module.css'
import Image from 'next/image'
import Title from '../UI/Title'
import {withUITheme,} from '../UI/core/withThemeHOC'
import {WithUIThemeProps,} from '../UI/@types/Theme'

interface Avatar extends WithUIThemeProps {
	fullName: string;
	avatarUrl?: string;
}

const Avatar: React.FC<Avatar> = ({avatarUrl, fullName, theme,}) => {
	return (
		<div className={styles.avatarBlock} style={{background: theme.primary,}}>
			{avatarUrl &&
                <Image className={styles.avatarBlockImage} src={avatarUrl} width={40} height={40} alt={fullName}/>}
			{!avatarUrl &&
                <Title size={20} color={theme.typographyLight}>{fullName[0].toUpperCase()}</Title>
			}
		</div>
	)
}

export default withUITheme(React.memo(Avatar))
