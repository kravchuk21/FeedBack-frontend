import {AnyAction, CombinedState, combineReducers, configureStore} from '@reduxjs/toolkit';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

import {userReducer} from './slices/user';
import {authReducer} from './slices/auth';

const combinedReducer = combineReducers({
	user: userReducer,
	auth: authReducer
});

const reducer = (state: CombinedState<ReturnType<typeof combinedReducer>> | undefined, action: AnyAction) => {
	if (action.type === HYDRATE) {
		return {
			...state,
			...action.payload,
		};
	} else {
		return combinedReducer(state, action);
	}
};

export const makeStore = () =>
	configureStore({
		reducer: reducer,
	});

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<RootStore>(makeStore, {debug: true});

