import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import beneReducer from './slices/beneficiarySlice';
import donorReducer from './slices/donorSlice';
import donationReducer from './slices/donationSlice';
import contactUsReducer from './slices/contactUsSlice';

const reducer = combineReducers({
  bene: beneReducer,
  donor: donorReducer,
  donation: donationReducer,
  contactUs: contactUsReducer,
});
const store = configureStore({
  reducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
