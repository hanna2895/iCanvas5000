import React, { useEffect, useState } from "react";
import VoterListItem from "./components/VoterListItem";
import { db } from "./firebase";

import { Voter } from "./types";

const CanvasList = () => {
  const [voterList, setVoterList] = useState<Voter[]>();

  const getAllVoters = () => {
    db.collection("voters")
      .get()
      .then((querySnapshot) => {
        const voters: Voter[] = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
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
    <div>
      {voterList?.map((voter) => (
        <VoterListItem
          key={voter.name}
          onClick={onVoterClick}
          voter={voter}
        ></VoterListItem>
      ))}
    </div>
  );
};

export default CanvasList;
