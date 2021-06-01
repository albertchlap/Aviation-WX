import React, { useState } from "react";

import styled from "styled-components";
import ClearBtn from "./ClearBtn";

const SearchBar = ({
  setIdent,
  metar,
  taf,
  aerodrome,
  setMetar,
  setTaf,
  setAerodrome,
}) => {
  const [input, setInput] = useState("");
  const onSubmitHandler = e => {
    e.preventDefault();
    setIdent(input);
    setInput("");
  };

  return (
    <Search>
      <Form onSubmit={onSubmitHandler}>
        <Input
          placeholder='Search Airport (ICAO 4-Letter Code)'
          onChange={e => setInput(e.target.value.toUpperCase())}
          value={input}
        />
        <BtnContainer>
          <Button disabled={input.length !== 4}>Search</Button>
          <ClearBtn
            setIdent={setIdent}
            aerodrome={aerodrome}
            metar={metar}
            taf={taf}
            setAerodrome={setAerodrome}
            setMetar={setMetar}
            setTaf={setTaf}
          />
        </BtnContainer>
      </Form>
    </Search>
  );
};

export default SearchBar;

const Search = styled.div`
  margin: 20px auto 0;
  position: relative;
  left: 40px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  @media screen and (max-width: 755px) {
    flex-direction: column;
    position: relative;
    right: 40px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 755px) {
    margin-top: 20px;
  }
`;

const Button = styled.button`
  margin-left: 20px;
  background: #fff;
  opacity: 0.7;
  height: 50px;
  width: 100px;
  outline: none;
  border-radius: 30px;
  border: none;
  transition: opacity 0.4s linear;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 1.5px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  /* @media screen and (max-width: 650px) {
    display: block;
    margin: 40px auto 20px;
  } */
`;

const Input = styled.input`
  width: 340px;
  height: 10px;
  padding: 25px;
  border-radius: 30px;
  outline: none;
  border: none;
  opacity: 0.7;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.5px;
`;
