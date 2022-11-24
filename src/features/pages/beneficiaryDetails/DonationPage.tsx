/*  eslint-disable  no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import LoadingWithText from '../../components/loading/LoadingWithText';
import SuccessComponent from '../../components/loading/SuccessComponent';
import { RootState } from '../../../app/store';
import DonateForm from './DonateForm';

export default function DonationPage() {
  const createDonationLoading = useSelector(
    (state: RootState) => state.donation.createDonationLoading,
  );

  return (
    <div>
      {createDonationLoading === 'idle' ? (
        <DonateForm />
      ) : createDonationLoading === 'loading' ? (
        <LoadingWithText
          uppreText="  Your donation is being sent"
          lowverText=" We value your kindness of donating to save a life."
        />
      ) : createDonationLoading === 'completed' ? (
        <SuccessComponent
          text="Your donation has been received! "
          type="thankyou"
        />
      ) : (
        <div>Error</div>
      )}
    </div>
  );
}
