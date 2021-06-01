import React from "react";

export const myContext = React.createContext();

const Provider = ({ aerodrome, setAerodrome, setMetar, setTaf, children }) => {
  return (
    <myContext.Provider
      value={{
        aerodrome,
        setAir: val => setAerodrome(val),
        setM: val => setMetar(val),
        setT: val => setTaf(val),
      }}>
      {children}
    </myContext.Provider>
  );
};

export default Provider;
