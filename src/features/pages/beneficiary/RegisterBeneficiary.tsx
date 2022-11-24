/* eslint-disable  no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import LoadingWithText from '../../components/loading/LoadingWithText';
import SuccessComponent from '../../components/loading/SuccessComponent';
import { RootState } from '../../../app/store';

import BeneficiaryRegistrationForm from './registerBeneficiary/BeneficiaryRegistrationForm';

interface RegisterBeneficiaryProps {
  setOpen: (a: boolean) => void;
}

export default function RegisterBeneficiary({
  setOpen,
}: RegisterBeneficiaryProps) {
  const createBeneLoading = useSelector(
    (state: RootState) => state.bene.createBeneLoading,
  );

  return (
    <div style={{ padding: '20px' }}>
      {createBeneLoading === 'idle' ? (
        <BeneficiaryRegistrationForm setOpen={setOpen} />
      ) : createBeneLoading === 'loading' ? (
        <LoadingWithText
          uppreText="Beneficiary is being registered!"
          lowverText={false}
        />
      ) : createBeneLoading === 'completed' ? (
        <div>
          <SuccessComponent
            text="Beneficiary is successfully registered."
            type="success"
          />
        </div>
      ) : (
        <div>Error</div>
      )}
    </div>
  );
}
