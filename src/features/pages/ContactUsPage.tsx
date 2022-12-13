/* eslint no-nested-ternary: "error" */
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../app/store';
import bgImage from '../../common/images/candel.jpg';
import HeaderAndFooterWrapper from '../components/HeaderAndFooterWrapper';
import LoadingWithText from '../components/loading/LoadingWithText';
import SuccessComponent from '../components/loading/SuccessComponent';
import ContactUsForm from './contactUs/ContactUsForm';

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
  margin-top: 0;
  top: 0;
  width: 100vw;
  overflow: scroll;
  height: 100%;
`;

const FormWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  background-color: #fcfcfca1;
  width: 60%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const ContentWrapper = styled.div`
  padding-top: 100px;
`;
export default function ContactUsPage() {
  const contactUsLoading = useSelector(
    (state: RootState) => state.contactUs.loadingStatus,
  );

  return (
    <MainBgDiv>
      <MainInnerDiv>
        <HeaderAndFooterWrapper>
          <ContentWrapper>
            <FormWrapper>
              <div>
                <h2>Contact Form</h2>
                {contactUsLoading === 'notStarted' ? (
                  <div>
                    <p>
                      Please use the form below to send us a message.
                      Be sure to provide your name, email address, and
                      a detailed message so that we can assist you as
                      quickly as possible.
                    </p>
                    <ContactUsForm />
                  </div>
                ) : contactUsLoading === 'loading' ? (
                  <LoadingWithText
                    uppreText=""
                    lowverText="Your message is being sent"
                  />
                ) : contactUsLoading === 'completed' ? (
                  <SuccessComponent
                    text="Your query has been recorded successfully"
                    type=""
                  />
                ) : (
                  <div />
                )}
              </div>
            </FormWrapper>
          </ContentWrapper>
        </HeaderAndFooterWrapper>
      </MainInnerDiv>
    </MainBgDiv>
  );
}
