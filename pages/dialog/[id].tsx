import type {NextPage} from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'
import Avatar from '../../components/Avatar'
import IconButton from '../../components/IconButton'
import Header from '../../layout/Header'
import Bubble from "../../components/Bubble";
import styles from "../../styles/Dialog.module.css";
import DialogInput from "../../components/DialogInput";

const Dialog: NextPage = () => {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header>
                <IconButton onClick={() => router.back()} iconPath="/assets/icons/back.svg"/>
                <div className={styles.dialogHeaderInfo}>
                    <h3 className={styles.dialogHeaderInfoFullName}>Vladislav Kravchuk</h3>
                </div>
                    <Avatar path="/auth/register" fullName={"Vladislav Kravchuk"}
                            avatarUrl={"https://images.unsplash.com/photo-1657264533870-187e6a18ac42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}/>
            </Header>
            <div className={styles.bubbleBlock}>
                <Bubble text="Hello" isMe/>
                <Bubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam" isMe/>
                <Bubble text="How are you?" isMe={false}/>
            </div>
            <DialogInput/>
        </div>
    )
}

export default Dialog
