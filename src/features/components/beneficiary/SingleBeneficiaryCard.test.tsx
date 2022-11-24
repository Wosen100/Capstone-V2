import React from 'react';
import { render, screen } from '@testing-library/react';
import SingleBeneficiaryCard from './SingleBeneficiaryCard';

describe('When renderd with the name, address and reason prop', () => {
  it('should be paste it into the typography', () => {
    render(
      <SingleBeneficiaryCard
        image=""
        address="address"
        name="name"
        reason="reason"
        currentDonation={0}
        donationGoal={0}
      />,
    );
    expect(screen.getByText(/address/)).toBeInTheDocument();
    expect(screen.getByText(/name/)).toBeInTheDocument();
    expect(screen.getByText(/reason/)).toBeInTheDocument();
  });
});

describe('When long name', () => {
  it('should be substring to 35 char', () => {
    render(
      <SingleBeneficiaryCard
        image=""
        address="address"
        name="This is a long name that have more than 35 chars in it, actually 67"
        reason="reason"
        currentDonation={0}
        donationGoal={0}
      />,
    );
    expect(screen.getByTestId('name_value').textContent).toBe(
      'This is a long name that have more ...',
    );
  });
});

describe('When long description', () => {
  it('should be substring to 430 char', () => {
    render(
      <SingleBeneficiaryCard
        image=""
        address="address"
        name="name"
        reason={
          "This is a long description that has more than 430 chars in it. really I'm trying to type something that have more than 430 chars. I don't know what to type but I'm typing about the problem that I'm facing at the moment. it's 237 for now. I have to write more like I've typed so far. this is for testing description about the beneficiary description. there may be more letters in the description if the char value is so long we gonna split them when it reached to 430."
        }
        currentDonation={0}
        donationGoal={0}
      />,
    );
    expect(screen.getByTestId('reason_value').textContent).toBe(
      "This is a long description that has more than 430 chars in it. really I'm trying to type something that have more than 430 chars. I don't know what to type but I'm typing about the problem that I'm facing at the moment. it's 237 for now. I have to write more like I've typed so far. this is for testing description about the beneficiary description. there may be more letters in the description if the char value is so long we gon...",
    );
  });
});

describe('Donation values', () => {
  it('Donation values must be with currency value', () => {
    render(
      <SingleBeneficiaryCard
        image=""
        address="address"
        name="name"
        reason="reason"
        currentDonation={10}
        donationGoal={100}
      />,
    );
    expect(screen.getByTestId('donation_value').textContent).toBe(
      '$10 raised of $100',
    );
  });
});
