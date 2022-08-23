import React from 'react'
import styles from './Avatar.module.css'
import Image from 'next/image'
import {Title, withUITheme, WithUIThemeProps,} from '../UI'
import {getHexFromString,} from '../../utils/colors/getHexFromString'
import {lightenDarkenColor,} from '../../utils/colors/lightenDarkenColor'

export interface IAvatar {
	fullName: string;
	avatarUrl?: string | undefined;
}

const Avatar: React.FC<IAvatar & WithUIThemeProps> = ({avatarUrl, fullName, theme,}) => {
	const title = fullName[0]
		+ (fullName.split(' ')[1] ? fullName.split(' ')[1][0] : '')

	const background = lightenDarkenColor(getHexFromString(title), 70)

	return (
		<div className={styles.avatarBlock}
			 style={{background: `linear-gradient(#fff -125%, ${background})`,}}>
			{avatarUrl &&
                <Image className={styles.avatarBlockImage} src={avatarUrl} width={40} height={40} alt={fullName}/>}
			{!avatarUrl &&
                <Title size={18} fontWeight={700} color={theme.typographyLight}>{title.toUpperCase()}</Title>
			}
		</div>
	)
}

export default React.memo(withUITheme(Avatar))
