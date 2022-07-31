import {createAsyncThunk, createSlice,} from '@reduxjs/toolkit'
import {RootState,} from '../store'
import {UserInterface,} from '../../interfaces/user.interface'
import {Api,} from '../../pages/api'
import {LoginResponse, ResponseError,} from '../../pages/api/types.response'
import {LoadingState,} from '../types'
import {setCookie,} from 'nookies'
import {SOMETHING_WENT_WRONG,} from '../../constants/api'
import { CreateUserDto, LoginUserDto, VerifyUserDto, } from '../../pages/api/types.dto'

export interface AuthState {
	isAuth: boolean;
	verify: boolean;
	email: UserInterface['email'] | null;
	loadingState: LoadingState;
	error: string | string[];
}

const errorMessage = SOMETHING_WENT_WRONG

const initialState: AuthState = {
	isAuth: false,
	verify: false,
	email: null,
	loadingState: LoadingState.NEVER,
	error: [],
}

export const fetchLogin = createAsyncThunk<LoginResponse,
	LoginUserDto,
	{ rejectValue: ResponseError }>(
	'auth/login',
	async (dto, {rejectWithValue,}) => {
		try {
			const data = await Api().user.login(dto)

			if ('access_token' in data) {
				setCookie(null, 'feedBackAuthToken', data.access_token, {
					maxAge: 30 * 24 * 60 * 60,
					path: '/',
				})
				return data
			}

			return rejectWithValue(data)
		} catch (e: any) {
			return rejectWithValue(e.response.data)
		}
	}
)

export const fetchRegister = createAsyncThunk<{},
	CreateUserDto,
	{ rejectValue: ResponseError }>(
	'auth/register',
	async (dto, {rejectWithValue,}) => {
		try {
			await Api().user.register(dto)
		} catch (e: any) {
			return rejectWithValue(e.response.data)
		}
	}
)

export const fetchVerify = createAsyncThunk<{},
	VerifyUserDto,
	{ rejectValue: ResponseError }>(
	'auth/verify',
	async (dto, {rejectWithValue,}) => {
		try {
			await Api().user.verify(dto)
		} catch (e: any) {
			return rejectWithValue(e.response.data)
		}
	}
)

export const fetchGetNewVerify = createAsyncThunk<{},
	Pick<VerifyUserDto, 'email'>,
	{ rejectValue: ResponseError }>(
	'auth/getNewVerify',
	async (dto, {rejectWithValue,}) => {
		try {
			await Api().user.getNewVerificationCode(dto)
		} catch (e: any) {
			return rejectWithValue(e.response.data)
		}
	}
)


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// login cases
		builder.addCase(fetchLogin.pending, (state) => {
			state.loadingState = LoadingState.LOADING
			state.isAuth = false
			state.verify = false
			state.email = null
			state.error = []
		})
		builder.addCase(fetchLogin.fulfilled, (state, action) => {
			const {verify, email,} = action.payload
			state.loadingState = LoadingState.LOADED
			state.isAuth = true
			state.verify = verify
			state.email = email
		})
		builder.addCase(fetchLogin.rejected, (state, action) => {
			state.loadingState = LoadingState.ERROR
			state.isAuth = false
			state.verify = false
			state.email = null
			if (action.payload) {
				state.error = action.payload.message
			} else {
				state.error = errorMessage
			}
		})
		//	register cases
		builder.addCase(fetchRegister.pending, (state) => {
			state.loadingState = LoadingState.LOADING
			state.isAuth = false
			state.verify = false
			state.email = null
			state.error = []
		})
		builder.addCase(fetchRegister.fulfilled, (state) => {
			state.loadingState = LoadingState.LOADED
		})
		builder.addCase(fetchRegister.rejected, (state, action) => {
			state.loadingState = LoadingState.ERROR
			if (action.payload) {
				state.error = action.payload.message
			} else {
				state.error = errorMessage
			}
		})
		//	verify cases
		builder.addCase(fetchVerify.pending, (state) => {
			state.loadingState = LoadingState.LOADING
			state.error = []
		})
		builder.addCase(fetchVerify.fulfilled, (state) => {
			state.loadingState = LoadingState.LOADED
			state.verify = true
		})
		builder.addCase(fetchVerify.rejected, (state, action) => {
			state.loadingState = LoadingState.ERROR
			state.verify = false
			if (action.payload) {
				state.error = action.payload.message
			} else {
				state.error = errorMessage
			}
		})
		//	get new verify cases
		builder.addCase(fetchGetNewVerify.pending, (state) => {
			state.loadingState = LoadingState.LOADING
			state.error = []
		})
		builder.addCase(fetchGetNewVerify.fulfilled, (state) => {
			state.loadingState = LoadingState.LOADED
		})
		builder.addCase(fetchGetNewVerify.rejected, (state, action) => {
			state.loadingState = LoadingState.ERROR
			state.verify = false
			if (action.payload) {
				state.error = action.payload.message
			} else {
				state.error = errorMessage
			}
		})
	},
})


export const selectLoadingState = (state: RootState) => state.auth.loadingState
export const selectError = (state: RootState) => state.auth.error
export const selectUserEmail = (state: RootState) => state.auth.email

export const authReducer = authSlice.reducer
