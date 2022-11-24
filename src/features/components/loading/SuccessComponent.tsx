import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const ThankYouWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface SuccessCompoentProps {
  text: string | boolean;
  type: string;
}

export default function SuccessComponent({
  type,
  text,
}: SuccessCompoentProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
      }}
    >
      <ThankYouWrapper>
        <Typography
          style={{ fontWeight: '700', marginBottom: '10px' }}
        >
          {' '}
          {text}
        </Typography>
        <img
          style={{ width: type === 'thankyou' ? '100%' : '25%' }}
          src={
            type === 'thankyou'
              ? 'http://localhost:5001/113967-thank-you.gif'
              : 'http://localhost:5001/91001-success.gif'
          }
          alt="loading"
        />
      </ThankYouWrapper>
    </div>
  );
}
