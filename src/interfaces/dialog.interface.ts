import { TimeStems, } from '.'
import { UserInterface, } from './user.interface'
import {MessageInterface,} from './messsge.interfaxe'

export interface DialogInterface extends TimeStems {
	_id: string;
	author: [UserInterface];
	mate: [UserInterface];
	lastMessage: [MessageInterface];
}
