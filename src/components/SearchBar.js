import React, { useState } from "react";

import styled from "styled-components";

const Search = styled.div`
  margin: 0 auto;
`;

const Form = styled.form`
  margin: 0 auto;
  text-align: center;
`;

const Button = styled.button`
  margin-left: 20px;
  background: #fff;
  opacity: 0.7;
  height: 40px;
  width: 80px;
  outline: none;
  border-radius: 10px;
  border: none;
  transition: opacity 0.4s linear;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1.5px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const Input = styled.input`
  width: 300px;
  height: 10px;
  padding: 20px;
  border-radius: 10px;
  outline: none;
  border: none;
  opacity: 0.7;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.5px;
`;

const SearchBar = ({ submitHandler }) => {
  const [input, setInput] = useState("");

  const onSubmitHandler = e => {
    e.preventDefault();
    submitHandler(input);
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
        <Button>Search</Button>
      </Form>
    </Search>
  );
};

export default SearchBar;
