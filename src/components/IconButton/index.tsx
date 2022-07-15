import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import Image from "next/image";
import styles from "./IconButton.module.css"

interface IconButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    iconPath: string;
    alt?: string;
}

const IconButton: React.FC<IconButton> = ({iconPath, alt, className, ...props}) => {
    return (
        <button {...props} className={`${styles.iconButton} ${className}`}>
            <Image className={styles.iconButtonImage} src={iconPath} width={24} height={24} alt={alt ? alt : iconPath.split('/').reverse()[0]}/>
        </button>
    );
};

export default IconButton;
