import React from 'react'
import styles from './DialogItemLoader.module.css'

const DialogItemLoader = () => {
	return (
		<div className={styles.dialogItemLoader}>
			<div className={styles.dialogItemLoaderAvatar}/>
			<div className={styles.dialogItemLoaderInfo}>
				<div className={styles.dialogItemLoaderLine}/>
				<div className={styles.dialogItemLoaderLine}/>
			</div>
		</div>
	)
}

export default DialogItemLoader
