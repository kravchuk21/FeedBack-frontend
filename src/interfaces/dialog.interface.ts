import { TimeStems, } from '.'
import { UserInterface, } from './user.interface'

export interface DialogInterface extends TimeStems {
	_id: string;
	author: [UserInterface];
	mate: [UserInterface];
}
