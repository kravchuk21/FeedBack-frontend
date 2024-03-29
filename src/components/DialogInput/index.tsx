import React from 'react'
import Input from '../UI/Input'
import IconButton from '../UI/IconButton'
import styles from './DialogInput.module.css'

const DialogInput = () => {
	return (
		<div className={styles.dialogInputBlock}>
			<Input placeholder="Type something.."/>
			<IconButton iconPath="/assets/icons/send.svg" alt='send message'/>
		</div>
	)
}

export default DialogInput
