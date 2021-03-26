import React from "react";

import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";

const Grid = styled.div`
  border: none;
  border-radius: 10px;
  padding: 10px;
  background: #fff;
  opacity: 0.7;
  position: relative;
`;

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 30px !important;
  cursor: pointer;
`;

const GridItem = ({ metar, deleteAirport }) => {
  const renderedList = metar.map(airport => {
    return (
      <Grid key={airport.station}>
        <StyledCloseIcon onClick={() => deleteAirport(airport.station)} />
        <h2>{airport.station}</h2>
        <p>{airport.raw}</p>
      </Grid>
    );
  });
  return renderedList;
};

export default GridItem;
