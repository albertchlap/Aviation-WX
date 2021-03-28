import React from "react";

import styled from "styled-components";
import CustomItems from "./CustomItems";
import NearestItems from "./NearestItems";

const GridArea = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  margin: 50px auto;
  width: 80%;
  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GridContainer = ({
  aerodrome,
  deleteAirport,
  metar,
  taf,
  nearest,
  deleteNearest,
}) => {
  const items =
    window.location.href === "http://localhost:3000/" ? (
      <NearestItems nearest={nearest} deleteNearest={deleteNearest} />
    ) : (
      <CustomItems
        aerodrome={aerodrome}
        deleteAirport={deleteAirport}
        metar={metar}
        taf={taf}
      />
    );

  return <GridArea>{items}</GridArea>;
};

export default GridContainer;
