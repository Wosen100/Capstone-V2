import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import HeaderAndFooterWrapper from '../components/HeaderAndFooterWrapper';
import Login from './auth/Login';
import bgImage from '../../common/images/candel.jpg';

const MainHeaderWrapper = styled.div`
  padding-top: 100px;
  h1 {
    text-align: center;
    padding-bottom: 20px;
  }
`;

const FundButton = styled.button`
  background-color: green;
  color: white;
  padding: 10px;
  border-radius: 7px;
  cursor: pointer;
  border: none;
  margin-left: 20px;
  margin-top: 20px;
`;

const DescriptionDiv = styled.div`
  margin-left: 20px;
  padding: 20px;
  background-color: #d58855;
  color: white;
  padding: 20px;
`;

const MainBgDiv = styled.div`
  background-image: url(${bgImage});
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
`;

const SignUpSpan = styled.span`
  margin-top: 10px;
`;

export default function LandingPage() {
  return (
    <MainBgDiv>
      <HeaderAndFooterWrapper>
        <Grid container>
          <Grid item xs={12}>
            <MainHeaderWrapper>
              <h1>
                Welcome to <b>Asrat-Bekurat</b> <br />
                <strong> አስራት-በኩራት </strong>
              </h1>
            </MainHeaderWrapper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <DescriptionDiv>
              <Typography sx={{ fontWeight: 'bold' }}>
                {' '}
                How to use Asrat-Bekruat?
              </Typography>
              <Typography sx={{ pb: 2 }}>
                You will no longer have difficulty donating to your
                favorite church! This app is prepared to solve that
                problem and improve the donors and the beneficiary
                connnection from overseas. You can use this app two
                ways, as a donor; select your favorite church by
                clicking the &quot;beneficiary&quot; button and donate
                for their cause. The other way is to register your
                church so that other donors can easily find it and
                donate. With this app we build a bridge to connect the
                two parties easily; i.e donor and beneficiary.
                Goodluck!
              </Typography>
            </DescriptionDiv>
            <NavLink
              to="/beneficiaries"
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              <FundButton>
                Start Your Fundrasing Here! <br /> እርዳታ ማሰባሰብ ይህን ተጭነው
                ይጀምሩ{' '}
              </FundButton>{' '}
            </NavLink>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Grid
              container
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <Login />
              <SignUpSpan>
                Don&apos;t have and account?{' '}
                <Link to="/signup">
                  Sign Up <br /> አካውንት ከሌለዎት፤ እዚህ ጋር ተጭነው አካውንት ይፍጠሩ::{' '}
                </Link>
              </SignUpSpan>
            </Grid>
          </Grid>
        </Grid>
      </HeaderAndFooterWrapper>
    </MainBgDiv>
  );
}
