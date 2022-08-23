import {TimeStems,} from '.'
import {UserInterface,} from './user.interface'

export interface MessageInterface extends TimeStems {
	_id: string;
	author: UserInterface;
	text: string;
}
