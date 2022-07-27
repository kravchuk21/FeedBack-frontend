import React from 'react'
import Input from '../Input'
import IconButton from '../UI/IconButton'
import styles from './DialogInput.module.css'

const DialogInput = () => {
	return (
		<div className={styles.dialogInputBlock}>
			<Input className={styles.dialogInput} placeholder="Type something.."/>
			<IconButton iconPath="/assets/icons/send.svg" alt='send message'/>
		</div>
	)
}

export default DialogInput
