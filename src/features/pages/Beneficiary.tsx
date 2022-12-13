import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Beneficiary as BeneficiaryModel,
  clearBeneLoading,
  getBeneficiaries,
  selectBeneficiary,
} from '../../app/store/slices/beneficiarySlice';
import { AppDispatch, RootState } from '../../app/store';
import HeaderAndFooterWrapper from '../components/HeaderAndFooterWrapper';
import SingleBeneficiaryCard from '../components/beneficiary/SingleBeneficiaryCard';
import FullScreenDialogCustom from '../components/common/FullScreenDialogCustom';
import RegisterBeneficiary from './beneficiary/RegisterBeneficiary';
import { clearDonationLoadingStatus } from '../../app/store/slices/donationSlice';
import bgImage from '../../common/images/candel.jpg';

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

const BeneficiaryCardDiv = styled.div`
  box-shadow: rgb(0 1 10 / 5%) 0px 5px 10px;
  background: #fff;
  border-radius: 1rem;
  border: 2px solid green;
  margin-bottom: 40px;
  height: 100%;
  margin: 10px;
`;

export default function Beneficiary() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const beneficiaryList = useSelector(
    (state: RootState) => state.bene.beneficiaryList,
  );

  const handleOpen = (openValue: boolean) => {
    setOpen(openValue);
    dispatch(clearBeneLoading());
  };

  useEffect(() => {
    dispatch(getBeneficiaries());
  }, [dispatch]);

  const handleSelect = (beneficiary: BeneficiaryModel) => {
    dispatch(selectBeneficiary(beneficiary));
    dispatch(clearDonationLoadingStatus());
    navigate('/beneficiaries/details');
  };

  return (
    <MainBgDiv>
      <MainInnerDiv>
        <HeaderAndFooterWrapper>
          <>
            <Grid container>
              <Grid item xs={10}>
                <Typography> Beneficiary </Typography>
              </Grid>
              <Grid item xs={2}>
                <FullScreenDialogCustom
                  handleClick={() => {}}
                  open={open}
                  setOpen={handleOpen}
                  title="Register New Beneficiary"
                  mainLayout={
                    <RegisterBeneficiary setOpen={setOpen} />
                  }
                >
                  <Button
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                    }}
                  >
                    {' '}
                    Register{' '}
                  </Button>
                </FullScreenDialogCustom>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              justifyContent="center"
              style={{ marginTop: '20px', paddingBottom: '100px' }}
            >
              {beneficiaryList.length &&
                beneficiaryList.map((val: BeneficiaryModel) => {
                  const {
                    name,
                    description,
                    address,
                    image,
                    currentDonation,
                    donationGoal,
                  } = val;
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={val.id}
                      onClick={() => handleSelect(val)}
                    >
                      <BeneficiaryCardDiv>
                        <SingleBeneficiaryCard
                          name={name}
                          reason={description}
                          address={address}
                          image={image}
                          currentDonation={currentDonation}
                          donationGoal={donationGoal}
                        />
                      </BeneficiaryCardDiv>
                    </Grid>
                  );
                })}
            </Grid>
          </>
        </HeaderAndFooterWrapper>
      </MainInnerDiv>
    </MainBgDiv>
  );
}
