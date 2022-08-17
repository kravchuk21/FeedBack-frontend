import {AxiosInstance,} from 'axios'
import {DialogInterface,} from '../../interfaces/dialog.interface'
import {UserInterface,} from '../../interfaces/user.interface'

export const DialogsApi = (instance: AxiosInstance) => ({
	async getAllUserDialogs() {
		return await instance.get<DialogInterface[]>('/dialog')
	},
	async getMate(dialogId: string) {
		return await instance.post<UserInterface>('/dialog/getMate/' + dialogId)

	},
})
