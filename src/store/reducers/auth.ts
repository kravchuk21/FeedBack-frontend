import {createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {RootState,} from '../store'
import {UserInterface,} from '../../interfaces/user.interface'
import {LoginResponse,} from '../services/AuthService'

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
})

export const selectUserEmail = (state: RootState) => state.auth.email

export const {setUserAuth, setUserVerify,} = authSlice.actions

export const authReducer = authSlice.reducer
