export interface UserInterface extends TimeStems {
	_id: string;
	fullName: string;
	email: string;
	verify: boolean;
	access_token: string;
	avatar: string | undefined;
}

export interface TimeStems {
	createdAt: Date;
	updatedAt: Date;
}
