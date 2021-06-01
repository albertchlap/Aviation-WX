import React from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

const Header = () => {
  return (
    <Nav>
      <HeaderTitle>Aviation WX</HeaderTitle>
      <ListItems>
        <Items>
          <NavLink
            style={linkStyle}
            activeStyle={{ textDecoration: "underline" }}
            to='/'
            exact>
            Nearest
          </NavLink>
        </Items>
        <Items>
          <NavLink
            style={linkStyle}
            activeStyle={{ textDecoration: "underline" }}
            to='/custom'
            exact>
            Custom
          </NavLink>
        </Items>
      </ListItems>
    </Nav>
  );
};

export default Header;

const Nav = styled.header`
  position: absolute;
  top: 0;
  height: 70px;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const HeaderTitle = styled.h2`
  color: #fff;
  opacity: 0.7;
  font-family: "Anton", "sans-serif";
  font-size: 30px;
  letter-spacing: 2px;
  border: 5px solid #fff;
  padding: 5px;
  margin: 10px 0 0 10px;
  cursor: default;
  @media screen and (max-width: 500px) {
    margin: 140px 0 20px;
  }
`;

const ListItems = styled.ul`
  list-style: none;
  display: flex;
  padding-right: 40px;
  @media screen and (max-width: 500px) {
    padding-bottom: 80px;
    margin-top: -10px;
  }
`;

const Items = styled.li`
  padding-left: 20px;
  &:hover {
    opacity: 0.9;
  }
`;

const linkStyle = {
  color: "#fff",
  opacity: "0.7",
  fontSize: "20px",
  textDecoration: "none",
};
