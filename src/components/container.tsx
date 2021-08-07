import styled from "styled-components";

export const Container = styled.div`
  height: calc(100vh - 5rem);
  margin: 0 auto;
  max-width: 35rem;
  width: 100%;
  overflow: scroll;
  padding: 1rem;

  @media (min-width: 576px) {
    height: calc(100vh - 10rem);
  }
`;
