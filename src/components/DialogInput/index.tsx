import React from 'react'
import Input from '../UI/Input'
import IconButton from '../UI/IconButton'
import styles from './DialogInput.module.css'
import SendIcon from '../../../public/assets/icons/send.svg'

const DialogInput = () => {
	return (
		<div className={styles.dialogInputBlock}>
			<Input placeholder="Type something.."/>
			<IconButton Icon={SendIcon}/>
		</div>
	)
}

export default DialogInput
