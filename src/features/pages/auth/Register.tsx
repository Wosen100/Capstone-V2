import React, { FormEvent, useEffect, useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bgImage from '../../../common/images/candel.jpg';

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: #d58855;
    color: white;
  }
`;

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

const SignUpSectionWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
  h1 {
    color: white;
    font-size: 40px;
  }
  button {
    cursor: pointer;
    background-color: green;
    color: white;
    padding: 10px;
    width: 100px;
    border: none;
    border-radius: 7px;
  }
`;

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [user, setUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) setUser(true);
  }, []);

  const [error, setError] = useState({
    error: false,
    message: '',
  });

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      firstName.length &&
      lastName.length &&
      email.length &&
      password.length &&
      password2.length
    ) {
      if (password !== password2) {
        setError({
          error: true,
          message: 'Both passwords should match',
        });
      } else {
        setError({
          error: false,
          message: '',
        });
      }

      const userObj = {
        firstName,
        lastName,
        email,
        password,
      };

      try {
        const req = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userObj),
        });

        const res = await req.json();
        if (res.success) {
          setError({
            error: false,
            message: res.message,
          });

          navigate('/beneficiaries');
        } else {
          setError({
            error: true,
            message: res.message,
          });
        }
      } catch {
        setError({
          error: true,
          message: 'Sometihing wrong with the server',
        });
      }
    } else {
      setError({
        error: true,
        message: 'Fill all the required fields',
      });
    }
  };
  return (
    <MainBgDiv>
      <MainInnerDiv>
        {user && <Navigate to="/beneficiaries" replace />}
        <Grid container>
          <Grid item xs={1} sm={2} md={3} lg={4} />
          <Grid item xs={10} sm={8} md={6} lg={4}>
            <SignUpSectionWrapper>
              <h1>Sign Up</h1>
              <div className="form-container">
                <form onSubmit={submitHandler}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <div>
                        <Typography style={{ color: 'white' }}>
                          Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Tempore assumenda ipsam
                          dicta sit perspiciatis dolorem nobis quia
                          dolores, ratione aut! Cumque perspiciatis
                          nesciunt inventore officia molestiae
                          dignissimos nulla iste quam.
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <StyledTextField
                        InputLabelProps={{
                          style: { color: '#fff' },
                        }}
                        fullWidth
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        label="First Name"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <StyledTextField
                        InputLabelProps={{
                          style: { color: '#fff' },
                        }}
                        fullWidth
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        label="Last Name"
                      />
                    </Grid>
                  </Grid>
                  <Grid item sx={{ pt: 1 }}>
                    <StyledTextField
                      InputLabelProps={{
                        style: { color: '#fff' },
                      }}
                      type="email"
                      fullWidth
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                    />
                  </Grid>
                  <Grid item sx={{ pt: 1 }}>
                    <StyledTextField
                      InputLabelProps={{
                        style: { color: '#fff' },
                      }}
                      type="password"
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                      label="Password"
                    />
                  </Grid>
                  <Grid item sx={{ pt: 1 }}>
                    <StyledTextField
                      InputLabelProps={{
                        style: { color: '#fff' },
                      }}
                      fullWidth
                      type="password"
                      onChange={(e) => setPassword2(e.target.value)}
                      label="Re Enter Password"
                    />
                  </Grid>
                  <Grid item sx={{ pt: 1 }}>
                    <button type="submit"> Submit</button>
                    <Typography sx={{ pt: 2 }}>
                      {error.error && (
                        <span style={{ color: 'red' }}>
                          {error.message}
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </form>
              </div>
            </SignUpSectionWrapper>
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={4} />
        </Grid>
      </MainInnerDiv>
    </MainBgDiv>
  );
}
