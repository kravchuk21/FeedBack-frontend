import Link from 'next/link';
import React from 'react';
import Avatar from "../Avatar";
import styles from "./DialogItem.module.css";

interface DialogItem extends Omit<Avatar, 'path'> {
    _id: string;
    lastMessageText: string;
    lastMessageTime: Date;
}

const DialogItem: React.FC<DialogItem> = (props) => {
    //TODO: path to dialog
    const path = '/dialog/' + props._id
    return (
        <Link href={path}>
            <div className={styles.dialogItem} tabIndex={0}>
                <Avatar path={path} fullName={props.fullName} avatarUrl={props.avatarUrl}/>
                <div className={styles.dialogItemInfo}>
                    <h4 className={styles.dialogItemFullName}>{props.fullName}</h4>
                    <p className={styles.dialogItemLastMessageText}>{props.lastMessageText}</p>
                </div>
                <span className={styles.dialogItemLastMessageTime}>{props.lastMessageTime.getMinutes()}</span>
            </div>
        </Link>
    );
};

export default DialogItem;
