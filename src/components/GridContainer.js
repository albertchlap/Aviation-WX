import React from "react";

import styled from "styled-components";
import GridItem from "./GridItem";

const GridArea = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  margin: 100px 50px;
`;

const GridContainer = ({ metar, deleteAirport }) => {
  return (
    <GridArea>
      <GridItem metar={metar} deleteAirport={deleteAirport} />
    </GridArea>
  );
};

export default GridContainer;
