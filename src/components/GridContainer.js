import React from "react";

import styled from "styled-components";
import CustomItems from "./CustomItems";
import NearestItems from "./NearestItems";

const GridContainer = ({
  ident,
  deleteAirport,
  nearest,
  deleteNearest,
  aerodrome,
  metar,
  taf,
  setAerodrome,
  setMetar,
  setTaf,
}) => {
  const items =
    window.location.pathname === "/" ? (
      <NearestItems nearest={nearest} deleteNearest={deleteNearest} />
    ) : (
      <CustomItems
        deleteAirport={deleteAirport}
        ident={ident}
        aerodrome={aerodrome}
        metar={metar}
        taf={taf}
        setAerodrome={setAerodrome}
        setMetar={setMetar}
        setTaf={setTaf}
      />
    );

  return <GridArea>{items}</GridArea>;
};

export default GridContainer;

const GridArea = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  align-items: center;
  grid-gap: 10px;
  margin: 50px auto !important;
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
  @media screen and (max-width: 500px) {
    width: 95%;
    margin: 50px auto !important;
  }
`;
