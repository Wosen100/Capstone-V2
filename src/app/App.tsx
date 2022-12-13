import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../features/pages/auth/Register';
import Login from '../features/pages/auth/Login';
import Beneficiary from '../features/pages/Beneficiary';
import LandingPage from '../features/pages/LandingPage';
import Signout from '../features/pages/auth/Signout';
import BeneficiaryDetails from '../features/pages/BeneficiaryDetails';
import ContactUs from '../features/pages/ContactUsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="/beneficiaries" element={<Beneficiary />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route
          path="/beneficiaries/details"
          element={<BeneficiaryDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}
