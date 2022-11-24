import React from 'react';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../app/store/index';
import DonerInformationForm from './DonerInformationForm';

describe('for the registration of beneficiary', () => {
  it('Required Input fields shoud be there', () => {
    render(
      <Provider store={store}>
        <DonerInformationForm
          isContinue={false}
          setIsConinue={() => {}}
        />
      </Provider>,
    );
    expect(screen.getAllByText('First Name').length).toBeGreaterThan(
      0,
    );
    expect(screen.getAllByText('Last Name').length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getAllByText('Email address').length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText('Postal code').length).toBeGreaterThan(
      0,
    );
  });
});
