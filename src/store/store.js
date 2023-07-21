import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userReducer';
import stakeholderReducer from './stakeholderReducer';
import projectReducer from './projectReducer';

const reducers = combineReducers({
  user: userReducer,
  stakeholder: stakeholderReducer,
  project: projectReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
