import React, { FormEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

const FormWrapper = styled.div`
  h3 {
    text-align: center;
  }
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.75em;
  }
  input {
    padding: 15px;
    width: 90%;
    background-color: #d58855;
    color: white;
    border: none;
    ::placeholder {
      color: white;
    }
  }
  button {
    padding: 12px 24px;
    background: yellow;
    font-size: 16px;
    font-weight: 600;
    border: 1px solid black;
    border-radius: 12px;
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) setUser(true);
  }, []);

  const [error, setError] = useState({
    error: false,
    message: '',
  });

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({
      error: false,
      message: '',
    });
    const userObj = {
      email,
      password,
    };

    try {
      const req = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObj),
      });

      const res = await req.json();
      if (res.success) {
        localStorage.setItem('token', res.token);

        setUser(true);
      } else {
        setError({
          error: true,
          message: res.message,
        });
        return;
      }
    } catch {
      setError({
        error: true,
        message: 'server error',
      });
    }
  };

  return (
    <div>
      <FormWrapper className="form-container">
        {user && <Navigate to="/beneficiaries" replace />}
        <form onSubmit={submitHandler}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {error.error && (
            <span
              style={{
                color: 'red',
                background: 'white',
                padding: '10px',
              }}
            >
              {error.message}
            </span>
          )}
          <button
            type="submit"
            style={{ backgroundColor: 'green', color: 'white' }}
          >
            Sign In <br /> ወደ አካውንትዎ በዚህ ይግቡ{' '}
          </button>
        </form>
      </FormWrapper>
    </div>
  );
}
