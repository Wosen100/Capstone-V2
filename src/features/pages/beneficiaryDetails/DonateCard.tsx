import { Button, Card, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../../../app/store';
import { clearCreateDonorLoading } from '../../../app/store/slices/donorSlice';
import LinearProgressBar from '../../components/common/LinearProgressBar';
import DonationPage from './DonationPage';
import FullScreenDialogCustom from '../../components/common/FullScreenDialogCustom';
import SocialShareButton from '../../components/common/SocialShareIcons';

interface DonateCardProps {
  currentDonation: number;
  donationGoal: number;
}

const SocialShareWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const StyledSpan = styled.span`
  color: grey;
  font-size: 15px;
  font-weight: normal;
`;

export default function DonateCard({
  currentDonation,
  donationGoal,
}: DonateCardProps) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <Card sx={{ ml: 5, p: 2 }}>
      <Typography
        sx={{ pb: 2, mt: 2 }}
        data-testid="donation_value"
        style={{
          fontWeight: '700',
          fontSize: '18px',
        }}
      >
        ${currentDonation.toLocaleString()}
        <StyledSpan>
          {' '}
          raised of ${donationGoal.toLocaleString()} goal
        </StyledSpan>
      </Typography>

      <LinearProgressBar
        value={(currentDonation / donationGoal) * 100}
      />
      <SocialShareWrapper>
        <SocialShareButton url="http://localhost:3000/" />
      </SocialShareWrapper>

      <FullScreenDialogCustom
        handleClick={() => {
          dispatch(clearCreateDonorLoading());
        }}
        title="Donate"
        open={open}
        setOpen={setOpen}
        mainLayout={<DonationPage />}
      >
        <Button
          variant="contained"
          fullWidth
          style={{
            height: '50px',
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'green',
          }}
        >
          Donate Now
        </Button>
      </FullScreenDialogCustom>
    </Card>
  );
}
