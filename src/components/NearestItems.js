import React, { useState } from "react";

import styled from "styled-components";

import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const GridItem = styled(motion.div)`
  border: none;
  border-radius: 10px;
  padding: 10px;
  background: ${({ condition }) =>
    condition === "MVFR"
      ? "yellow"
      : condition === "VFR"
      ? "green"
      : condition === "LIFR"
      ? "red"
      : condition === "IFR"
      ? "orange"
      : "white"};
  opacity: 0.3;
  position: relative;
  z-index: 5;
  text-align: center;
`;

const Overlay = styled(motion.div)`
  background: #000;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
`;

const SelectedContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const Selected = styled(motion.div)`
  border: none;
  border-radius: 10px;
  padding: 10px 30px;
  width: 80%;
  background: #dcdcdc;

  z-index: 10 !important;
  cursor: pointer;
`;

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 30px !important;
  cursor: pointer;
  z-index: 15 !important;
`;

const StyledCircle = styled(AddCircleIcon)`
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 30px !important;
  cursor: pointer;
  z-index: 15;
`;

const Airport = styled(motion.h2)`
  padding: 10px 40px;
`;

const NearestItems = ({ nearest, deleteNearest }) => {
  const [position, setPosition] = useState(false);
  console.log(nearest);
  console.log(position);
  return (
    <>
      <AnimateSharedLayout type='crossfade'>
        {nearest.map((airport, i) => {
          return (
            <GridItem
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              layoutId={airport.station.icao}
              key={i}>
              <Airport>{airport.station.icao}</Airport>
              <motion.h4>{airport.station.name}</motion.h4>

              <StyledCloseIcon
                onClick={() => deleteNearest(airport.station.icao)}
              />
              <StyledCircle onClick={() => setPosition(i)} />
            </GridItem>
          );
        })}

        <AnimatePresence>
          {position !== false && (
            <Overlay
              key='overlay'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setPosition(false)}
            />
          )}

          {position !== false && (
            <SelectedContainer>
              <Selected
                key={nearest[position].station.icao}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layoutId={nearest[position].station.icao}
                onClick={() => setPosition(false)}>
                <motion.h2>{nearest[position].station.icao}</motion.h2>
                <motion.h4>{nearest[position].station.name}</motion.h4>
              </Selected>
            </SelectedContainer>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </>
  );
};

export default NearestItems;
