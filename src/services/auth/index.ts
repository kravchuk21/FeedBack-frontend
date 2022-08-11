import {AxiosInstance,} from 'axios'
import {CreateUserDto, LoginUserDto, VerifyUserDto,} from './dto'
import {LoginResponse,} from './responce'

export const AuthApi = (instance: AxiosInstance) => ({
	async register(dto: CreateUserDto) {
		return await instance.post('/auth/register', dto)
	},
	async login(dto: LoginUserDto) {
		return await instance.post<LoginResponse>('/auth/login', dto)

	},
	async verify(dto: VerifyUserDto) {
		return await instance.post('/auth/verify', dto)
	},
	async getNewVerificationCode(dto: Pick<VerifyUserDto, 'email'>) {
		return await instance.post('/auth/getNewVerificationCode', dto)
	},
})
