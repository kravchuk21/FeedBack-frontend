import {AxiosInstance,} from 'axios'
import {UserInterface,} from '../../interfaces/user.interface'
import {SearchUserDto,} from './dto'

export const UserApi = (instance: AxiosInstance) => ({
	async getMe() {
		return await instance.get<UserInterface>('/user/me')
	},
	async search(dto: SearchUserDto) {
		return await instance.get<UserInterface[]>('/user/search/' + dto.text)
	},
	async getUser(userId: string) {
		return await instance.get<UserInterface>('/user/getById/' + userId)
	},
})
