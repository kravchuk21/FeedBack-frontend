export type ResponseData<D> = {
	data: D | ResponseError;
}

export type ResponseError = {
	statusCode: number;
	message: string | string[];
	error: string;
}

// DTOs
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

// responses
export type LoginResponse = {
	email: string;
	verify: boolean;
	access_token: string;
}
