/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FocusEvent,
  useState,
  ChangeEvent,
  useCallback,
} from 'react';
import ReactCreditCard from '@repay/react-credit-card';
import '@repay/react-credit-card/dist/react-credit-card.css';
import { Typography } from '@mui/material';

export default function CreditCardComponent() {
  const [values, setValues] = useState({
    name: '',
    number: '',
    expiration: '',
    cvc: '',
  });
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((v) => ({ ...v, [name]: value }));
    },
    [setValues],
  );

  const [focused, setFocus] = useState<any | undefined>(undefined);
  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) =>
      setFocus(e.target.name as string),
    [setFocus],
  );
  const handleBlur = useCallback(
    () => setFocus(undefined),
    [setFocus],
  );

  return (
    <form>
      <div>
        <Typography sx={{ fontWeight: 'bold', mb: 2 }}>
          Credit or debit
        </Typography>
        <fieldset
          style={{
            border: 'none',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <label htmlFor="name">Name on card</label>
          <input
            id="name"
            data-testid="nameonthcard"
            name="name"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.name}
          />
        </fieldset>
        <fieldset
          style={{
            border: 'none',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <label htmlFor="number">Card Number</label>
          <input
            id="number"
            data-testid="cardnumber"
            name="number"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.number}
          />
        </fieldset>
        <fieldset
          style={{
            border: 'none',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <label htmlFor="expiration">Expiration</label>
          <input
            id="expiration"
            data-testid="expiration"
            name="expiration"
            placeholder="MM/YY"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.expiration}
          />
        </fieldset>
        <fieldset
          style={{
            marginBottom: '20px',
            border: 'none',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <label htmlFor="cvc">CVC</label>
          <input
            id="cvc"
            data-testid="cvc"
            name="cvc"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.cvc}
          />
        </fieldset>
        <ReactCreditCard {...values} focused={focused} />
      </div>
    </form>
  );
}
