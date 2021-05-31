import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FadingCircle } from "better-react-spinkit";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import Zulu from "./Zulu";
// import CloseIcon from "@material-ui/icons/Close";
// import AddCircleIcon from "@material-ui/icons/AddCircle";

const TOKEN = process.env.REACT_APP_TOKEN;

const NearestItems = ({ nearest, deleteNearest }) => {
  const [position, setPosition] = useState(false);
  const [aerodrome, setAerodrome] = useState([]);
  const [metar, setMetar] = useState([]);
  const [taf, setTaf] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    nearest.forEach(airport => {
      const stationURL = `https://avwx.rest/api/station/${airport.station.icao}`;
      const metarURL = `https://avwx.rest/api/metar/${airport.station.icao}`;
      const tafURL = `https://avwx.rest/api/taf/${airport.station.icao}`;

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
          setIsLoading(false);
        })
      );
    });
  }, [nearest]);

  return (
    <>
      {isLoading ? (
        <SpinnerContainer>
          <FadingCircle color='#fff' size={100} />
        </SpinnerContainer>
      ) : (
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
                onClick={() => setPosition(i)}>
                <Airport>{port.icao}</Airport>
                <motion.h4>{port.name}</motion.h4>
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
                  key={aerodrome[position].icao}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  layoutId={aerodrome[position].icao}
                  onClick={() => setPosition(false)}>
                  <motion.h2>{aerodrome[position].icao}</motion.h2>

                  <motion.h4>{aerodrome[position].name}</motion.h4>
                  <motion.h5>
                    {aerodrome[position].city}, {aerodrome[position].country}
                  </motion.h5>

                  <motion.h4>METAR</motion.h4>
                  <motion.h3>{metar[position].raw}</motion.h3>
                  <motion.h4>TAF</motion.h4>
                  <motion.h3>{taf[position].raw}</motion.h3>
                  <ZuluContainer>
                    <Zulu />
                  </ZuluContainer>
                </Selected>
              </SelectedContainer>
            )}
          </AnimatePresence>
        </AnimateSharedLayout>
      )}
    </>
  );
};

export default NearestItems;

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
  width: 100%;
  height: 100%;
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

const SpinnerContainer = styled.div`
  position: absolute;
  left: 47%;
  top: 50%;
  @media screen and (max-width: 500px) {
    left: 35%;
  }
`;

const ZuluContainer = styled(motion.div)`
  margin-top: 30px;
  /* position: absolute;
  top: 15px;
  right: 25px; */
`;

// const StyledCloseIcon = styled(CloseIcon)`
//   position: absolute;
//   top: 4px;
//   right: 4px;
//   font-size: 30px !important;
//   cursor: pointer;
//   z-index: 15 !important;
// `;

// const StyledCircle = styled(AddCircleIcon)`
//   position: absolute;
//   bottom: 4px;
//   right: 4px;
//   font-size: 30px !important;
//   cursor: pointer;
//   z-index: 15;
// `;

const Airport = styled(motion.h2)`
  padding: 10px 40px;
`;
