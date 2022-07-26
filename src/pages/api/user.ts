import {AxiosInstance,} from 'axios'
import {LoginResponse, ResponseData,} from './types.response'
import {UserInterface,} from '../../interfaces/user.interface'
import {CreateUserDto, GetUserDto, LoginUserDto, SearchUserDto, VerifyUserDto,} from './types.dto'

export const UserApi = (instance: AxiosInstance) => ({
	async register(dto: CreateUserDto) {
		const {data,} = await instance.post<CreateUserDto, ResponseData<{}>>('/auth/register', dto)
		return data
	},
	async login(dto: LoginUserDto) {
		const {data,} = await instance.post<LoginUserDto, ResponseData<LoginResponse>>('/auth/login', dto)
		return data
	},
	async verify(dto: VerifyUserDto) {
		const {data,} = await instance.post<LoginUserDto, ResponseData<{}>>('/auth/verify', dto)
		return data
	},
	async getNewVerificationCode(dto: Pick<VerifyUserDto, 'email'>) {
		const {data,} = await instance.post<LoginUserDto, ResponseData<{}>>('/auth/getNewVerificationCode', dto)
		return data
	},
	async getMe() {
		const {data,} = await instance.get<unknown, ResponseData<UserInterface>>('/user/me')
		return data
	},
	async search(dto: SearchUserDto) {
		const {data,} = await instance.get<unknown, ResponseData<UserInterface[]>>('/user/search/' + dto.text)
		return data
	},
	async getUser(dto: GetUserDto) {
		const {data,} = await instance.get<unknown, ResponseData<UserInterface, {}>>('/user/getById/' + dto.userId)
		return data
	},
})
