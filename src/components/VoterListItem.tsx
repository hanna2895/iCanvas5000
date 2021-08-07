import React from "react";
import styled from "styled-components";
import { Voter } from "../types";

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 1rem;

  p {
    margin: 0;
  }
`;

interface Props {
  onClick(): void;
  voter: Voter;
}

const VoterListItem = ({ onClick, voter }: Props) => {
  return (
    <ListItem onClick={onClick}>
      <h2>{voter.name}</h2>
      <p>
        Date Canvassed:{" "}
        {new Date(voter.dateCanvassed.seconds * 1000).toLocaleDateString("en")}
      </p>
      <p>
        Email: <a href={`mailto:{voter.email}`}>{voter.email}</a>
      </p>
      <p>Canvas Notes: {voter.notes}</p>
    </ListItem>
  );
};

export default VoterListItem;
