import type {NextPage,} from 'next'
import Head from 'next/head'
import Avatar from '../../components/Avatar'
import Header from '../../layout/Header'
import Bubble from '../../components/Bubble'
import styles from '../../styles/Dialog.module.css'
import DialogInput from '../../components/DialogInput'
import Title from '../../components/UI/Title'
import GoBack from '../../components/GoBack'

const Dialog: NextPage = () => {
	return (
		<div className={styles.dialog}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app"/>
				<link rel="icon" href="/public/favicon.ico"/>
			</Head>
			<Header>
				<GoBack/>
				<div className={styles.dialogHeaderInfo}>
					<Title>Vladislav Kravchuk</Title>
				</div>
				<Avatar fullName={'Vladislav Kravchuk'}
						avatarUrl={'https://images.unsplash.com/photo-1657264533870-187e6a18ac42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'}/>
			</Header>
			<div className={styles.bubbleBlock}>
				<Bubble text="Hello" isMe/>
				<Bubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam" isMe/>
				<Bubble text="How are you?" isMe={false}/>
				<Bubble text="Hello" isMe/>
				<Bubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam" isMe/>
				<Bubble text="How are you?" isMe={false}/>
				<Bubble text="Hello" isMe/>
				<Bubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam" isMe/>
				<Bubble text="How are you?" isMe={false}/>
				<Bubble text="Hello" isMe/>
				<Bubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam" isMe/>
				<Bubble text="How are you?" isMe={false}/>
				<Bubble text="Hello" isMe/>
				<Bubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam" isMe/>
				<Bubble text="How are you?" isMe={false}/>
				<Bubble text="Hello" isMe/>
				<Bubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam" isMe/>
				<Bubble text="How are you?" isMe={false}/>
			</div>
			<DialogInput/>
		</div>
	)
}

export default Dialog
