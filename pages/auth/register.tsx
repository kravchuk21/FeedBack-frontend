import type {NextPage} from 'next'
import Head from 'next/head'
import AuthLayout from '../../layout/AuthLayout'
import Button from "../../components/Button";
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import styles from "../../styles/Auth.module.css";

const Register: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Register | FeedBack</title>
                <meta name="description" content="Page of registration"/>
            </Head>

            <AuthLayout title="Sign Up" link={{
                path: '/auth/login',
                text: 'Login here'
            }}>
                <Input className={styles.input} icon='/assets/input_icons/person.svg' placeholder="Full name"/>
                <Input className={styles.input} icon='/assets/input_icons/mail.svg' placeholder="E-mail"/>
                <PasswordInput className={styles.input}/>
                <Button text="Sign Up" onClick={() => console.log("Sign Up")}/>
            </AuthLayout>
        </div>
    )
}

export default Register
