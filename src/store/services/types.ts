export type ResponseError = {
	data: {
		statusCode: number;
		message: string | string[];
		error: string;
	}
}
