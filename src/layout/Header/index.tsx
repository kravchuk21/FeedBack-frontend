import React from 'react'
import styles from './Header.module.css'

interface Header {
    children: React.ReactNode
}

const Header: React.FC<Header> = ({children,}) => {
    return (
        <header className={styles.header}>
            {children}
        </header>
    )
}

export default Header
