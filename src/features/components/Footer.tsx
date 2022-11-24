import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: lightgreen;
  padding: 5px;
  display: flex;
  justify-content: center;
`;

export default function Footer() {
  return <FooterWrapper>developed by Wosen-Konjo 2022</FooterWrapper>;
}
