import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { DonateUpdateType } from '../../../features/pages/beneficiaryDetails/DonateForm';

export const getBeneficiaries = createAsyncThunk(
  'beneficiary/getBeneficiaries',
  async () => {
    const res = await axios.get('/beneficiary/get');
    return res.data.beneficiaries;
  },
);

const uploadImage = async (imageFile: any) => {
  try {
    const uploadRes = await axios.post(
      '/beneficiary/upload',
      imageFile,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return uploadRes.data.status === 200
      ? uploadRes.data.filePath
      : false;
  } catch {
    return false;
  }
};

export const createBeneficiary = createAsyncThunk(
  'beneficiary/createBeneficiary',
  async (yourData: any) => {
    const { imageFile, beneficiary } = yourData;

    try {
      const imagepath = await uploadImage(imageFile);

      try {
        const createBeneficiaryResponse = await axios.post(
          '/beneficiary/add',
          {
            ...beneficiary,
            image: imagepath,
          },
        );
        return createBeneficiaryResponse.data.message.beneficiary;
      } catch {
        return null;
      }
    } catch {
      return null;
    }
  },
);

export const updateWithDonate = createAsyncThunk(
  'beneficiary/donate',
  async (params: DonateUpdateType) => {
    const { id, donation } = params;

    try {
      const beneUpdateRes = await axios.put('/beneficiary/donate', {
        id,
        donation,
      });
      return beneUpdateRes.data;
    } catch {
      return null;
    }
  },
);

export interface Beneficiary {
  id: string;
  name: string;
  description: string;
  address: string;
  image: string;
  currentDonation: number;
  donationGoal: number;
}

interface BeneState {
  beneficiaryList: Array<Beneficiary>;
  createBeneLoading: string;
  selectedBeneficiary: Beneficiary | null;
  updateBeneLoading: string;
}

const initialState = {
  beneficiaryList: [],
  createBeneLoading: 'idle',
  selectedBeneficiary: null,
  updateBeneLoading: 'idle',
} as BeneState;

export const BeneSlices = createSlice({
  name: 'beneficiary',
  initialState,
  reducers: {
    selectBeneficiary: (
      state,
      action: PayloadAction<Beneficiary>,
    ) => {
      state.selectedBeneficiary = action.payload;
    },
    clearBeneLoading: (state) => {
      state.createBeneLoading = 'idle';
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getBeneficiaries.fulfilled,
      (state, action: PayloadAction<Array<Beneficiary>>) => {
        state.beneficiaryList = action.payload;
      },
    );
    builder.addCase(createBeneficiary.pending, (state) => {
      state.createBeneLoading = 'loading';
    });
    builder.addCase(
      createBeneficiary.fulfilled,
      (state, action: PayloadAction<Beneficiary>) => {
        state.createBeneLoading = 'completed';
        state.beneficiaryList = [
          ...state.beneficiaryList,
          action.payload,
        ];
      },
    );
    builder.addCase(createBeneficiary.rejected, (state) => {
      state.createBeneLoading = 'failed';
      state.beneficiaryList = [];
    });
    builder.addCase(updateWithDonate.pending, (state) => {
      state.updateBeneLoading = 'loading';
    });
    builder.addCase(updateWithDonate.fulfilled, (state) => {
      state.updateBeneLoading = 'completed';
    });
    builder.addCase(updateWithDonate.rejected, (state) => {
      state.updateBeneLoading = 'failed';
    });
  },
});

export const { selectBeneficiary, clearBeneLoading } =
  BeneSlices.actions;

export default BeneSlices.reducer;
