import React, {DetailedHTMLProps, ParamHTMLAttributes} from 'react';
import styles from './Typography.module.css';

export interface Typography extends DetailedHTMLProps<ParamHTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	children: React.ReactNode;
}

const Typography: React.FC<Typography> = ({className, children, ...props}) => (
	<p className={`${styles.typography} ${className}`} {...props}>{children}</p>
);


export default Typography;
