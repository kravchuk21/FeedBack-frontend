import {createAsyncThunk, createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {RootState,} from '../store'
import {UserInterface,} from '../../interfaces/user.interface'
import {deleteCookie,} from 'cookies-next'
import {LoginResponse,} from '../../services/auth/responce'

export interface AuthState {
	isAuth: boolean;
	verify: boolean;
	email: UserInterface['email'] | null;
}

const initialState: AuthState = {
	isAuth: false,
	verify: false,
	email: null,
}

export const logout = createAsyncThunk(
	'auth/logout',
	() => {
		deleteCookie('feedBackAuthToken')
	}
)


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserAuth: (state, action: PayloadAction<LoginResponse>) => {
			state.isAuth = true
			state.email = action.payload.email
			state.verify = action.payload.verify
		},
		setUserVerify: (state, action: PayloadAction<boolean>) => {
			state.verify = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(logout.fulfilled, (state) => {
			state.isAuth = false
			state.verify = false
			state.email = null
		},)
	},
})

export const selectUserEmail = (state: RootState) => state.auth.email

export const {setUserAuth, setUserVerify,} = authSlice.actions

export const authReducer = authSlice.reducer

