import React from 'react';
import {
  InputAdornment,
  TextField,
  Grid,
  Typography,
  Button,
} from '@mui/material';

interface DonateValueComponentProps {
  image: string;
  name: string;
  setDonateValue: (a: string) => void;
  handleContinue: () => void;
  isContinue: boolean;
  isEnabled: boolean;
}

export default function DonateValueComponent({
  image,
  setDonateValue,
  name,
  isContinue,
  handleContinue,
  isEnabled,
}: DonateValueComponentProps) {
  return (
    <div>
      <Grid item container>
        <Grid item xs={12} sm={4}>
          <img
            src={image}
            style={{ width: '100%', borderRadius: '2px' }}
            alt={name}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={12} sm={6}>
          <Typography>
            You&apos;re supporing <b>{name}</b>
          </Typography>
          <Typography
            style={{
              marginLeft: '2px',
              fontSize: '12px',
              color: 'grey',
              fontStyle: 'italic',
            }}
          >
            Your donation will be in support many.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div style={{ marginTop: '20px' }}>
          <Typography sx={{ mb: 2, fontWeight: 'bold' }}>
            Enter your donation
          </Typography>
          <TextField
            onChange={(e) => setDonateValue(e.target.value)}
            InputProps={{
              sx: {
                '& input': {
                  textAlign: 'right',
                  fontSize: '30px',
                },
              },
              startAdornment: (
                <InputAdornment position="start">
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Typography
                        style={{ fontWeight: 'bold', color: 'black' }}
                      >
                        $
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        style={{ fontWeight: 'bold', color: 'black' }}
                      >
                        {' '}
                        USD
                      </Typography>
                    </Grid>
                  </Grid>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <Typography style={{ fontSize: '30px' }}>
                    .00
                  </Typography>
                </InputAdornment>
              ),
            }}
            fullWidth
            type="number"
          />
        </div>
      </Grid>

      <Typography sx={{ mt: 2, mb: 1 }} style={{ color: 'grey' }}>
        We guarantee you a full refund for up to a year in the rare
        event that fraud occurs.
      </Typography>

      {!isContinue && (
        <Button
          disabled={!isEnabled}
          onClick={() => handleContinue()}
          variant="contained"
          style={{
            background: !isEnabled ? 'white' : 'green',
          }}
        >
          Continue
        </Button>
      )}
    </div>
  );
}
