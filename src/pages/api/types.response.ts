export type ResponseData<D, E = ResponseError> = {
	data: D | E;
}

export type ResponseError = {
	statusCode: number;
	message: string | string[];
	error: string;
}

// responses
export type LoginResponse = {
	email: string;
	verify: boolean;
	access_token: string;
}
