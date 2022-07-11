import type {NextPage} from 'next'
import Head from 'next/head'
import AuthLayout from '../../layout/AuthLayout'
import Button from "../../components/Button";
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import styles from "../../styles/Auth.module.css";

const Login: NextPage = () => {
    return (
        <div>
            <Head>
                <title>LogIn | FeedBack</title>
                <meta name="description" content="Page of login"/>
            </Head>

            <AuthLayout title="Sign In" link={{
                path: '/auth/register',
                linkText: 'Login here',
                text: 'Want to create an account?'
            }}>
                <Input className={styles.input} icon='/assets/input_icons/mail.svg' placeholder="E-mail" type='email'/>
                <PasswordInput className={styles.input} placeholder='Password'/>
                <Button text="Sign In" onClick={() => console.log("Sign In")}/>
            </AuthLayout>
        </div>
    )
}

export default Login
