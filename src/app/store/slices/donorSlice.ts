import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

export interface Donor {
  id: string;
  fname: string;
  lName: string;
  email: string;
  postalCode: string;
  country: string;
}

interface DonorState {
  newDonor: Donor | null;
  createDonorLoading: string;
}

const initialState: DonorState = {
  newDonor: null,
  createDonorLoading: 'idle',
};

export const createNewDonor = createAsyncThunk(
  'donor/create',
  async (donor: Donor) => {
    try {
      const res = await axios.post('/donor/add', donor);
      return res.data.message.donor;
    } catch {
      return null;
    }
  },
);

export const DonorSlice = createSlice({
  name: 'donor',
  initialState,
  reducers: {
    clearCreateDonorLoading: (state) => {
      state.createDonorLoading = 'idle';
    },
  },
  extraReducers(builder) {
    builder.addCase(
      createNewDonor.fulfilled,
      (state, action: PayloadAction<Donor>) => {
        state.newDonor = action.payload;
        state.createDonorLoading = 'completed';
      },
    );
    builder.addCase(createNewDonor.pending, (state) => {
      state.createDonorLoading = 'loading';
    });
    builder.addCase(createNewDonor.rejected, (state) => {
      state.createDonorLoading = 'failed';
    });
  },
});

export const { clearCreateDonorLoading } = DonorSlice.actions;

export default DonorSlice.reducer;
