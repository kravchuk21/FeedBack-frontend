import React from 'react';
import styles from './AuthLayout.module.css'
import Image from "next/image";
import Link from "next/link";

interface AuthLayout {
    title: string;
    children: React.ReactNode;
    link: {
        text: string;
        path: string;
    };
}

const AuthLayout: React.FC<AuthLayout> = ({children, title, link}) => {
    return (
        <div className={styles.authLayout}>
            <Image className={styles.authLayoutImage} src='/assets/auth_bg.png' width={400} height={400}
                   alt={'auth bg'}/>
            <div className={styles.authLayoutBlock}>
                <h1 className={styles.authLayoutTitle}>{title}</h1>
                {children}
                <p className={styles.authLayoutLink}>Do you have a account?
                    <Link href={link.path}>
                        <a> {link.text}</a>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;
