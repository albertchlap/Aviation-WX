import React from "react";

import styled from "styled-components";

const Legend = () => {
  return (
    <LegendContainer>
      <LegendItemContainer>
        <div
          style={{
            background: "green",
            height: "20px",
            width: "20px",
            borderRadius: "100%",
          }}
        />
        <WxCategory>VFR</WxCategory>
      </LegendItemContainer>
      <LegendItemContainer>
        <div
          style={{
            background: "yellow",
            height: "20px",
            width: "20px",
            borderRadius: "100%",
          }}
        />
        <WxCategory>Marginal VFR</WxCategory>
      </LegendItemContainer>
      <LegendItemContainer>
        <div
          style={{
            background: "orange",
            height: "20px",
            width: "20px",
            borderRadius: "100%",
          }}
        />
        <WxCategory>IFR</WxCategory>
      </LegendItemContainer>
      <LegendItemContainer>
        <div
          style={{
            background: "red",
            height: "20px",
            width: "20px",
            borderRadius: "100%",
          }}
        />
        <WxCategory>Low IFR</WxCategory>
      </LegendItemContainer>
    </LegendContainer>
  );
};

export default Legend;

const LegendContainer = styled.div`
  display: flex;
  @media screen and (max-width: 448px) {
    font-size: 0.7rem;
  }
`;

const LegendItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

const WxCategory = styled.h3`
  color: #fff;
  margin-left: 7px;
`;
