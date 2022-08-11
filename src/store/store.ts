import {AnyAction, CombinedState, combineReducers, configureStore,} from '@reduxjs/toolkit'
import {Context, createWrapper, HYDRATE,} from 'next-redux-wrapper'

import {userReducer,} from './reducers/user'
import {authReducer,} from './reducers/auth'
import {AuthAPI,} from './services/AuthService'
import {UserAPI,} from './services/UserService'
import {DialogAPI,} from './services/DialogService'
import {dialogsReducer,} from './reducers/dialogs'
import {MessagesAPI,} from './services/MessagesService'
import { dialogReducer, } from './reducers/dialog'

const combinedReducer = combineReducers({
	'user': userReducer,
	'auth': authReducer,
	'dialogs': dialogsReducer,
	'dialog': dialogReducer,
	[AuthAPI.reducerPath]: AuthAPI.reducer,
	[UserAPI.reducerPath]: UserAPI.reducer,
	[DialogAPI.reducerPath]: DialogAPI.reducer,
	[MessagesAPI.reducerPath]: MessagesAPI.reducer,
})

const reducer = (state: CombinedState<ReturnType<typeof combinedReducer>> | undefined, action: AnyAction) => {
	if (action.type === HYDRATE) {
		return {
			...state,
			...action.payload,
		}
	} else {
		return combinedReducer(state, action)
	}
}

export const makeStore = (ctx: Context) => {
	return configureStore({
		reducer: reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: ctx,
				},
			})
				.concat(
					AuthAPI.middleware,
					UserAPI.middleware,
					DialogAPI.middleware,
					MessagesAPI.middleware,
				),
	})
}

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper<RootStore>(makeStore, {debug: false,})

