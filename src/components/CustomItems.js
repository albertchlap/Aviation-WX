import React, { useEffect, useState } from "react";

import styled from "styled-components";

import Zulu from "./Zulu";

import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import axios from "axios";

const TOKEN = process.env.REACT_APP_TOKEN;

const CustomItems = ({ ident }) => {
  const [index, setIndex] = useState(false);
  const [aerodrome, setAerodrome] = useState([]);
  const [metar, setMetar] = useState([]);
  const [taf, setTaf] = useState([]);

  useEffect(() => {
    if (!ident) {
      return;
    }
    const stationURL = `https://avwx.rest/api/station/${ident}`;
    const metarURL = `https://avwx.rest/api/metar/${ident}`;
    const tafURL = `https://avwx.rest/api/taf/${ident}`;

    const getAirport = axios.get(stationURL, {
      headers: {
        Authorization: TOKEN,
      },
    });
    const getMetar = axios.get(metarURL, {
      headers: {
        Authorization: TOKEN,
      },
    });
    const getTaf = axios.get(tafURL, {
      headers: {
        Authorization: TOKEN,
      },
    });
    axios.all([getAirport, getMetar, getTaf]).then(
      axios.spread((...allData) => {
        setAerodrome(previous => [...previous, allData[0].data]);
        setMetar(previous => [...previous, allData[1].data]);
        setTaf(previous => [...previous, allData[2].data]);
      })
    );
  }, [ident]);

  const deleteAirport = id => {
    setAerodrome(previous => previous.filter(airport => airport.icao !== id));
    setMetar(previous => previous.filter(wx => wx.station !== id));
    setTaf(previous => previous.filter(forecast => forecast.station !== id));
  };

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
              key={i}
              onClick={() => setIndex(i)}>
              <Airport>{port.icao}</Airport>
              <motion.h4>{port.name}</motion.h4>

              <StyledCloseIcon onClick={() => deleteAirport(port.icao)} />
              <StyledCircle />
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
                <motion.div
                  style={{
                    position: "absolute",
                    right: "25px",
                    top: "15px",
                  }}>
                  <Zulu />
                </motion.div>
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
