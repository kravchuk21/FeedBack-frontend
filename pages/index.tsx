import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from "../components/Button";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Link href="/auth/login">
                <a>
                    <Button text="hello" onClick={() => console.log(1 + 2)}/>
                </a>
            </Link>
        </div>
    )
}

export default Home
