import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../../app/store';
import {
  Beneficiary,
  selectBeneficiary,
} from '../../../../app/store/slices/beneficiarySlice';
import { clearDonationLoadingStatus } from '../../../../app/store/slices/donationSlice';
import SingleBeneficiaryCard from '../../../components/beneficiary/SingleBeneficiaryCard';

const BeneficiaryCardDiv = styled.div`
  box-shadow: rgb(0 1 10 / 5%) 0px 5px 10px;
  background: #fff;
  border-radius: 1rem;
  border: 2px solid green;
  margin-bottom: 40px;
  height: 100%;
  margin: 10px;
`;

export default function RelatedBeneficiary() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const beneficiaries = useSelector(
    (state: RootState) => state.bene.beneficiaryList,
  );

  const [relatedList, setRelatedList] =
    useState<Array<Beneficiary>>();

  const getRandomItems = (beneficiaryList: Array<Beneficiary>) => {
    return beneficiaryList[
      Math.floor(Math.random() * beneficiaryList.length)
    ];
  };

  useEffect(() => {
    let i = 0;
    const limit = 3;
    const temp = [];
    while (i < beneficiaries.length && i < limit) {
      temp.push(getRandomItems(beneficiaries));
      i += 1;
    }
    setRelatedList(temp);
  }, [beneficiaries.length, beneficiaries]);

  const handleSelect = (beneficiary: Beneficiary) => {
    dispatch(selectBeneficiary(beneficiary));
    dispatch(clearDonationLoadingStatus());
    navigate('/beneficiaries/details');
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: '20px', paddingBottom: '100px' }}
      >
        {relatedList?.map((val) => {
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
                  image={val.image}
                  address={val.address}
                  name={val.name}
                  reason={val.description}
                  currentDonation={val.currentDonation}
                  donationGoal={val.donationGoal}
                />
              </BeneficiaryCardDiv>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
