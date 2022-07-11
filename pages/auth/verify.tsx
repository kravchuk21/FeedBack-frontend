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
				path: '/auth/login',
				text: 'Login here'
			}}>
				<Input className={styles.input} placeholder="Enter 4-symbol code" maxLength={4} type='tel'/>
				<Button text="Verify" onClick={() => console.log('verify')}/>
			</AuthLayout>
		</div>
	);
};

export default Verify;
