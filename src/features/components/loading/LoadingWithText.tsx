import React from 'react';
import { Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import LoadingSpinner from '../LoadingSpinner';

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const SpinnerGridInnerDiv = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface LoadingWithTextProps {
  uppreText: string;
  lowverText: string | boolean;
}

export default function LoadingWithText({
  uppreText,
  lowverText,
}: LoadingWithTextProps) {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <SpinnerGridInnerDiv>
          <Typography
            style={{ fontSize: '30px', fontWeight: 'bold' }}
          >
            {uppreText}
          </Typography>
          <SpinnerWrapper>
            <LoadingSpinner />
          </SpinnerWrapper>

          <Typography
            style={{
              fontSize: '15px',
              marginTop: '20px',
              fontStyle: 'italic',
            }}
          >
            {lowverText}
          </Typography>
        </SpinnerGridInnerDiv>
      </Grid>
    </Grid>
  );
}
