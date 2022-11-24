import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import DonateCard from './DonateCard';
import store from '../../../app/store';

describe('Donation values', () => {
  it('Donation values must be with currency value', () => {
    render(
      <Provider store={store}>
        <DonateCard currentDonation={10} donationGoal={100} />
      </Provider>,
    );
    expect(screen.getByTestId('donation_value').textContent).toBe(
      '$10 raised of $100 goal',
    );
  });
});
