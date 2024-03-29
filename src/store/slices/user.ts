import {createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {RootState,} from '../store'
import {UserInterface,} from '../../interfaces/user.interface'

export interface UserState {
	data: UserInterface | null;
}

const initialState: UserState = {
	data: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData: (state, action: PayloadAction<UserInterface>) => {
			state.data = action.payload
		},
	},
})

export const {setUserData,} = userSlice.actions

export const selectUserData = (state: RootState) => state.user.data

export const userReducer = userSlice.reducer
