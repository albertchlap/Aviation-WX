import React from "react";

import styled from "styled-components";

const ClearBtn = ({
  clearResults,
  metar,
  taf,
  aerodrome,
  setMetar,
  setTaf,
  setAerodrome,
}) => {
  const clearAirports = () => {
    setAerodrome([]);
    setMetar([]);
    setTaf([]);
  };

  return (
    <Button hidden={aerodrome.length === 0} onClick={clearAirports}>
      Clear Results
    </Button>
  );
};

export default ClearBtn;

const Button = styled.button`
  margin-left: 20px;
  background: #fff;
  opacity: 0.7;
  height: 50px;
  width: 150px;
  outline: none;
  border-radius: 30px;
  border: none;
  transition: opacity 0.4s linear;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 1.5px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  /* @media screen and (max-width: 650px) {
    display: block;
    margin: 40px auto 20px;
  } */
`;
