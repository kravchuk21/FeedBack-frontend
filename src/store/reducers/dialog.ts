import {createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {RootState,} from '../store'
import {DialogInterface,} from '../../interfaces/dialog.interface'

export interface DialogsState {
	data: DialogInterface[] | null;
}

const initialState: DialogsState = {
	data: null,
}

export const dialogsSlice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		setDialogs: (state, action: PayloadAction<DialogInterface[]>) => {
			state.data = action.payload
		},
	},
})

export const {setDialogs,} = dialogsSlice.actions

export const selectDialogs = (state: RootState) => state.dialog.data

export const dialogsReducer = dialogsSlice.reducer
