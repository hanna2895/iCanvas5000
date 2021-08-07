import styled from "styled-components";
import { Voter } from "../types";

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;

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
      <h3>{voter.name}</h3>
      <p>
        Date Canvassed:{" "}
        {new Date(voter.dateCanvassed.seconds).toLocaleString("en")}
      </p>
      <p>
        Email: <a href={`mailto:{voter.email}`}>{voter.email}</a>
      </p>
      <p>Canvas Notes: {voter.notes}</p>
    </ListItem>
  );
};

export default VoterListItem;
