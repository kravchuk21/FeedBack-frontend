export interface UserInterface extends TimeStems {
	_id: string;
	fullName: string;
	email: string;
	verify: boolean;
	access_token: string;
}

export interface TimeStems {
	createdAt: Date;
	updatedAt: Date;
}
