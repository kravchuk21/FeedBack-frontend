import React from 'react';
import styles from './ErrorMessage.module.css';

export type ErrorMessage = {
	message: string | string[];
}

const ErrorMessage: React.FC<ErrorMessage> = ({message}) => {
	return <span className={styles.errorMessage}>{message}</span>
};

export default ErrorMessage;
