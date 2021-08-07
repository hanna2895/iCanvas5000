import { useEffect, useState } from "react";
import VoterListItem from "./VoterListItem";
import { db } from "../firebase";
import styled from "styled-components";

import { Voter } from "../types";

const CanvasListContainer = styled.div`
  padding: 1rem;
`;

const CanvasList = () => {
  const [voterList, setVoterList] = useState<Voter[]>();

  const getAllVoters = () => {
    db.collection("voters").onSnapshot((querySnapshot) => {
      const voters: Voter[] = [];
      querySnapshot.forEach((doc) => {
        voters.push(doc.data() as Voter);
      });
      setVoterList(voters);
    });
  };

  useEffect(() => {
    getAllVoters();
  }, []);

  const onVoterClick = () => {
    console.log("voter clicked");
  };

  return (
    <CanvasListContainer>
      <h2>All Voters</h2>
      {voterList?.map((voter) => (
        <VoterListItem
          key={voter.name}
          onClick={onVoterClick}
          voter={voter}
        ></VoterListItem>
      ))}
    </CanvasListContainer>
  );
};

export default CanvasList;
