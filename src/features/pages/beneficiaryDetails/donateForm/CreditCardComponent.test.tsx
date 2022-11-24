import React from 'react';
import { screen, render } from '@testing-library/react';
import CreditCardComponent from './CreditCardComponent';

describe('Input box', () => {
  it('Donation values must be with currency value', () => {
    render(<CreditCardComponent />);
    expect(screen.getByTestId('expiration').tagName).toBe('INPUT');
    expect(screen.getByTestId('cvc').tagName).toBe('INPUT');
    expect(screen.getByTestId('cardnumber').tagName).toBe('INPUT');
    expect(screen.getByTestId('nameonthcard').tagName).toBe('INPUT');
  });
});
