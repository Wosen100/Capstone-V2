import React, { useState } from 'react';
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import ErrorMessageDisplay from '../../components/contactUs/ErrorMessage';
import { AppDispatch } from '../../../app/store';
import { sendEmail } from '../../../app/store/slices/contactUsSlice';

interface FormValues {
  name: string;
  subject: string;
  email: string;
  message: string;
}

const contactUsFormSchema = yup.object().shape({
  name: yup.string().required('Please enter your name'),
  subject: yup.string().required('Please enter a subject'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  message: yup.string().required('Please enter a message'),
});

export default function ContactUsForm() {
  const [errorList, setErrorList] = useState([]);

  const dispatch = useDispatch<AppDispatch>();

  const [formState, setFormState] = useState<FormValues>({
    name: '',
    subject: '',
    email: '',
    message: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    contactUsFormSchema
      .validate(formState, { abortEarly: false })
      .then(() => {
        dispatch(
          sendEmail({
            ...formState,
          }),
        );

        // Form is valid, do something with the data here
        // For example, submit the form data to your server
      })
      .catch((errors) => {
        // Form is invalid, display errors to the user
        // const errorMessages = errors.inner.map(
        //   (error: any) => error.message,
        // );
        setErrorList(errors.inner);
        // alert(errorMessages.join('\n'));
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        sx={{ paddingTop: '10px' }}
        label="Name"
        name="name"
        fullWidth
        value={formState.name}
        onChange={handleChange}
      />
      <ErrorMessageDisplay errorMessages={errorList} path="name" />

      <TextField
        sx={{ paddingTop: '10px' }}
        label="Subject"
        name="subject"
        fullWidth
        value={formState.subject}
        onChange={handleChange}
      />
      <ErrorMessageDisplay errorMessages={errorList} path="subject" />

      <TextField
        sx={{ paddingTop: '10px' }}
        label="Email"
        name="email"
        fullWidth
        value={formState.email}
        onChange={handleChange}
      />

      <ErrorMessageDisplay errorMessages={errorList} path="email" />

      <TextField
        sx={{ paddingTop: '10px' }}
        label="Message"
        name="message"
        fullWidth
        value={formState.message}
        onChange={handleChange}
        multiline
        rows={4}
      />
      <ErrorMessageDisplay errorMessages={errorList} path="message" />
      <div style={{ marginTop: '10px' }}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
}
