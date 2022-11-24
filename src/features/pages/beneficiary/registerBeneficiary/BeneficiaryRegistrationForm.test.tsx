import React from 'react';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import BeneficiaryRegistrationForm from './BeneficiaryRegistrationForm';
import store from '../../../../app/store/index';

describe('for the registration of beneficiary', () => {
  it('Required Input fields shoud be there', () => {
    render(
      <Provider store={store}>
        <BeneficiaryRegistrationForm setOpen={() => {}} />
      </Provider>,
    );
    expect(screen.getAllByText('Name').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Address').length).toBeGreaterThan(0);
    expect(
      screen.getAllByText('Short Description').length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText('Donation Goal').length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText('Long Description').length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText('Cancel').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Submit').length).toBeGreaterThan(0);
  });
});
