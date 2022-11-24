import React, { SyntheticEvent, useState, ChangeEvent } from 'react';
import { TextField, Typography, Button, Grid } from '@mui/material';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { createBeneficiary } from '../../../../app/store/slices/beneficiarySlice';
import { AppDispatch } from '../../../../app/store';

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: #d58855;
    color: white;
  }
`;

const formFields = [
  { label: 'Name', name: 'name', type: 'text' },
  { label: 'Address', name: 'address', type: 'longText' },
  { label: 'Short Description', name: 'description', type: 'text' },
  { label: 'Donation Goal', name: 'goal', type: 'number' },
  {
    label: 'Long Description',
    name: 'longDescription',
    type: 'longText',
  },
];

interface RegisterBeneficiaryProps {
  setOpen: (a: boolean) => void;
}

export default function BeneficiaryRegistrationForm({
  setOpen,
}: RegisterBeneficiaryProps) {
  const [beneficiaryObj, setBeneficiaryObj] = useState({});

  const [imageFile, setImageFile] = useState<any>();
  const [error, setError] = React.useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBeneficiaryObj({
      ...beneficiaryObj,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (element: HTMLInputElement) => {
    if (element.files) {
      setImageFile(element.files[0]);
    }
  };

  const checkObjectValue = (myObj: any) => {
    if (Object.keys(myObj).length === 5) {
      for (const key in myObj) {
        if (myObj[key].length === 0) {
          return false;
        }
      }
      return true;
    }
    setError('Plese fill out all the fields');
    return false;
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('uploadFile', imageFile);
    if (checkObjectValue(beneficiaryObj) && imageFile) {
      dispatch(
        createBeneficiary({
          imageFile: formData,
          beneficiary: beneficiaryObj,
        }),
      );
    }
  };

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h4" style={{ fontWeight: 'bold' }}>
            Please register with your details
          </Typography>
          <Typography variant="h5" sx={{ pt: 2 }}>
            You may find millions of donors who love that keeps you
            alive.
          </Typography>
          <div style={{ paddingTop: '20px' }}>
            {formFields.map((val) =>
              val.type === 'longText' ? (
                <div key={val.name} style={{ paddingBottom: '5px' }}>
                  <StyledTextField
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                    id={val.name}
                    multiline
                    rows={4}
                    fullWidth
                    label={val.label}
                    name={val.name}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div key={val.name} style={{ paddingBottom: '5px' }}>
                  <StyledTextField
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                    type={val.type === 'number' ? 'number' : 'text'}
                    fullWidth
                    label={val.label}
                    name={val.name}
                    onChange={handleChange}
                  />
                </div>
              ),
            )}

            <Typography sx={{ pt: 2 }}>
              {' '}
              Please select the profile image
            </Typography>
            <input
              type="file"
              name="image"
              onChange={(e: SyntheticEvent) =>
                handleFileUpload(e.currentTarget as HTMLInputElement)
              }
            />
            <Grid sx={{ pt: 4 }} justifyContent="flex-end" container>
              <Grid item xs={12}>
                {error && (
                  <Typography
                    style={{
                      color: 'white',
                      background: 'red',
                      display: 'initial',
                      padding: '7px',
                      borderRadius: '2px',
                    }}
                  >
                    {error}
                  </Typography>
                )}
              </Grid>
              <Button onClick={() => setOpen(false)} color="primary">
                Cancel
              </Button>
              <div style={{ width: '20px' }} />
              <Button
                onClick={handleSubmit}
                style={{ backgroundColor: 'green' }}
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
