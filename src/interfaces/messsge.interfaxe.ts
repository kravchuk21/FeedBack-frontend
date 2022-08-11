import {TimeStems,} from '.'

export interface MessageInterface extends TimeStems {
	_id: string;
	authorId: string;
	text: string;
}
