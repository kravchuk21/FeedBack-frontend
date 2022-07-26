import React from 'react';
import styles from './Title.module.css';

interface Title {
	children: string;
	className?: string;
}

const Title: React.FC<Title> = ({children, className, ...props}) => {
	return (
		<h1 className={`${styles.title} ${className}`} {...props}>{children}</h1>
	);
};

export default Title;
