import type {NextPage} from 'next';
import Head from 'next/head';
import AuthLayout from '../../layout/AuthLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import React from 'react';
import styles from '../../styles/Auth.module.css';

const Verify: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Verify | FeedBack</title>
				<meta name="description" content="Page of verification"/>
			</Head>

			<AuthLayout title="Verify" link={{
				path: '/auth/register',
				linkText: 'Login here',
				text: 'Want to create an account?'
			}}>
				<Input className={styles.input} placeholder="Enter 4-symbol code" maxLength={4} type='tel' icon='/assets/input_icons/key.svg'/>
				<Button className={styles.button} text="Confirm" onClick={() => console.log('verify')}/>
				<Button className={styles.button} text="Get a new code" onClick={() => console.log('verify')}/>
			</AuthLayout>
		</div>
	);
};

export default Verify;
