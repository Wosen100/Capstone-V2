import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import beneReducer from './slices/beneficiarySlice';
import donorReducer from './slices/donorSlice';
import donationReducer from './slices/donationSlice';

const reducer = combineReducers({
  bene: beneReducer,
  donor: donorReducer,
  donation: donationReducer,
});
const store = configureStore({
  reducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
