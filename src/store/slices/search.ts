import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {ResponseError} from '../../pages/api/types.response';
import {Api} from '../../pages/api';
import {SearchUserDto} from '../../pages/api/types.dto';
import {LoadingState} from '../types';
import {UserInterface} from '../../interfaces/user.interface';

export interface UserState {
	data: UserInterface[] | null;
	loadingState: LoadingState;
}

const initialState: UserState = {
	data: null,
	loadingState: LoadingState.NEVER
};

export const fetchSearchUser = createAsyncThunk<UserInterface[],
	SearchUserDto,
	{ rejectValue: ResponseError }>(
	'search/fetchSearchUser',
// @ts-ignore
	async (dto, {rejectWithValue}) => {
		try {
			const data = await Api().user.search(dto);

			if ((data as UserInterface[]).length >= 0) {
				return data;
			}

			// @ts-ignore
			return rejectWithValue(data);
		} catch (e: any) {
			return rejectWithValue(e.response.data);
		}
	}
);


export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSearchUser.pending, (state) => {
			state.loadingState = LoadingState.LOADING;
		});
		builder.addCase(fetchSearchUser.fulfilled, (state, action) => {
			state.loadingState = LoadingState.LOADED;
			state.data = action.payload;
		});
		builder.addCase(fetchSearchUser.rejected, (state) => {
			state.loadingState = LoadingState.ERROR;
			state.data = null;
		});
	}
});


export const selectSearchData = (state: RootState) => state.search.data;
export const selectSearchLoadingState = (state: RootState) => state.search.loadingState;

export const searchReducer = searchSlice.reducer;
