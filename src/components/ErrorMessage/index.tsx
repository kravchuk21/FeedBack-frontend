import React from 'react';
import styles from './ErrorMessage.module.css';
import Typography from '../Typography';

export type ErrorMessage = {
	message: string | string[];
}

const ErrorMessage: React.FC<ErrorMessage> = ({message}) => {
	return <Typography className={styles.errorMessage}>{message}</Typography>
};

export default ErrorMessage;
