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

const CustomItems = ({ aerodrome, deleteAirport, metar, taf }) => {
  const [index, setIndex] = useState(false);
  console.log(aerodrome);
  return (
    <>
      <AnimateSharedLayout type='crossfade'>
        {aerodrome.map((port, i) => {
          return (
            <GridItem
              condition={
                metar.length > i && metar.length !== 0
                  ? metar[i].flight_rules
                  : null
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              layoutId={port.icao}
              key={i}>
              <Airport>{port.icao}</Airport>
              <motion.h4>{port.name}</motion.h4>

              <StyledCloseIcon onClick={() => deleteAirport(port.icao)} />
              <StyledCircle onClick={() => setIndex(i)} />
            </GridItem>
          );
        })}

        <AnimatePresence>
          {index !== false && (
            <Overlay
              key='overlay'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIndex(false)}
            />
          )}

          {index !== false && (
            <SelectedContainer>
              <Selected
                key={aerodrome[index].icao}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layoutId={aerodrome[index].icao}
                onClick={() => setIndex(false)}>
                <motion.h2>{aerodrome[index].icao}</motion.h2>
                <motion.h4>{aerodrome[index].name}</motion.h4>
                <motion.h5>
                  {aerodrome[index].city}, {aerodrome[index].country}
                </motion.h5>

                <motion.h4>METAR</motion.h4>
                <motion.h3>{metar[index].raw}</motion.h3>
                <motion.h4>TAF</motion.h4>
                <motion.h3>{taf[index].raw}</motion.h3>
              </Selected>
            </SelectedContainer>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </>
  );
};

export default CustomItems;
