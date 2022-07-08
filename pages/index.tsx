import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import AuthLayout from "../layout/AuthLayout";
import Button from "../components/Button";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <AuthLayout title="SIGN In" link={{
                path: '/auth/register',
                text: 'Login here'
            }}>
                <h1>AuthLayout</h1>
                <Button text="hello" onClick={() => console.log(1+2)}/>
                <Button text="hello" disabled onClick={() => console.log("disabled")}/>
            </AuthLayout>
        </div>
    )
}

export default Home
