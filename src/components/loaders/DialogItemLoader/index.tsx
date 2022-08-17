import React from 'react'
import styles from './DialogItemLoader.module.css'
import AvatarLoader from '../AvatarLoader'
import TextLoader from '../TextLoader'

const DialogItemLoader: React.FC = () => {
	return (
		<div className="flex pt-3.5 pb-3.5">
			<AvatarLoader/>
			<div className={styles.dialogItemLoaderInfo}>
				<TextLoader/>
				<TextLoader/>
			</div>
		</div>
	)
}

export default React.memo(DialogItemLoader)
