import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
	email: yup.string().email('Неверная почта').required('Почта обязательная'),
	password: yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Пароль обязательный'),
});

export const RegisterFormSchema = yup
	.object()
	.shape({
		fullName: yup.string().required('Имя и фамилия обязательны'),
	})
	.concat(LoginFormSchema);

export const VerifyFormSchema = yup.object().shape({
	verificationCode: yup.string().matches(/^\d+$/).length(4, 'Код активации должен состоять из 4-х символов').required('Введите код активации'),
});
