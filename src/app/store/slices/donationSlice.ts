import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface Donation {
  beneficiary: string | undefined;
  donor: string | undefined;
  donationAmount: number;
}

interface DonationState {
  newDonation: Donation | null;
  createDonationLoading: string;
}

interface DonationEmail {
  churchName: String | undefined;
  donateAmount: number;
  email: String | undefined;
}

const initialState: DonationState = {
  newDonation: null,
  createDonationLoading: 'idle',
};

export const createDonation = createAsyncThunk(
  'donation/create',
  async (donation: Donation) => {
    try {
      const res = await axios.post('/donation/create', donation);
      return res.data;
    } catch {
      return null;
    }
  },
);

export const sendEmail = createAsyncThunk(
  '/donate/sendEmail',
  async (dinationEmail: DonationEmail) => {
    try {
      const res = await axios.post(
        '/donate/sendEmail',
        dinationEmail,
      );
      return res.data;
    } catch {
      return null;
    }
  },
);

export const DonationSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    clearDonationLoadingStatus: (state) => {
      state.createDonationLoading = 'idle';
    },
  },
  extraReducers(builder) {
    builder.addCase(
      createDonation.fulfilled,
      (state, action: PayloadAction<Donation>) => {
        state.newDonation = action.payload;
        state.createDonationLoading = 'completed';
      },
    );

    builder.addCase(createDonation.pending, (state) => {
      state.createDonationLoading = 'loading';
    });
    builder.addCase(sendEmail.fulfilled, () => {});
  },
});

export const { clearDonationLoadingStatus } = DonationSlice.actions;

export default DonationSlice.reducer;
