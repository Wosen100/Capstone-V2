import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeaderWrapper = styled.header`
  width: 100%;
  position: sticky;
`;

const NavWrapper = styled.nav`
  width: 100%;
  position: fixed;
  margin-bottom: 80px;
  background-color: lightgreen;
  ul {
    list-style: none;
  }
  li {
    display: inline-block;
  }
  a {
    padding: 10px;
    text-decoration: none;
    margin-right: 10px;
    border-radius: 5px;
    color: black;
    font-size: 16px;
  }
  a:hover,
  button:hover {
    background-color: green;
    color: white;
  }
  button {
    background-color: gray;
    padding: 10px;
    text-decoration: none;
    margin-right: 10px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
  }
`;

const navItems = [
  { text: 'Home', link: '/' },
  { text: 'Beneficiary', link: '/beneficiaries' },
  { text: 'Contact Us', link: '/contact-us' },
];

export default function Header() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser(true);
    }
  }, []);

  return (
    <HeaderWrapper>
      <NavWrapper>
        <ul>
          {navItems.map((val) => (
            <li key={val.text}>
              <NavLink to={val.link}>{val.text}</NavLink>
            </li>
          ))}
          {user && (
            <li>
              <NavLink to="/signout">Sign Out</NavLink>
            </li>
          )}
        </ul>
      </NavWrapper>
    </HeaderWrapper>
  );
}
