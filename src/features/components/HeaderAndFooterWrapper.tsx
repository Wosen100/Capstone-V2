import React, { ReactElement } from 'react';
import Footer from './Footer';
import Header from './Header';

interface HeaderAndFooterWrapperType {
  children: ReactElement;
}

export default function HeaderAndFooterWrapper({
  children,
}: HeaderAndFooterWrapperType) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
