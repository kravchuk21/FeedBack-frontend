import {AxiosInstance,} from 'axios'
import {MessageInterface,} from '../../interfaces/messsge.interfaxe'
import {UserInterface,} from '../../interfaces/user.interface'

export const DialogApi = (instance: AxiosInstance) => ({
	async getAllDialogMessages(dialogId: string) {
		return await instance.get<MessageInterface[]>('/message/' + dialogId)
	},
	async getMate(dialogId: string) {
		return await instance.get<UserInterface>('/dialog/getMate/' + dialogId)
	},
})
