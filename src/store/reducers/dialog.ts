import {createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {MessageInterface,} from '../../interfaces/messsge.interfaxe'
import {UserInterface,} from '../../interfaces/user.interface'
import {RootState,} from '../store'

export interface DialogState {
	messages: MessageInterface[] | null;
	mate: UserInterface | null
	dialogId: string | null
}

const initialState: DialogState = {
	messages: null,
	mate: null,
	dialogId: null,
}

export const dialogSlice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		setMessages: (state, action: PayloadAction<MessageInterface[]>) => {
			state.messages = action.payload
		},
		setMessage: (state, action: PayloadAction<MessageInterface>) => {
			state.messages = state.messages ? [...state.messages, action.payload,] : [action.payload,]
		},
		setMate: (state, action: PayloadAction<UserInterface | null>) => {
			state.mate = action.payload
		},
		setDialogId: (state, action: PayloadAction<string>) => {
			state.dialogId = action.payload
		},
	},
})

export const {setMessages, setMessage, setMate, setDialogId,} = dialogSlice.actions

export const selectDialogId = (state: RootState) => state.dialog.dialogId
export const selectMessages = (state: RootState) => state.dialog.messages
export const selectMate = (state: RootState) => state.dialog.mate
export const selectMateId = (state: RootState) => state.dialog.mate?._id

export const dialogReducer = dialogSlice.reducer
