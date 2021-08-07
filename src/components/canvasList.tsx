import { useEffect, useState } from "react";
import firebase from "firebase";
import VoterListItem from "./VoterListItem";
import { db } from "../firebase";
import styled from "styled-components";
import { Container } from "./container";

import { Voter } from "../types";
import { useHistory } from "react-router-dom";

interface Props {
  setAuthError(error: string): void;
  user: firebase.User | undefined;
}

const CanvasList = ({ setAuthError, user }: Props) => {
  const history = useHistory();
  if (!user) {
    history.push("/");
    setAuthError("You must be logged in to view voters.");
  }
  const [voterList, setVoterList] = useState<Voter[]>();
  const [selected, setSelected] = useState<"all" | "canvassedByMe">(
    "canvassedByMe"
  );

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

  const CanvasListSwitch = styled.div`
    border-bottom: 1px solid black;
    color: black;
    display: flex;
    justify-content: space-between;

    .${selected} {
      background-color: #408ee0;
      color: white;
    }

    .all,
    .canvassedByMe {
      border-radius: 5px;
      padding: 1rem 0.5rem;
      transition: all 0.3s ease-in;

      &:hover {
        background-color: #1b75be;
        cursor: pointer;
      }
    }
  `;

  return (
    <Container>
      <CanvasListSwitch>
        <h2
          className="canvassedByMe"
          onClick={() => setSelected("canvassedByMe")}
        >
          Added by Me
        </h2>
        <h2 className="all" onClick={() => setSelected("all")}>
          All Voters
        </h2>
      </CanvasListSwitch>

      {selected === "all" &&
        voterList?.map((voter) => (
          <VoterListItem key={voter.name} voter={voter} />
        ))}
      {selected === "canvassedByMe" &&
        voterList
          ?.filter((voter) => voter.addedBy === user?.uid)
          .map((voter) => <VoterListItem key={voter.name} voter={voter} />)}
    </Container>
  );
};

export default CanvasList;
