import {createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {RootState,} from '../store'
import {DialogInterface,} from '../../interfaces/dialog.interface'

export interface DialogsState {
	data: DialogInterface[];
}

const initialState: DialogsState = {
	data: [],
}

export const dialogsSlice = createSlice({
	name: 'dialogs',
	initialState,
	reducers: {
		setDialogs: (state, action: PayloadAction<DialogInterface[]>) => {
			state.data = action.payload
		},
		setDialog: (state, action: PayloadAction<DialogInterface>) => {
			state.data = upsert<DialogInterface>(state.data, action.payload, '_id')
		},
	},
})

export const upsert = <E>(array: E[], element: E, key: keyof E): E[] => {
	const i = array.findIndex(_element => _element[key] === element[key])
	if (i > -1) {
		array[i] = element
	} else {
		array.push(element)
	}
	return array
}

export const {setDialogs, setDialog,} = dialogsSlice.actions

export const selectDialog = (state: RootState, dialogId: string) => state.dialogs.data.find(d => d._id === dialogId)
export const selectDialogs = (state: RootState) => state.dialogs.data
	.slice()
	.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

export const dialogsReducer = dialogsSlice.reducer
