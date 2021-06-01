import React, { useState } from "react";

import styled from "styled-components";

import Zulu from "./Zulu";

import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

const CustomItems = ({ metar, taf, aerodrome }) => {
  const [index, setIndex] = useState(false);

  return (
    <>
      <AnimateSharedLayout type='crossfade'>
        {aerodrome?.map((port, i) => {
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
              key={i}
              onClick={() => setIndex(i)}>
              <Airport>{port.icao}</Airport>
              <motion.h4>{port.name}</motion.h4>
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
                <motion.h3 style={{ color: "#333" }}>
                  {metar[index].raw}
                </motion.h3>
                <motion.h4>TAF</motion.h4>
                <motion.h3 style={{ color: "#333" }}>
                  {taf[index].raw}
                </motion.h3>
                <ZuluContainer>
                  <Zulu />
                </ZuluContainer>
              </Selected>
            </SelectedContainer>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </>
  );
};

export default CustomItems;

const GridItem = styled(motion.div)`
  border: none;
  height: 180px;
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
  width: 100%;
  object-fit: contain;
  cursor: pointer;
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
  position: relative;
  z-index: 10 !important;
  cursor: pointer;
`;

const Airport = styled(motion.h2)`
  padding: 10px 40px;
`;

const ZuluContainer = styled(motion.div)`
  margin-top: 30px;
  /* position: absolute;
  top: 15px;
  right: 25px; */
`;
