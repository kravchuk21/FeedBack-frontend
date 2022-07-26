import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import Image from 'next/image';
import styles from './IconButton.module.css';
import {pathToIcon} from '../../constants/images';

interface IconButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	iconPath: pathToIcon;
	alt?: string;
}

const IconButton: React.FC<IconButton> = ({iconPath, alt, className, ...props}) => (
	<button {...props} className={`${styles.iconButton} ${className}`}>
		<Image className={styles.iconButtonImage} src={iconPath} width={24} height={24}
			   alt={alt ? alt : iconPath.split('/').reverse()[0]}/>
	</button>
);

export default IconButton;
