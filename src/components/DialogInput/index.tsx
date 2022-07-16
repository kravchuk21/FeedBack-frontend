import React from 'react';
import Input from '../Input';
import IconButton from '../IconButton';
import styles from './DialogInput.module.css';

const DialogInput = () => {
	return (
		<div className={styles.dialogInputBlock}>
			<Input className={styles.dialogInput} placeholder="Type something.."/>
			<IconButton className={styles.dialogInputIconButton} iconPath="/assets/icons/send.svg"/>
		</div>
	);
};

export default DialogInput;
