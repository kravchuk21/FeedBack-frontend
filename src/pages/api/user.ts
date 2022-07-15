import {AxiosInstance} from 'axios';
import {CreateUserDto, LoginResponse, LoginUserDto, ResponseData, VerifyUserDto} from './types';
import {UserInterface} from '../../interfaces/user.interface';

export const UserApi = (instance: AxiosInstance) => ({
	async register(dto: CreateUserDto) {
		const {data} = await instance.post<CreateUserDto, ResponseData<{}>>('/auth/register', dto);
		return data;
	},
	async login(dto: LoginUserDto) {
		const {data} = await instance.post<LoginUserDto, ResponseData<LoginResponse>>('/auth/login', dto);
		return data;
	},
	async verify(dto: VerifyUserDto) {
		const {data} = await instance.post<LoginUserDto, ResponseData<{}>>('/auth/verify', dto);
		return data;
	},
	async getNewVerificationCode(dto: Pick<VerifyUserDto, 'email'>) {
		const {data} = await instance.post<LoginUserDto, ResponseData<{}>>('/auth/getNewVerificationCode', dto);
		return data;
	},
	async getMe() {
		const { data } = await instance.get<unknown, ResponseData<UserInterface>>('/user/me');
		return data;
	},
});
