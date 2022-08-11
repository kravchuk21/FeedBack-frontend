export type LoginUserDto = {
	email: string;
	password: string;
};

export type CreateUserDto = {
	fullName: string;
} & LoginUserDto;

export type VerifyUserDto = {
	email: string;
	verificationCode: string;
};
