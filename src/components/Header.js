import React from "react";

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
  color: #fff;
  opacity: 0.7;
`;

const ListItems = styled.ul`
  list-style: none;
  display: flex;
  padding-right: 40px;
`;

const Items = styled.li`
  color: #fff;
  opacity: 0.7;
  font-size: 20px;
  padding-left: 20px;
`;

const Header = () => {
  return (
    <Nav>
      <HeaderTitle>Aviation Weather</HeaderTitle>
      <ListItems>
        <Items>Nearest</Items>
        <Items>Custom</Items>
      </ListItems>
    </Nav>
  );
};

export default Header;
