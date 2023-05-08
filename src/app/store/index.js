import { configureStore } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';
import createReducer from './rootReducer';

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		const newRootReducer = require('./rootReducer').default;
		store.replaceReducer(newRootReducer.createReducer());
	});
}

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
	const { createLogger } = require(`redux-logger`);
	const logger = createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error });

	middlewares.push(logger);
}

export const persistConfig = {
	key: 'root',
	storage: storage('mySlateDB'),
	// blacklist: ['auth', 'fuse', 'notificationPanel', 'i18n'],
	whitelist: ['examApp', 'auth']
};

const store = configureStore({
	reducer: persistReducer(persistConfig, createReducer()),
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false
		}).concat(middlewares),
	devTools: process.env.NODE_ENV === 'development'
});

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
	if (store.asyncReducers[key]) {
		return false;
	}
	store.asyncReducers[key] = reducer;
	store.replaceReducer(persistReducer(persistConfig, createReducer(store.asyncReducers)));
	return store;
};

export default store;
