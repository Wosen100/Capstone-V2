import { Button, Card, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { updateWithDonate } from '../../../app/store/slices/beneficiarySlice';
import { createDonation } from '../../../app/store/slices/donationSlice';
import CreditCardComponent from './donateForm/CreditCardComponent';
import DonateValueComponent from './donateForm/DonateValueComponent';
import DonerInformationForm from './donateForm/DonerInformationForm';

const MainWrapper = styled.div`
  margin: 0px 5%;
`;

const YourInfoWrapper = styled.div`
  margin-bottom: 16px;
`;

const SpacerDiv = styled.div`
  margin-bottom: 150px;
`;

export interface DonateUpdateType {
  id: string | undefined;
  donation: number;
}

export default function DonateForm() {
  const selectedBeneficiary = useSelector(
    (state: RootState) => state.bene.selectedBeneficiary,
  );

  const dispatch = useDispatch<AppDispatch>();
  const donor = useSelector(
    (state: RootState) => state.donor.newDonor,
  );

  const { name, image } = selectedBeneficiary!;
  const [isContinue, setIsConinue] = useState(false);
  const [isContinue2, setIsConinue2] = useState(false);

  const [donateValue, setDonateValue] = useState('0');

  const handleContinue = () => {
    setIsConinue(true);
  };

  const handleDonate = () => {
    dispatch(
      createDonation({
        beneficiary: selectedBeneficiary?.id,
        donor: donor?.id,
        donationAmount: parseInt(donateValue, 10),
      }),
    );
    dispatch(
      updateWithDonate({
        id: selectedBeneficiary?.id,
        donation: parseInt(donateValue, 10),
      }),
    );
  };

  return (
    <MainWrapper>
      <Grid sx={{ pt: 10 }} container justifyContent="center">
        <Grid item container xs={6}>
          <Card sx={{ p: 3 }}>
            <DonateValueComponent
              handleContinue={handleContinue}
              name={name}
              image={image}
              isContinue={isContinue}
              isEnabled={parseInt(donateValue, 10) > 0}
              setDonateValue={setDonateValue}
            />
            {isContinue && (
              <div>
                <hr />
                <YourInfoWrapper>
                  <Typography sx={{ pt: 2, fontWeight: 'bold' }}>
                    Your information
                  </Typography>
                  <DonerInformationForm
                    isContinue={isContinue2}
                    setIsConinue={setIsConinue2}
                  />
                </YourInfoWrapper>
                {isContinue2 && (
                  <div>
                    <CreditCardComponent />
                    <Button
                      sx={{ mt: 3 }}
                      onClick={handleDonate}
                      variant="contained"
                      style={{
                        background: 'green',
                        bottom: '10px',
                      }}
                    >
                      Donate
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card sx={{ p: 2, mx: 2 }}>
            <Typography
              style={{ fontSize: '20px', fontWeight: 'bold' }}
            >
              Your donation
            </Typography>
            <Typography
              style={{ fontSize: '20px', marginTop: '10px' }}
            >
              ${donateValue}.00
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <SpacerDiv />
    </MainWrapper>
  );
}
