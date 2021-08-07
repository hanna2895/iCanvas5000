import styled from "styled-components";
import { Voter } from "../types";

const ListItem = styled.li`
  display: flex;
  border-bottom: 1px solid blue;
  flex-direction: column;
  list-style: none;

  p {
    margin: 0.5rem 0;
  }
`;

interface Props {
  voter: Voter;
}

const VoterListItem = ({ voter }: Props) => {
  return (
    <ListItem>
      <h3>{voter.name}</h3>
      <p>
        Date Canvassed:{" "}
        {new Date(voter.dateCanvassed.seconds).toLocaleString("en")}
      </p>
      <p>
        Email: <a href={`mailto:{voter.email}`}>{voter.email}</a>
      </p>
      <p>Canvas Notes: </p>
      <p>{voter.notes}</p>
    </ListItem>
  );
};

export default VoterListItem;
