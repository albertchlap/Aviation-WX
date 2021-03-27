import React from "react";

import styled from "styled-components";
import GridContainer from "./GridContainer";

const Container = styled.div``;

const Title = styled.h1`
  color: #fff;
  opacity: 0.7;
  margin-top: 150px;
`;

const Nearest = () => {
  return (
    <Container>
      <Title>Nearest Airports</Title>
      {/* <GridContainer /> */}
    </Container>
  );
};

export default Nearest;
