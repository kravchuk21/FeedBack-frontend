import {AnyAction, CombinedState, combineReducers, configureStore,} from '@reduxjs/toolkit'
import {createWrapper, HYDRATE,} from 'next-redux-wrapper'

import {userReducer,} from './reducers/user'
import {dialogsReducer,} from './reducers/dialogs'
import {dialogReducer,} from './reducers/dialog'
import {authReducer,} from './reducers/auth'

const combinedReducer = combineReducers({
	'user': userReducer,
	'auth': authReducer,
	'dialogs': dialogsReducer,
	'dialog': dialogReducer,
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

export const makeStore = () => {
	return configureStore({
		reducer: reducer,
	})
}

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper<RootStore>(makeStore, {debug: false,})

