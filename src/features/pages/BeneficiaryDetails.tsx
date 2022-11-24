import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import HeaderAndFooterWrapper from '../components/HeaderAndFooterWrapper';
import { RootState } from '../../app/store';
import bgImage from '../../common/images/candel.jpg';
import DonateCard from './beneficiaryDetails/DonateCard';

const MainBgDiv = styled.div`
  background-image: url(${bgImage});
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-size: cover;
  background-repeat: no-repeat;
`;

const MainInnerDiv = styled.div`
  position: absolute;
  width: 100vw;
  overflow: scroll;
  height: 100%;
`;

const DescriptionDiv = styled.div`
  background-color: #d58855;
  color: white;
  margin-top: 30px;
  padding: 20px;
`;

const DonateCardWrapper = styled.div`
  margin-top: 10px;
`;

const BaneDetailsWrapper = styled.div`
  padding: 60px 100px;
`;

export default function BeneficiaryDetails() {
  const selectedBeneficiary = useSelector(
    (state: RootState) => state.bene.selectedBeneficiary,
  );

  const { name, image, description, donationGoal, currentDonation } =
    selectedBeneficiary!;

  return (
    <MainBgDiv>
      <MainInnerDiv>
        <HeaderAndFooterWrapper>
          <BaneDetailsWrapper>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  style={{ fontWeight: 'bold', color: 'white' }}
                  variant="h4"
                >
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <img
                  src={image}
                  style={{ width: '100%', marginTop: '10px' }}
                  alt={name}
                />
                <DescriptionDiv>
                  <Typography>{description}</Typography>
                </DescriptionDiv>
              </Grid>
              <Grid item xs={12} sm={4}>
                <DonateCardWrapper>
                  <DonateCard
                    currentDonation={currentDonation}
                    donationGoal={donationGoal}
                  />
                </DonateCardWrapper>
              </Grid>
            </Grid>
          </BaneDetailsWrapper>
        </HeaderAndFooterWrapper>
      </MainInnerDiv>
    </MainBgDiv>
  );
}
