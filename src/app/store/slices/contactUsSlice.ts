import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ContactUsEmail {
  name: String;
  email: String;
  subject: String;
  message: String;
}

interface ContactusState {
  loadingStatus: String;
}

const initialState = {
  loadingStatus: 'notStarted',
} as ContactusState;

export const sendEmail = createAsyncThunk(
  '/contactUs/sendEmail',
  async (contactUsEmail: ContactUsEmail) => {
    try {
      const res = await axios.post(
        '/contactUs/sendEmail',
        contactUsEmail,
      );
      return res.data;
    } catch {
      return null;
    }
  },
);

export const ContactUsSlice = createSlice({
  name: 'contactus',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(sendEmail.pending, (state) => {
      state.loadingStatus = 'loading';
    });
    builder.addCase(sendEmail.fulfilled, (state) => {
      state.loadingStatus = 'completed';
    });
    builder.addCase(sendEmail.rejected, (state) => {
      state.loadingStatus = 'error';
    });
  },
});

export default ContactUsSlice.reducer;
