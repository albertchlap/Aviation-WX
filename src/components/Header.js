import React from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

const Nav = styled.header`
  position: absolute;
  top: 0;
  height: 70px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const HeaderTitle = styled.h2`
  position: absolute;
  left: 10px;
  top: -10px;
  color: #fff;
  opacity: 0.7;
  font-family: "Anton", "sans-serif";
  font-size: 30px;
  letter-spacing: 2px;
  border: 5px solid #fff;
  padding: 5px;
`;

const ListItems = styled.ul`
  list-style: none;
  display: flex;
  padding-right: 40px;
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
