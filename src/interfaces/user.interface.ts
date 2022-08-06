import { TimeStems, } from '.'

export interface UserInterface extends TimeStems {
	_id: string;
	fullName: string;
	email: string;
	verify: boolean;
	access_token: string;
	avatar: string | undefined;
}
